import CrudPage from "../components/CrudPage";
import type { FaqRow } from "../../content/types";

export default function FaqPage() {
  return (
    <CrudPage<FaqRow>
      table="faqs"
      entityLabel="Pertanyaan"
      title="FAQ"
      description="Daftar pertanyaan yang sering diajukan, tampil di section FAQ website."
      fields={[
        {
          key: "question",
          label: "Pertanyaan",
          type: "text",
          required: true,
          placeholder: "cth: Bagaimana cara bergabung menjadi anggota?",
        },
        {
          key: "answer",
          label: "Jawaban",
          type: "textarea",
          required: true,
        },
      ]}
      rowTitle={(row) => row.question}
      rowSubtitle={(row) => row.answer}
    />
  );
}
