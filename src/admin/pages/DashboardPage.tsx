import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  BarChart3,
  CircleHelp,
  Database,
  ExternalLink,
  Images,
  MessageSquareQuote,
  Package,
} from "lucide-react";
import { PageHeader, Spinner } from "../components/ui";
import { countRows } from "../api";
import { isSupabaseConfigured } from "../../lib/supabase";

const supabaseHost = (import.meta.env.VITE_SUPABASE_URL as string | undefined)
  ? new URL(import.meta.env.VITE_SUPABASE_URL as string).host
  : null;

const cards = [
  {
    label: "Produk",
    table: "products",
    to: "/admin/produk",
    icon: Package,
    accent: "bg-brand-red/10 text-brand-red",
  },
  {
    label: "Foto Galeri",
    table: "gallery_items",
    to: "/admin/galeri",
    icon: Images,
    accent: "bg-amber-50 text-amber-600",
  },
  {
    label: "Testimoni",
    table: "testimonials",
    to: "/admin/testimoni",
    icon: MessageSquareQuote,
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Pertanyaan FAQ",
    table: "faqs",
    to: "/admin/faq",
    icon: CircleHelp,
    accent: "bg-blue-50 text-blue-600",
  },
] as const;

export default function DashboardPage() {
  const [counts, setCounts] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    Promise.all(
      cards.map(async ({ table }) => [table, await countRows(table)] as const),
    )
      .then((entries) => {
        if (!cancelled) setCounts(Object.fromEntries(entries));
      })
      .catch((err) => {
        if (!cancelled) toast.error(err instanceof Error ? err.message : "Gagal memuat statistik.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Ringkasan konten website dan tautan monitoring."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map(({ label, table, to, icon: Icon, accent }) => (
          <Link
            key={table}
            to={to}
            className="group flex items-center gap-4 rounded-2xl border border-[#F3F4F6] bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-[#111827]">
                {counts ? counts[table] : "—"}
              </p>
              <p className="text-sm text-[#6B7280]">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <a
          href="https://vercel.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-[#F3F4F6] bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F4F6]">
              <BarChart3 className="h-5 w-5 text-[#111827]" />
            </div>
            <ExternalLink className="h-4 w-4 text-[#D1D5DB] transition-colors group-hover:text-brand-red" />
          </div>
          <h3 className="mt-4 font-display font-bold text-[#111827]">Statistik Pengunjung</h3>
          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
            Jumlah pengunjung, sumber trafik, dan halaman populer tercatat via Vercel
            Analytics. Buka dashboard Vercel → project koperasi-kpjmi → tab Analytics.
          </p>
        </a>

        <div className="rounded-2xl border border-[#F3F4F6] bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F4F6]">
            <Database className="h-5 w-5 text-[#111827]" />
          </div>
          <h3 className="mt-4 font-display font-bold text-[#111827]">Sumber Data</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-[#6B7280]">
            <Database className="h-3.5 w-3.5 text-brand-red" />
            <span className="truncate font-medium text-[#111827]">
              {supabaseHost ?? "belum terhubung"}
            </span>
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
            Perubahan di panel ini langsung tampil di website tanpa deploy ulang.
          </p>
        </div>
      </div>

      {counts === null && isSupabaseConfigured && <Spinner className="py-10" />}
    </div>
  );
}
