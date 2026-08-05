import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Router } from "express";
import { adminDataDir, adminUploadDir } from "../lib/upload-dir";

const router = Router();
const MAX_IMAGE_BYTES = 6 * 1024 * 1024;
const preMadeProductsPath = () => path.join(adminDataDir(), "premade-products.json");

const mimeExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const uploadedImagePattern = /^[a-z0-9-]+\.(?:jpg|jpeg|png|webp)$/i;

function cleanName(value: unknown) {
  return String(value ?? "upload")
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "upload";
}

async function readPreMadeProducts() {
  try {
    const raw = await readFile(preMadeProductsPath(), "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === "object" && Array.isArray((parsed as { products?: unknown }).products)) {
      return (parsed as { products: unknown[] }).products;
    }
  } catch {
    // No saved admin data yet.
  }
  return [];
}

function validatePreMadeProducts(value: unknown) {
  if (!Array.isArray(value)) {
    throw new Error("Pre-made products payload must be an array.");
  }

  const serialized = JSON.stringify(value);
  if (serialized.includes("data:image/")) {
    throw new Error("Uploaded photos must be saved as site image files before saving products.");
  }

  return value;
}

router.get("/admin/premade-products", async (_req, res) => {
  const products = await readPreMadeProducts();
  res.json({ ok: true, products });
});

router.put("/admin/premade-products", async (req, res) => {
  try {
    const products = validatePreMadeProducts(req.body?.products);
    const dataDir = adminDataDir();
    await mkdir(dataDir, { recursive: true });
    await writeFile(
      preMadeProductsPath(),
      JSON.stringify({ products, updatedAt: new Date().toISOString() }, null, 2),
      "utf8",
    );
    res.json({ ok: true, products });
  } catch (error) {
    res.status(400).json({ ok: false, error: error instanceof Error ? error.message : "Could not save pre-made products." });
  }
});

router.get("/admin/images/:filename", async (req, res) => {
  const filename = String(req.params.filename ?? "");
  if (!uploadedImagePattern.test(filename)) {
    res.status(404).json({ ok: false, error: "Image not found." });
    return;
  }

  res.sendFile(path.join(adminUploadDir(), filename), error => {
    if (error && !res.headersSent) {
      res.status(404).json({ ok: false, error: "Image not found." });
    }
  });
});

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

    res.json({ ok: true, url: `/api/admin/images/${filename}` });
  } catch (error) {
    res.status(500).json({ ok: false, error: error instanceof Error ? error.message : "Could not save image." });
  }
});

export default router;
