import net from "node:net";
import tls from "node:tls";

export interface SmtpMessage {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from: string;
}

function readSmtpConfig(): SmtpConfig | null {
  const host = process.env["SMTP_HOST"];
  const from = process.env["SMTP_FROM"] || process.env["ORDER_NOTIFICATION_FROM"];
  if (!host || !from) return null;

  const port = Number(process.env["SMTP_PORT"] || "587");
  return {
    host,
    port,
    secure: process.env["SMTP_SECURE"] === "true" || port === 465,
    user: process.env["SMTP_USER"],
    pass: process.env["SMTP_PASS"],
    from,
  };
}

function encodeAddress(value: string) {
  return value.replace(/[\r\n<>]/g, "").trim();
}

function encodeHeader(value: string) {
  return value.replace(/[\r\n]/g, " ").trim();
}

function escapeData(value: string) {
  return value.replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..");
}

class SmtpSession {
  private socket: net.Socket | tls.TLSSocket;
  private buffer = "";
  private pending?: {
    resolve: (line: string) => void;
    reject: (err: Error) => void;
  };

  constructor(socket: net.Socket | tls.TLSSocket) {
    this.socket = socket;
    this.socket.setEncoding("utf8");
    this.socket.on("data", (chunk) => this.onData(String(chunk)));
    this.socket.on("error", (err) => this.pending?.reject(err));
  }

  replaceSocket(socket: tls.TLSSocket) {
    this.socket.removeAllListeners("data");
    this.socket.removeAllListeners("error");
    this.socket = socket;
    this.socket.setEncoding("utf8");
    this.socket.on("data", (chunk) => this.onData(String(chunk)));
    this.socket.on("error", (err) => this.pending?.reject(err));
  }

  private onData(chunk: string) {
    this.buffer += chunk;
    const lines = this.buffer.split(/\r?\n/).filter(Boolean);
    const last = lines.at(-1);
    if (!last || !/^\d{3} /.test(last) || !this.pending) return;
    this.buffer = "";
    const pending = this.pending;
    this.pending = undefined;
    pending.resolve(lines.join("\n"));
  }

  read() {
    return new Promise<string>((resolve, reject) => {
      this.pending = { resolve, reject };
    });
  }

  async command(command: string, expected: number[]) {
    this.socket.write(`${command}\r\n`);
    const response = await this.read();
    const code = Number(response.slice(0, 3));
    if (!expected.includes(code)) {
      throw new Error(`SMTP command failed: ${command} -> ${response}`);
    }
    return response;
  }

  write(raw: string) {
    this.socket.write(raw);
  }

  end() {
    this.socket.end();
  }

  currentSocket() {
    return this.socket;
  }
}

function connect(config: SmtpConfig) {
  return new Promise<SmtpSession>((resolve, reject) => {
    const onConnect = () => resolve(new SmtpSession(socket));
    const socket = config.secure
      ? tls.connect({ host: config.host, port: config.port, servername: config.host }, onConnect)
      : net.connect({ host: config.host, port: config.port }, onConnect);
    socket.once("error", reject);
  });
}

export async function sendSmtpMessage(message: SmtpMessage) {
  const config = readSmtpConfig();
  if (!config) {
    return { sent: false, reason: "SMTP is not configured" };
  }

  const session = await connect(config);
  try {
    await session.read();
    await session.command(`EHLO ${process.env["SMTP_HELO"] || "dandsironworks.com"}`, [250]);

    if (!config.secure && process.env["SMTP_STARTTLS"] !== "false") {
      await session.command("STARTTLS", [220]);
      await new Promise<void>((resolve, reject) => {
        const upgraded = tls.connect({
          socket: session.currentSocket(),
          servername: config.host,
        }, resolve);
        upgraded.once("error", reject);
        session.replaceSocket(upgraded);
      });
      await session.command(`EHLO ${process.env["SMTP_HELO"] || "dandsironworks.com"}`, [250]);
    }

    if (config.user && config.pass) {
      await session.command("AUTH LOGIN", [334]);
      await session.command(Buffer.from(config.user).toString("base64"), [334]);
      await session.command(Buffer.from(config.pass).toString("base64"), [235]);
    }

    const from = encodeAddress(config.from);
    const to = encodeAddress(message.to);
    await session.command(`MAIL FROM:<${from}>`, [250]);
    await session.command(`RCPT TO:<${to}>`, [250, 251]);
    await session.command("DATA", [354]);

    const headers = [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${encodeHeader(message.subject)}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=utf-8",
      message.replyTo ? `Reply-To: ${encodeAddress(message.replyTo)}` : "",
    ].filter(Boolean);

    session.write(`${headers.join("\r\n")}\r\n\r\n${escapeData(message.text)}\r\n.\r\n`);
    const response = await session.read();
    const code = Number(response.slice(0, 3));
    if (code !== 250) throw new Error(`SMTP DATA failed: ${response}`);
    await session.command("QUIT", [221]);
    return { sent: true };
  } finally {
    session.end();
  }
}
