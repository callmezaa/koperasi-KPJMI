import CrudPage from "../components/CrudPage";
import type { GalleryRow } from "../../content/types";

export default function GalleryPage() {
  return (
    <CrudPage<GalleryRow>
      table="gallery_items"
      entityLabel="Foto"
      title="Galeri"
      description="Dokumentasi kegiatan yang tampil di section Galeri. Kategori menjadi tombol filter di website."
      folder="gallery"
      fields={[
        {
          key: "title",
          label: "Judul / Keterangan",
          type: "text",
          required: true,
          placeholder: "cth: Rapat Tahunan KPJMI",
        },
        {
          key: "category",
          label: "Kategori",
          type: "datalist",
          required: true,
          hint: "Ketik kategori baru atau pilih yang sudah ada.",
          options: (rows) => (rows as GalleryRow[]).map((r) => r.category),
        },
        { key: "image_url", label: "Foto", type: "image", required: true },
      ]}
      rowTitle={(row) => row.title}
      rowSubtitle={(row) => row.category}
      rowImage={(row) => row.image_url}
    />
  );
}
