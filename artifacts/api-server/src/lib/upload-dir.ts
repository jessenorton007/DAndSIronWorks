import path from "node:path";
import { existsSync } from "node:fs";

export function adminDataDir() {
  if (process.env["IRONWORKS_DATA_DIR"]) return process.env["IRONWORKS_DATA_DIR"];

  const repoRootDataDir = path.resolve(process.cwd(), "artifacts/admin-data");
  if (existsSync(path.resolve(process.cwd(), "artifacts"))) return repoRootDataDir;

  return path.resolve(process.cwd(), "../admin-data");
}

export function adminUploadDir() {
  if (process.env["IRONWORKS_UPLOAD_DIR"]) return process.env["IRONWORKS_UPLOAD_DIR"];

  const repoRootUploadDir = path.resolve(process.cwd(), "artifacts/ironworks/public/images/admin-uploads");
  if (existsSync(path.resolve(process.cwd(), "artifacts/ironworks"))) return repoRootUploadDir;

  return path.resolve(process.cwd(), "../ironworks/public/images/admin-uploads");
}
