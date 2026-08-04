import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { Router } from "express";
import { adminUploadDir } from "../lib/upload-dir";

const router = Router();
const MAX_IMAGE_BYTES = 6 * 1024 * 1024;

const mimeExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function cleanName(value: unknown) {
  return String(value ?? "upload")
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "upload";
}

router.post("/admin/images", async (req, res) => {
  try {
    const image = String(req.body?.image ?? "");
    const match = image.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
    if (!match) {
      res.status(400).json({ ok: false, error: "Image upload must be a JPG, PNG, or WebP file." });
      return;
    }

    const mime = match[1];
    const buffer = Buffer.from(match[2], "base64");
    if (buffer.length > MAX_IMAGE_BYTES) {
      res.status(413).json({ ok: false, error: "Image is too large after compression." });
      return;
    }

    const uploadDir = adminUploadDir();
    await mkdir(uploadDir, { recursive: true });

    const ext = mimeExtensions[mime] ?? "jpg";
    const filename = `${cleanName(req.body?.filename)}-${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
    await writeFile(path.join(uploadDir, filename), buffer);

    res.json({ ok: true, url: `/images/admin-uploads/${filename}` });
  } catch (error) {
    res.status(500).json({ ok: false, error: error instanceof Error ? error.message : "Could not save image." });
  }
});

export default router;
