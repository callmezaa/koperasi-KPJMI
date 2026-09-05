export interface ContentImage {
  src: string;
  /** URL varian WebP — konten bawaan punya pasangan png/webp, hasil upload admin sudah WebP sehingga boleh kosong. */
  srcWebp?: string | null;
}

export interface ProductContent {
  id: string;
  name: string;
  description: string;
  image: ContentImage;
}

export interface GalleryContent {
  id: string;
  title: string;
  category: string;
  image: ContentImage;
}

export interface TestimonialContent {
  id: string;
  name: string;
  position: string;
  comment: string;
  photoUrl: string | null;
}

export interface FaqContent {
  id: string;
  question: string;
  answer: string;
}

export interface ContactContent {
  address: string;
  phone: string;
  email: string;
  hours: string;
  whatsapp: string;
  mapsUrl: string;
  mapsEmbed: string;
}

export interface SiteContent {
  products: ProductContent[];
  gallery: GalleryContent[];
  testimonials: TestimonialContent[];
  faqs: FaqContent[];
  contact: ContactContent;
}

/* ---------- Bentuk baris di Supabase (dipakai provider & admin) ---------- */

export interface ProductRow {
  id: string;
  name: string;
  description: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryRow {
  id: string;
  title: string;
  category: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestimonialRow {
  id: string;
  name: string;
  position: string;
  comment: string;
  photo_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FaqRow {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingsRow {
  id: number;
  address: string;
  phone: string;
  email: string;
  hours: string;
  whatsapp: string;
  maps_url: string;
  maps_embed: string;
  updated_at: string;
}
