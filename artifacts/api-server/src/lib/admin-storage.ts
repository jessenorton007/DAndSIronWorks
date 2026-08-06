import { Client } from "@replit/object-storage";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { adminDataDir, adminUploadDir } from "./upload-dir";

const PRODUCT_OBJECT = "admin-data/premade-products.json";
const IMAGE_PREFIX = "admin-images/";

function appStorageEnabled() {
  if (process.env["IRONWORKS_APP_STORAGE"] === "false") return false;
  return process.env["IRONWORKS_APP_STORAGE"] === "true" || Boolean(process.env["REPL_ID"] || process.env["REPLIT_DEPLOYMENT"]);
}

let client: Client | undefined;
function appStorageClient() {
  client ??= new Client();
  return client;
}

function resultError(error: unknown, action: string) {
  if (error instanceof Error) return error;
  return new Error(`${action}: ${String(error ?? "unknown App Storage error")}`);
}

export function adminStorageBackend() {
  return appStorageEnabled() ? "replit-app-storage" : "local-filesystem";
}

export async function verifyAdminStorage() {
  if (!appStorageEnabled()) return { objectCount: 0 };

  const result = await appStorageClient().list();
  if (!result.ok) throw resultError(result.error, "Replit App Storage is not connected");
  return { objectCount: result.value.length };
}

export async function readProductData() {
  if (!appStorageEnabled()) {
    return readFile(path.join(adminDataDir(), "premade-products.json"), "utf8");
  }

  const result = await appStorageClient().downloadAsText(PRODUCT_OBJECT);
  if (result.ok) return result.value;

  // Migrate a surviving legacy deployment file the first time App Storage is enabled.
  try {
    const legacy = await readFile(path.join(adminDataDir(), "premade-products.json"), "utf8");
    await writeProductData(legacy);
    return legacy;
  } catch {
    throw resultError(result.error, "Could not read product data from Replit App Storage");
  }
}

export async function writeProductData(contents: string) {
  if (!appStorageEnabled()) {
    await mkdir(adminDataDir(), { recursive: true });
    await writeFile(path.join(adminDataDir(), "premade-products.json"), contents, "utf8");
    return;
  }

  const result = await appStorageClient().uploadFromText(PRODUCT_OBJECT, contents);
  if (!result.ok) throw resultError(result.error, "Could not save product data to Replit App Storage");
}

export async function readAdminImage(filename: string) {
  if (!appStorageEnabled()) {
    return readFile(path.join(adminUploadDir(), filename));
  }

  const objectName = `${IMAGE_PREFIX}${filename}`;
  const result = await appStorageClient().downloadAsBytes(objectName);
  if (result.ok) return result.value;

  // Automatically preserve any files that survived in an older runtime.
  try {
    const legacy = await readFile(path.join(adminUploadDir(), filename));
    await writeAdminImage(filename, legacy);
    return legacy;
  } catch {
    throw resultError(result.error, `Image ${filename} was not found in Replit App Storage`);
  }
}

export async function writeAdminImage(filename: string, contents: Buffer) {
  if (!appStorageEnabled()) {
    await mkdir(adminUploadDir(), { recursive: true });
    await writeFile(path.join(adminUploadDir(), filename), contents);
    return;
  }

  const result = await appStorageClient().uploadFromBytes(`${IMAGE_PREFIX}${filename}`, contents);
  if (!result.ok) throw resultError(result.error, "Could not save image to Replit App Storage");
}

export async function adminImageExists(filename: string) {
  if (!appStorageEnabled()) {
    try {
      await readFile(path.join(adminUploadDir(), filename));
      return true;
    } catch {
      return false;
    }
  }

  const result = await appStorageClient().exists(`${IMAGE_PREFIX}${filename}`);
  if (!result.ok) throw resultError(result.error, "Could not inspect Replit App Storage");
  return result.value;
}
