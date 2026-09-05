import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, PageHeader, Spinner, TextArea, TextInput } from "../components/ui";
import { fetchSettings, saveSettings } from "../api";
import { defaultContent } from "../../content/defaults";
import type { SiteSettingsRow } from "../../content/types";

type ContactForm = Omit<SiteSettingsRow, "id" | "updated_at">;

const emptyForm: ContactForm = {
  address: "",
  phone: "",
  email: "",
  hours: "",
  whatsapp: "",
  maps_url: "",
  maps_embed: "",
};

const textFields: { key: keyof ContactForm; label: string; hint?: string; type?: string }[] = [
  { key: "address", label: "Alamat" },
  { key: "phone", label: "Telepon", hint: "Tampil apa adanya di section Kontak." },
  { key: "email", label: "Email", type: "email" },
  { key: "hours", label: "Jam Operasional" },
  {
    key: "whatsapp",
    label: "Nomor WhatsApp",
    hint: "Format internasional tanpa tanda +, cth: 6285878221758",
  },
  { key: "maps_url", label: "URL Google Maps", hint: "Tautan tombol \u201CGoogle Maps\u201D." },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchSettings()
      .then((row) => {
        if (cancelled) return;
        setForm(
          row
            ? ({
                address: row.address,
                phone: row.phone,
                email: row.email,
                hours: row.hours,
                whatsapp: row.whatsapp,
                maps_url: row.maps_url,
                maps_embed: row.maps_embed,
              } satisfies ContactForm)
            : ({
                ...emptyForm,
                ...defaultContent.contact,
                maps_url: defaultContent.contact.mapsUrl,
                maps_embed: defaultContent.contact.mapsEmbed,
              } satisfies ContactForm),
        );
      })
      .catch((err) => {
        toast.error(err instanceof Error ? err.message : "Gagal memuat info kontak.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await saveSettings(form);
      toast.success("Info kontak tersimpan — website langsung memakai data terbaru.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  function set(key: keyof ContactForm, value: string) {
    setForm((cur) => ({ ...cur, [key]: value }));
  }

  if (loading) return <Spinner />;

  return (
    <div>
      <PageHeader
        title="Info Kontak"
        description="Dipakai di section Kontak, tombol WhatsApp, dan footer website."
      />

      <div className="rounded-2xl border border-[#F3F4F6] bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {textFields.map(({ key, label, hint, type }) => (
            <label
              key={key}
              className={key === "address" ? "block sm:col-span-2" : "block"}
            >
              <span className="mb-1.5 block text-sm font-medium text-[#111827]">{label}</span>
              <TextInput
                type={type ?? "text"}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
              />
              {hint && <span className="mt-1 block text-xs text-[#9CA3AF]">{hint}</span>}
            </label>
          ))}

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-[#111827]">
              URL Embed Google Maps
            </span>
            <TextArea
              value={form.maps_embed}
              onChange={(e) => set("maps_embed", e.target.value)}
              className="min-h-20 font-mono text-xs"
            />
            <span className="mt-1 block text-xs text-[#9CA3AF]">
              Buka Google Maps → Share → Embed a map → salin nilai atribut src dari iframe.
            </span>
          </label>
        </div>

        <div className="mt-6 flex justify-end border-t border-[#F3F4F6] pt-5">
          <Button onClick={handleSave} loading={saving}>
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}
