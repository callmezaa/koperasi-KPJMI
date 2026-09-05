import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { defaultContent } from "./defaults";
import type { SiteContent } from "./types";

const STORAGE_KEY = "kpjmi:site-content:v1";

const ContentContext = createContext<SiteContent>(defaultContent);

/** Ambil konten live dari Supabase. Mengembalikan null bila ada satu saja
 *  query yang gagal (schema belum dibuat, jaringan, dsb) agar pemanggil
 *  tetap memakai cache/konten bawaan — website tidak boleh blank. */
async function fetchLiveContent(): Promise<SiteContent | null> {
  if (!supabase) return null;

  const [productsRes, galleryRes, testimonialsRes, faqsRes, settingsRes] =
    await Promise.all([
      supabase
        .from("products")
        .select("id,name,description,image_url")
        .eq("is_active", true)
        .order("sort_order")
        .order("created_at"),
      supabase
        .from("gallery_items")
        .select("id,title,category,image_url")
        .eq("is_active", true)
        .order("sort_order")
        .order("created_at"),
      supabase
        .from("testimonials")
        .select("id,name,position,comment,photo_url")
        .eq("is_active", true)
        .order("sort_order")
        .order("created_at"),
      supabase
        .from("faqs")
        .select("id,question,answer")
        .eq("is_active", true)
        .order("sort_order")
        .order("created_at"),
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
    ]);

  if (
    productsRes.error ||
    galleryRes.error ||
    testimonialsRes.error ||
    faqsRes.error ||
    settingsRes.error
  ) {
    return null;
  }

  /* Per tabel: kalau DB masih kosong, pakai konten bawaan —
     supaya website tetap utuh sebelum seed pertama dijalankan. */
  return {
    products:
      productsRes.data && productsRes.data.length > 0
        ? productsRes.data.map((row) => ({
            id: row.id as string,
            name: row.name as string,
            description: row.description as string,
            image: { src: row.image_url as string },
          }))
        : defaultContent.products,
    gallery:
      galleryRes.data && galleryRes.data.length > 0
        ? galleryRes.data.map((row) => ({
            id: row.id as string,
            title: row.title as string,
            category: row.category as string,
            image: { src: row.image_url as string },
          }))
        : defaultContent.gallery,
    testimonials:
      testimonialsRes.data && testimonialsRes.data.length > 0
        ? testimonialsRes.data.map((row) => ({
            id: row.id as string,
            name: row.name as string,
            position: row.position as string,
            comment: row.comment as string,
            photoUrl: (row.photo_url as string | null) ?? null,
          }))
        : defaultContent.testimonials,
    faqs:
      faqsRes.data && faqsRes.data.length > 0
        ? faqsRes.data.map((row) => ({
            id: row.id as string,
            question: row.question as string,
            answer: row.answer as string,
          }))
        : defaultContent.faqs,
    contact: settingsRes.data
      ? {
          address: settingsRes.data.address as string,
          phone: settingsRes.data.phone as string,
          email: settingsRes.data.email as string,
          hours: settingsRes.data.hours as string,
          whatsapp: settingsRes.data.whatsapp as string,
          mapsUrl: settingsRes.data.maps_url as string,
          mapsEmbed: settingsRes.data.maps_embed as string,
        }
      : defaultContent.contact,
  };
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) return JSON.parse(cached) as SiteContent;
    } catch {
      /* cache korup → lanjut pakai default */
    }
    return defaultContent;
  });

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;

    fetchLiveContent()
      .then((live) => {
        if (cancelled || !live) return;
        setContent(live);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(live));
        } catch {
          /* kuota penuh — biarkan cache basi */
        }
      })
      .catch(() => {
        /* offline / Supabase error → konten saat ini dipertahankan */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(): SiteContent {
  return useContext(ContentContext);
}
