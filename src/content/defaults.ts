import type { SiteContent } from "./types";

/* Konten bawaan = konten yang saat ini tayang di website.
   Dipakai sebagai fallback saat Supabase belum dikonfigurasi / tidak terjangkau,
   dan sebagai data awal untuk script seed. */

import candyPng from "../assets/papaya candy.png";
import candyWebp from "../assets/papaya candy.webp";
import chipPng from "../assets/papaya chip.png";
import chipWebp from "../assets/papaya chip.webp";
import soapPng from "../assets/papay soap.png";
import soapWebp from "../assets/papay soap.webp";
import palmPng from "../assets/palm sugar.png";
import palmWebp from "../assets/palm sugar.webp";
import honeyPng from "../assets/forest honey.png";
import honeyWebp from "../assets/forest honey.webp";
import teaPng from "../assets/herbal tea.png";
import teaWebp from "../assets/herbal tea.webp";

import rapat1Png from "../assets/dokumentasi/rapat_tahunan1.png";
import rapat1Webp from "../assets/dokumentasi/rapat_tahunan1.webp";
import rapat2Png from "../assets/dokumentasi/rapat_tahunan2.png";
import rapat2Webp from "../assets/dokumentasi/rapat_tahunan2.webp";
import rapat3Png from "../assets/dokumentasi/rapat_tahunan3.png";
import rapat3Webp from "../assets/dokumentasi/rapat_tahunan3.webp";
import sosialisasi1Png from "../assets/dokumentasi/sosialisasi1.png";
import sosialisasi1Webp from "../assets/dokumentasi/sosialisasi1.webp";
import sosialisasi2Png from "../assets/dokumentasi/sosialisasi2.png";
import sosialisasi2Webp from "../assets/dokumentasi/sosialisasi2.webp";
import bazar1Png from "../assets/dokumentasi/bazar1.png";
import bazar1Webp from "../assets/dokumentasi/bazar1.webp";
import baktisosialPng from "../assets/dokumentasi/baktisosial.png";
import baktisosialWebp from "../assets/dokumentasi/baktisosial.webp";
import ceremonyPng from "../assets/dokumentasi/ceremony.png";
import ceremonyWebp from "../assets/dokumentasi/ceremony.webp";

export const defaultContent: SiteContent = {
  products: [
    {
      id: "p1",
      name: "Papaya Candy",
      description: "Permen pepaya organik dengan rasa alami buah pepaya pilihan dari kebun sendiri.",
      image: { src: candyPng, srcWebp: candyWebp },
    },
    {
      id: "p2",
      name: "Papaya Chips",
      description: "Opak dan churros pepaya renyah dari pepaya organik segar, camilan sehat tanpa pengawet.",
      image: { src: chipPng, srcWebp: chipWebp },
    },
    {
      id: "p3",
      name: "Papaya Soap",
      description: "Sabun pepaya organik kaya vitamin untuk perawatan kulit alami.",
      image: { src: soapPng, srcWebp: soapWebp },
    },
    {
      id: "p4",
      name: "Palm Sugar",
      description: "Gula aren organik dari nira pohon aren pilihan, diolah secara tradisional oleh petani lokal Banyumas.",
      image: { src: palmPng, srcWebp: palmWebp },
    },
    {
      id: "p5",
      name: "Forest Honey",
      description: "Madu hutan asli dari kawasan Banyumas, kaya manfaat dan dipanen secara berkelanjutan.",
      image: { src: honeyPng, srcWebp: honeyWebp },
    },
    {
      id: "p6",
      name: "Herbal Tea",
      description: "Teh herbal dari rempah-rempah alami, diproduksi dengan proses organik tanpa bahan pengawet.",
      image: { src: teaPng, srcWebp: teaWebp },
    },
  ],
  gallery: [
    { id: "g1", title: "Rapat Tahunan KPJMI", category: "Acara", image: { src: rapat1Png, srcWebp: rapat1Webp } },
    { id: "g2", title: "Suasana Rapat Tahunan", category: "Acara", image: { src: rapat2Png, srcWebp: rapat2Webp } },
    { id: "g3", title: "Diskusi Rapat Tahunan", category: "Acara", image: { src: rapat3Png, srcWebp: rapat3Webp } },
    { id: "g4", title: "Sosialisasi Program", category: "Kegiatan", image: { src: sosialisasi1Png, srcWebp: sosialisasi1Webp } },
    { id: "g5", title: "Sosialisasi Bersama Anggota", category: "Kegiatan", image: { src: sosialisasi2Png, srcWebp: sosialisasi2Webp } },
    { id: "g6", title: "Bazar Produk Unggulan", category: "Kegiatan", image: { src: bazar1Png, srcWebp: bazar1Webp } },
    { id: "g7", title: "Bakti Sosial KPJMI", category: "Kegiatan", image: { src: baktisosialPng, srcWebp: baktisosialWebp } },
    { id: "g8", title: "Acara Seremoni KPJMI", category: "Acara", image: { src: ceremonyPng, srcWebp: ceremonyWebp } },
  ],
  testimonials: [
    {
      id: "t1",
      name: "Sari Dewi",
      position: "Anggota sejak 2010",
      comment:
        "KPJMI benar-benar membantu usaha kecil saya. Pinjaman modal dengan bunga ringan membuat bisnis kuliner saya bisa berkembang hingga memiliki tiga cabang.",
      photoUrl: null,
    },
    {
      id: "t2",
      name: "Bambang Priyanto",
      position: "Anggota sejak 2015",
      comment:
        "Program Tabungan Hari Tua dari KPJMI memberi saya rasa aman untuk masa pensiun. Pelayanannya cepat dan petugasnya sangat ramah.",
      photoUrl: null,
    },
    {
      id: "t3",
      name: "Fitri Handayani",
      position: "Anggota sejak 2018",
      comment:
        "Aplikasi mobile KPJMI memudahkan saya mengecek saldo dan mengajukan pinjaman kapan saja. Tidak perlu antre di kantor lagi.",
      photoUrl: null,
    },
    {
      id: "t4",
      name: "Ahmad Rizki",
      position: "Anggota sejak 2012",
      comment:
        "Pelatihan kewirausahaan yang diadakan KPJMI sangat bermanfaat. Saya mendapatkan banyak ilmu baru yang langsung saya terapkan di toko saya.",
      photoUrl: null,
    },
  ],
  faqs: [
    {
      id: "f1",
      question: "Apa itu KPJMI?",
      answer:
        "KPJMI (Koperasi Petani Jaya Makmur Indonesia) adalah koperasi pertanian yang berfokus pada budidaya dan pengolahan produk pepaya organik. Berdiri di Desa Kramat, Kembaran, Banyumas, kami menghimpun petani lokal untuk bersama-sama mengembangkan pertanian berkelanjutan dan meningkatkan nilai hasil bumi melalui produk olahan berkualitas tinggi.",
    },
    {
      id: "f2",
      question: "Apa saja produk unggulan KPJMI?",
      answer:
        "Produk unggulan KPJMI meliputi olahan pepaya organik seperti Papaya Candy, Papaya Chips (Opak & Churros), dan Papaya Soap. Kami juga mengembangkan Palm Sugar (gula aren organik), Forest Honey (madu hutan asli Banyumas), serta Herbal Tea dari rempah-rempah alami. Seluruh produk diproses secara higienis tanpa bahan pengawet.",
    },
    {
      id: "f3",
      question: "Siapa saja yang bisa bergabung menjadi anggota?",
      answer:
        "Keanggotaan KPJMI terbuka bagi petani di wilayah Banyumas dan sekitarnya yang ingin mengembangkan usaha pertanian secara bersama-sama. Kami menyambut petani pepaya, aren, dan komoditas organik lainnya untuk bergabung dan mendapatkan akses pendampingan teknis, sarana produksi, serta pemasaran hasil panen.",
    },
    {
      id: "f4",
      question: "Bagaimana cara bergabung menjadi anggota KPJMI?",
      answer:
        "Calon anggota dapat mendaftar dengan mengunjungi sekretariat KPJMI di Desa Kramat, Kembaran, Banyumas. Persyaratan meliputi fotokopi KTP, Kartu Keluarga, dan surat keterangan dari kepala desa. Setelah memenuhi simpanan pokok dan simpanan wajib, petani resmi menjadi anggota dan dapat mengikuti program-program pemberdayaan koperasi.",
    },
    {
      id: "f5",
      question: "Di mana lokasi KPJMI?",
      answer:
        "Kantor dan lokasi produksi KPJMI berada di Desa Kramat, Kecamatan Kembaran, Kabupaten Banyumas, Jawa Tengah. Proses budidaya pepaya organik dan produksi olahan dilakukan langsung oleh petani anggota di area sekitar dengan pengawasan quality control yang ketat.",
    },
    {
      id: "f6",
      question: "Apakah produk KPJMI memiliki izin edar?",
      answer:
        "Ya, seluruh produk olahan KPJMI diproduksi dengan standar higienis dan telah memiliki izin edar dari instansi terkait. Kami menerapkan sistem produksi yang baik (GMP) dan secara berkala menjalani pengawasan mutu untuk memastikan produk aman dan berkualitas bagi konsumen.",
    },
    {
      id: "f7",
      question: "Bagaimana cara membeli produk KPJMI?",
      answer:
        "Produk KPJMI dapat dibeli melalui jaringan reseller dan distributor di wilayah Jawa Tengah, serta melalui pusat oleh-oleh di Banyumas Raya. Untuk pemesanan partai besar atau kerja sama distribusi, Anda dapat menghubungi kami melalui kontak WhatsApp yang tersedia di halaman Kontak.",
    },
    {
      id: "f8",
      question: "Apa program pemberdayaan yang dilakukan KPJMI?",
      answer:
        "KPJMI secara rutin mengadakan bimbingan teknis budidaya pepaya organik, pelatihan pengolahan hasil tani, dan pendampingan akses pasar bagi anggota. Kami juga menjalin kemitraan dengan berbagai pihak untuk memperluas jangkauan pemasaran dan meningkatkan kapasitas produksi petani lokal secara berkelanjutan.",
    },
  ],
  contact: {
    address: "Desa Kramat, Kembaran, Kab. Banyumas, Jawa Tengah",
    phone: "085878221758",
    email: "koperasimakmur@company.com",
    hours: "Senin - Jumat, 08:00 - 16:00 WIB",
    whatsapp: "6285878221758",
    mapsUrl: "https://www.google.com/maps?q=koperasi+petani+jaya+makmur+indonesia+banyumas",
    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3374.484390854256!2d109.2760591097837!3d-7.393354472756299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655997f19e11b1%3A0xbefdb6c7c5795967!2skoperasi%20petani%20jaya%20makmur%20indonesia!5e1!3m2!1sid!2sid!4v1785254402912!5m2!1sid!2sid",
  },
};
