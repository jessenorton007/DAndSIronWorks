import path from "node:path";

export function adminUploadDir() {
  return process.env["IRONWORKS_UPLOAD_DIR"] || path.resolve(process.cwd(), "../ironworks/public/images/admin-uploads");
}
