import CrudPage from "../components/CrudPage";
import type { TestimonialRow } from "../../content/types";

export default function TestimonialsPage() {
  return (
    <CrudPage<TestimonialRow>
      table="testimonials"
      entityLabel="Testimoni"
      title="Testimoni"
      description="Apresiasi dari anggota yang tampil di carousel Testimoni. Tanpa foto, inisial nama ditampilkan dengan gradien warna."
      folder="testimonials"
      fields={[
        { key: "name", label: "Nama", type: "text", required: true },
        {
          key: "position",
          label: "Keterangan",
          type: "text",
          required: true,
          placeholder: "cth: Anggota sejak 2015",
        },
        {
          key: "comment",
          label: "Isi Testimoni",
          type: "textarea",
          required: true,
          placeholder: "Tulis testimoni anggota di sini…",
        },
        {
          key: "photo_url",
          label: "Foto (opsional)",
          type: "image",
          aspect: "aspect-square",
        },
      ]}
      rowTitle={(row) => row.name}
      rowSubtitle={(row) => row.comment}
    />
  );
}
