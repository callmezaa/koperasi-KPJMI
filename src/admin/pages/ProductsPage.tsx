import CrudPage from "../components/CrudPage";
import type { ProductRow } from "../../content/types";

export default function ProductsPage() {
  return (
    <CrudPage<ProductRow>
      table="products"
      entityLabel="Produk"
      title="Produk"
      description="Kelola produk unggulan yang tampil di section Produk website."
      folder="products"
      fields={[
        { key: "name", label: "Nama Produk", type: "text", required: true },
        {
          key: "description",
          label: "Deskripsi",
          type: "textarea",
          required: true,
          placeholder: "Deskripsi singkat produk…",
        },
        { key: "image_url", label: "Foto Produk", type: "image", required: true },
      ]}
      rowTitle={(row) => row.name}
      rowSubtitle={(row) => row.description}
      rowImage={(row) => row.image_url}
    />
  );
}
