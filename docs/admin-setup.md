# Panduan Setup Admin Dashboard KPJMI

Panel admin untuk mengelola konten website: **Produk, Galeri, Testimoni, FAQ, dan Info Kontak**.
Perubahan tersimpan di Supabase dan langsung tampil di website tanpa deploy ulang.

- URL lokal: `http://localhost:5173/admin`
- URL produksi: `<domain-anda>/admin`

---

## 1. Buat Project Supabase (sekali saja, ±2 menit)

1. Buka [supabase.com](https://supabase.com) → daftar/masuk → **New project**.
2. Isi nama project (mis. `kpjmi`) dan password database → pilih region terdekat (Singapore).
3. Tunggu project selesai dibuat.

## 2. Jalankan Skema Database

1. Di dashboard Supabase, buka **SQL Editor** → **New query**.
2. Salin **seluruh isi** file [`supabase/schema.sql`](../supabase/schema.sql) → klik **Run**.
3. Ini akan membuat 5 tabel konten + keamanan RLS (publik hanya bisa baca) + bucket
   Storage publik bernama `media`.

## 3. Isi File `.env.local`

Salin `.env.example` menjadi `.env.local`, lalu isi dari **Project Settings → API**:

```ini
# Wajib — dipakai website & admin
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Wajib untuk seed — service key (JANGAN pernah di-commit / di-share)
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Opsional — untuk membuat akun admin lewat script seed
ADMIN_EMAIL=admin@kpjmi.id
ADMIN_PASSWORD=passwordMinimal6Karakter
```

> `VITE_SUPABASE_ANON_KEY` aman diekspos ke browser — akses tulis tetap diblokir RLS.
> `SUPABASE_SERVICE_ROLE_KEY` hanya dipakai script seed di komputer lokal.

## 4. Isi Data Awal (Seed)

```bash
npm run seed
```

Script ini otomatis:
- meng-upload 6 foto produk + 8 foto galeri ke Supabase Storage (sudah dikonversi WebP),
- mengisi tabel produk, galeri, testimoni, FAQ, dan info kontak dengan konten yang
  sekarang tayang,
- membuat akun admin dari `ADMIN_EMAIL` / `ADMIN_PASSWORD` (jika diisi).

Setelah selesai, **restart dev server** (`npm run dev`) dan buka `http://localhost:5173`.

## 5. Deploy ke Vercel

1. Buka project di [vercel.com/dashboard](https://vercel.com/dashboard) → **Settings → Environment Variables**.
2. Tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` (Production + Preview).
3. Redeploy (push commit, atau **Deployments → Redeploy**).
4. Statistik pengunjung otomatis aktif di tab **Analytics** project Vercel (gratis).

---

## Cara Pakai Panel Admin

| Halaman | Fungsi |
| --- | --- |
| **Dashboard** | Ringkasan jumlah konten + tautan statistik pengunjung (Vercel Analytics) |
| **Produk** | Tambah/ubah/hapus produk, urutkan, aktif-nonaktifkan, upload foto |
| **Galeri** | Kelola foto dokumentasi + kategori (kategori otomatis jadi tombol filter) |
| **Testimoni** | Kelola testimoni anggota; foto opsional (tanpa foto = inisial + gradien) |
| **FAQ** | Kelola pertanyaan-jawaban, urutkan, aktif-nonaktifkan |
| **Info Kontak** | Alamat, telepon, email, jam operasional, WhatsApp, peta Google Maps |

Perilaku penting:

- **Perubahan langsung tayang** — pengunjung yang sudah membuka halaman akan melihat
  konten baru saat membuka ulang; tidak perlu deploy.
- **Tombol mata (aktif/nonaktif)** — menyembunyikan item dari website tanpa menghapusnya.
- **Urutan** — tombol panah naik/turun mengubah urutan tampil di website.
- **Upload foto** otomatis dikompres & dikonversi ke WebP di browser sebelum dikirim.
- **Website tidak akan blank** — jika Supabase tidak terjangkau, website memakai cache
  lokal, dan jika belum ada data sama sekali, memakai konten bawaan.

## Keamanan

- Login admin memakai Supabase Auth (email + password). Buat admin tambahan via
  **Dashboard Supabase → Authentication → Users → Add user** (centang *Auto Confirm User*).
- Semua tabel dilindungi RLS: pengunjung anonim hanya bisa **membaca**; hanya user yang
  login yang bisa menulis.
- Jangan pernah mem-commit `SUPABASE_SERVICE_ROLE_KEY` — sudah dicegah `.gitignore`.

## Troubleshooting

| Masalah | Solusi |
| --- | --- |
| `/admin` menampilkan "Supabase belum terhubung" | Cek `.env.local` sudah terisi benar, lalu restart dev server |
| Halaman admin error saat memuat data | Pastikan `supabase/schema.sql` sudah dijalankan di SQL Editor |
| Gagal seed: "Gagal mengosongkan …" | Skema belum lengkap — jalankan ulang `schema.sql` |
| Perubahan tidak muncul di website | Buka ulang halaman (hard refresh); cek item dalam kondisi *aktif* |
| Lupa password admin | Supabase Dashboard → Authentication → Users → pilih user → Reset password |
