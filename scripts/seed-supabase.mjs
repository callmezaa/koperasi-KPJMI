#!/usr/bin/env node
/* ===========================================================================
   Seed awal KPJMI ke Supabase — upload gambar ke Storage + isi tabel konten
   + buat akun admin. Skema (supabase/schema.sql) HARUS sudah dijalankan dulu.

   Pemakaian:
     1. Salin .env.example → .env.local, lalu isi:
          VITE_SUPABASE_URL=https://xxxx.supabase.co
          SUPABASE_SERVICE_ROLE_KEY=eyJ...   (Dashboard → Settings → API)
          ADMIN_EMAIL=admin@contoh.com       (opsional, untuk akun admin)
          ADMIN_PASSWORD=...                 (opsional, minimal 6 karakter)
     2. npm run seed
   =========================================================================== */

import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- loader .env.local / .env (tanpa dependency dotenv) ---------- */

function loadEnvFile(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const value = m[2].replace(/^["']|["']$/g, "");
    if (!(m[1] in process.env)) process.env[m[1]] = value;
  }
}
loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "\n✗ VITE_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi di .env.local\n" +
      "  (service key ada di Supabase Dashboard → Project Settings → API)\n",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

/* ---------- konten seed (mirror dari src/content/defaults.ts) ---------- */

const products = [
  { name: "Papaya Candy", description: "Permen pepaya organik dengan rasa alami buah pepaya pilihan dari kebun sendiri.", file: "papaya candy.png" },
  { name: "Papaya Chips", description: "Opak dan churros pepaya renyah dari pepaya organik segar, camilan sehat tanpa pengawet.", file: "papaya chip.png" },
  { name: "Papaya Soap", description: "Sabun pepaya organik kaya vitamin untuk perawatan kulit alami.", file: "papay soap.png" },
  { name: "Palm Sugar", description: "Gula aren organik dari nira pohon aren pilihan, diolah secara tradisional oleh petani lokal Banyumas.", file: "palm sugar.png" },
  { name: "Forest Honey", description: "Madu hutan asli dari kawasan Banyumas, kaya manfaat dan dipanen secara berkelanjutan.", file: "forest honey.png" },
  { name: "Herbal Tea", description: "Teh herbal dari rempah-rempah alami, diproduksi dengan proses organik tanpa bahan pengawet.", file: "herbal tea.png" },
];

const gallery = [
  { title: "Rapat Tahunan KPJMI", category: "Acara", file: "rapat_tahunan1.png" },
  { title: "Suasana Rapat Tahunan", category: "Acara", file: "rapat_tahunan2.png" },
  { title: "Diskusi Rapat Tahunan", category: "Acara", file: "rapat_tahunan3.png" },
  { title: "Sosialisasi Program", category: "Kegiatan", file: "sosialisasi1.png" },
  { title: "Sosialisasi Bersama Anggota", category: "Kegiatan", file: "sosialisasi2.png" },
  { title: "Bazar Produk Unggulan", category: "Kegiatan", file: "bazar1.png" },
  { title: "Bakti Sosial KPJMI", category: "Kegiatan", file: "baktisosial.png" },
  { title: "Acara Seremoni KPJMI", category: "Acara", file: "ceremony.png" },
];

const testimonials = [
  { name: "Sari Dewi", position: "Anggota sejak 2010", comment: "KPJMI benar-benar membantu usaha kecil saya. Pinjaman modal dengan bunga ringan membuat bisnis kuliner saya bisa berkembang hingga memiliki tiga cabang." },
  { name: "Bambang Priyanto", position: "Anggota sejak 2015", comment: "Program Tabungan Hari Tua dari KPJMI memberi saya rasa aman untuk masa pensiun. Pelayanannya cepat dan petugasnya sangat ramah." },
  { name: "Fitri Handayani", position: "Anggota sejak 2018", comment: "Aplikasi mobile KPJMI memudahkan saya mengecek saldo dan mengajukan pinjaman kapan saja. Tidak perlu antre di kantor lagi." },
  { name: "Ahmad Rizki", position: "Anggota sejak 2012", comment: "Pelatihan kewirausahaan yang diadakan KPJMI sangat bermanfaat. Saya mendapatkan banyak ilmu baru yang langsung saya terapkan di toko saya." },
];

const faqs = [
  { question: "Apa itu KPJMI?", answer: "KPJMI (Koperasi Petani Jaya Makmur Indonesia) adalah koperasi pertanian yang berfokus pada budidaya dan pengolahan produk pepaya organik. Berdiri di Desa Kramat, Kembaran, Banyumas, kami menghimpun petani lokal untuk bersama-sama mengembangkan pertanian berkelanjutan dan meningkatkan nilai hasil bumi melalui produk olahan berkualitas tinggi." },
  { question: "Apa saja produk unggulan KPJMI?", answer: "Produk unggulan KPJMI meliputi olahan pepaya organik seperti Papaya Candy, Papaya Chips (Opak & Churros), dan Papaya Soap. Kami juga mengembangkan Palm Sugar (gula aren organik), Forest Honey (madu hutan asli Banyumas), serta Herbal Tea dari rempah-rempah alami. Seluruh produk diproses secara higienis tanpa bahan pengawet." },
  { question: "Siapa saja yang bisa bergabung menjadi anggota?", answer: "Keanggotaan KPJMI terbuka bagi petani di wilayah Banyumas dan sekitarnya yang ingin mengembangkan usaha pertanian secara bersama-sama. Kami menyambut petani pepaya, aren, dan komoditas organik lainnya untuk bergabung dan mendapatkan akses pendampingan teknis, sarana produksi, serta pemasaran hasil panen." },
  { question: "Bagaimana cara bergabung menjadi anggota KPJMI?", answer: "Calon anggota dapat mendaftar dengan mengunjungi sekretariat KPJMI di Desa Kramat, Kembaran, Banyumas. Persyaratan meliputi fotokopi KTP, Kartu Keluarga, dan surat keterangan dari kepala desa. Setelah memenuhi simpanan pokok dan simpanan wajib, petani resmi menjadi anggota dan dapat mengikuti program-program pemberdayaan koperasi." },
  { question: "Di mana lokasi KPJMI?", answer: "Kantor dan lokasi produksi KPJMI berada di Desa Kramat, Kecamatan Kembaran, Kabupaten Banyumas, Jawa Tengah. Proses budidaya pepaya organik dan produksi olahan dilakukan langsung oleh petani anggota di area sekitar dengan pengawasan quality control yang ketat." },
  { question: "Apakah produk KPJMI memiliki izin edar?", answer: "Ya, seluruh produk olahan KPJMI diproduksi dengan standar higienis dan telah memiliki izin edar dari instansi terkait. Kami menerapkan sistem produksi yang baik (GMP) dan secara berkala menjalani pengawasan mutu untuk memastikan produk aman dan berkualitas bagi konsumen." },
  { question: "Bagaimana cara membeli produk KPJMI?", answer: "Produk KPJMI dapat dibeli melalui jaringan reseller dan distributor di wilayah Jawa Tengah, serta melalui pusat oleh-oleh di Banyumas Raya. Untuk pemesanan partai besar atau kerja sama distribusi, Anda dapat menghubungi kami melalui kontak WhatsApp yang tersedia di halaman Kontak." },
  { question: "Apa program pemberdayaan yang dilakukan KPJMI?", answer: "KPJMI secara rutin mengadakan bimbingan teknis budidaya pepaya organik, pelatihan pengolahan hasil tani, dan pendampingan akses pasar bagi anggota. Kami juga menjalin kemitraan dengan berbagai pihak untuk memperluas jangkauan pemasaran dan meningkatkan kapasitas produksi petani lokal secara berkelanjutan." },
];

const contact = {
  address: "Desa Kramat, Kembaran, Kab. Banyumas, Jawa Tengah",
  phone: "085878221758",
  email: "koperasimakmur@company.com",
  hours: "Senin - Jumat, 08:00 - 16:00 WIB",
  whatsapp: "6285878221758",
  maps_url: "https://www.google.com/maps?q=koperasi+petani+jaya+makmur+indonesia+banyumas",
  maps_embed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3374.484390854256!2d109.2760591097837!3d-7.393354472756299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655997f19e11b1%3A0xbefdb6c7c5795967!2skoperasi%20petani%20jaya%20makmur%20indonesia!5e1!3m2!1sid!2sid!4v1785254402912!5m2!1sid!2sid",
};

/* ---------- helpers ---------- */

const slugify = (s) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "");

async function uploadAsWebp(localFile, storagePath) {
  const buffer = await sharp(path.join(root, localFile)).webp({ quality: 80 }).toBuffer();
  const { error } = await supabase.storage
    .from("media")
    .upload(storagePath, buffer, { contentType: "image/webp", upsert: true });
  if (error) throw error;
  return supabase.storage.from("media").getPublicUrl(storagePath).data.publicUrl;
}

async function wipeTable(table) {
  const { error } = await supabase.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) throw new Error(`Gagal mengosongkan ${table}: ${error.message}`);
}

/* ---------- main ---------- */

async function main() {
  console.log(`\n▶ Seed ke ${url}\n`);

  console.log("1/6 Mengosongkan tabel konten…");
  for (const t of ["products", "gallery_items", "testimonials", "faqs"]) await wipeTable(t);

  console.log("2/6 Upload gambar produk…");
  const productRows = [];
  for (const [i, p] of products.entries()) {
    const url = await uploadAsWebp(
      path.join("src/assets", p.file),
      `products/${slugify(p.name)}.webp`,
    );
    productRows.push({ name: p.name, description: p.description, image_url: url, sort_order: i, is_active: true });
    console.log(`   ✓ ${p.name}`);
  }

  console.log("3/6 Upload gambar galeri…");
  const galleryRows = [];
  for (const [i, g] of gallery.entries()) {
    const url = await uploadAsWebp(
      path.join("src/assets/dokumentasi", g.file),
      `gallery/${slugify(g.title)}-${i + 1}.webp`,
    );
    galleryRows.push({ title: g.title, category: g.category, image_url: url, sort_order: i, is_active: true });
    console.log(`   ✓ ${g.title}`);
  }

  console.log("4/6 Isi tabel produk & galeri…");
  const { error: e1 } = await supabase.from("products").insert(productRows);
  if (e1) throw e1;
  const { error: e2 } = await supabase.from("gallery_items").insert(galleryRows);
  if (e2) throw e2;

  console.log("5/6 Isi testimoni, FAQ, dan info kontak…");
  const { error: e3 } = await supabase.from("testimonials").insert(
    testimonials.map((t, i) => ({ ...t, photo_url: null, sort_order: i, is_active: true })),
  );
  if (e3) throw e3;
  const { error: e4 } = await supabase.from("faqs").insert(
    faqs.map((f, i) => ({ ...f, sort_order: i, is_active: true })),
  );
  if (e4) throw e4;
  const { error: e5 } = await supabase.from("site_settings").upsert(
    { id: 1, ...contact, updated_at: new Date().toISOString() },
  );
  if (e5) throw e5;

  console.log("6/6 Akun admin…");
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const { data: list } = await supabase.auth.admin.listUsers();
    const exists = list?.users?.some((u) => u.email === process.env.ADMIN_EMAIL);
    if (exists) {
      console.log(`   = Akun ${process.env.ADMIN_EMAIL} sudah ada (dilewati)`);
    } else {
      const { error } = await supabase.auth.admin.createUser({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        email_confirm: true,
      });
      if (error) throw error;
      console.log(`   ✓ Akun admin dibuat: ${process.env.ADMIN_EMAIL}`);
    }
  } else {
    console.log("   - ADMIN_EMAIL/ADMIN_PASSWORD tidak diisi — buat akun manual via Dashboard → Authentication → Users");
  }

  console.log("\n✓ Seed selesai! Website kini membaca konten dari Supabase.\n");
}

main().catch((err) => {
  console.error(`\n✗ ${err.message}\n`);
  process.exit(1);
});
