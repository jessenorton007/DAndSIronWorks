import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const staticRoot = process.env["IRONWORKS_DIST_PATH"] || path.resolve(__dirname, "../../ironworks/dist/public");
if (existsSync(staticRoot)) {
  app.use(express.static(staticRoot));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(staticRoot, "index.html"));
  });
}

export default app;
