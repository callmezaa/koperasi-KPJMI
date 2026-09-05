import { supabase } from "../lib/supabase";
import type { SiteSettingsRow } from "../content/types";

export class NotConfiguredError extends Error {
  constructor() {
    super(
      "Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env, lalu restart dev server.",
    );
  }
}

async function client() {
  if (!supabase) throw new NotConfiguredError();
  return supabase;
}

/* ---------------- CRUD generik ---------------- */

export async function listRows<T>(table: string): Promise<T[]> {
  const c = await client();
  const { data, error } = await c
    .from(table)
    .select("*")
    .order("sort_order")
    .order("created_at");
  if (error) throw error;
  return (data ?? []) as T[];
}

export async function insertRow<T>(
  table: string,
  row: Record<string, unknown>,
): Promise<T> {
  const c = await client();
  const { data, error } = await c.from(table).insert(row).select().single();
  if (error) throw error;
  return data as T;
}

export async function updateRow(
  table: string,
  id: string | number,
  patch: Record<string, unknown>,
): Promise<void> {
  const c = await client();
  const { error } = await c
    .from(table)
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteRow(
  table: string,
  id: string | number,
): Promise<void> {
  const c = await client();
  const { error } = await c.from(table).delete().eq("id", id);
  if (error) throw error;
}

/** Tukar posisi dua baris bersebelahan di daftar terurut. */
export async function swapSortOrder(
  table: string,
  a: { id: string; sort_order: number },
  b: { id: string; sort_order: number },
): Promise<void> {
  const c = await client();
  const now = new Date().toISOString();
  const results = await Promise.all([
    c.from(table).update({ sort_order: b.sort_order, updated_at: now }).eq("id", a.id),
    c.from(table).update({ sort_order: a.sort_order, updated_at: now }).eq("id", b.id),
  ]);
  for (const r of results) if (r.error) throw r.error;
}

/* ---------------- Info kontak (baris tunggal) ---------------- */

export async function fetchSettings(): Promise<SiteSettingsRow | null> {
  const c = await client();
  const { data, error } = await c.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  return (data as SiteSettingsRow) ?? null;
}

export async function saveSettings(patch: Record<string, unknown>): Promise<void> {
  const c = await client();
  const { error } = await c
    .from("site_settings")
    .upsert({ id: 1, ...patch, updated_at: new Date().toISOString() });
  if (error) throw error;
}

/* ---------------- Upload gambar (konversi WebP di browser) ---------------- */

const MAX_DIMENSION = 1600;
const WEBP_QUALITY = 0.82;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "gambar";
}

/** Kompres + konversi ke WebP lewat canvas; fallback ke file asli bila browser
 *  tidak mendukung encode WebP. */
async function fileToUploadBlob(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas unavailable");
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/webp", WEBP_QUALITY),
    );
    if (blob && blob.type === "image/webp") return blob;
  } catch {
    /* jatuh ke upload file asli */
  }
  return file;
}

export async function uploadImage(
  file: File,
  folder: "products" | "gallery" | "testimonials",
): Promise<string> {
  const c = await client();
  const blob = await fileToUploadBlob(file);
  const base = slugify(file.name.replace(/\.[^.]+$/, ""));
  const storagePath = `${folder}/${Date.now()}-${base}.webp`;
  const { error } = await c.storage
    .from("media")
    .upload(storagePath, blob, { contentType: blob.type, upsert: false });
  if (error) throw error;
  return c.storage.from("media").getPublicUrl(storagePath).data.publicUrl;
}

/** Hapus objek Storage dari URL publiknya — best effort, kegagalan diabaikan. */
export async function deleteImage(publicUrl: string | null | undefined): Promise<void> {
  if (!publicUrl || !supabase) return;
  const marker = "/object/public/media/";
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return; // bukan milik bucket media (mis. aset bawaan) → biarkan
  const path = publicUrl.slice(idx + marker.length);
  await supabase.storage.from("media").remove([path]).catch(() => {});
}

/* ---------------- Statistik dashboard ---------------- */

export async function countRows(table: string): Promise<number> {
  const c = await client();
  const { count, error } = await c.from(table).select("*", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}
