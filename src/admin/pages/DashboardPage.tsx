import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowUpRight,
  BarChart3,
  CircleHelp,
  Database,
  ExternalLink,
  Images,
  MessageSquareQuote,
  Package,
} from "lucide-react";
import { PageHeader } from "../components/ui";
import { countRows } from "../api";
import { isSupabaseConfigured } from "../../lib/supabase";
import { cn } from "../../utils/cn";

const cards = [
  { label: "Produk", table: "products", to: "/admin/produk", icon: Package },
  { label: "Foto Galeri", table: "gallery_items", to: "/admin/galeri", icon: Images },
  { label: "Testimoni", table: "testimonials", to: "/admin/testimoni", icon: MessageSquareQuote },
  { label: "Pertanyaan FAQ", table: "faqs", to: "/admin/faq", icon: CircleHelp },
] as const;

const cardClass =
  "rounded-2xl border border-black/[0.08] bg-white transition-all duration-150 hover:border-black/[0.14] hover:shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)]";

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
        if (!cancelled)
          toast.error(err instanceof Error ? err.message : "Gagal memuat statistik.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const supabaseHost = (import.meta.env.VITE_SUPABASE_URL as string | undefined)
    ? new URL(import.meta.env.VITE_SUPABASE_URL as string).host
    : null;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Ringkasan konten website dan tautan monitoring."
      />

      {/* ringkasan konten */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, table, to, icon: Icon }) => (
          <Link
            key={table}
            to={to}
            className={cn("group", cardClass)}
          >
            <div className="flex items-center gap-3.5 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-[#525252]">
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0 flex-1">
                {counts ? (
                  <p className="font-display text-2xl font-bold leading-none tracking-tight text-[#262626] [font-feature-settings:'tnum']">
                    {counts[table]}
                  </p>
                ) : (
                  <div className="h-6 w-10 animate-pulse rounded-md bg-black/[0.06]" />
                )}
                <p className="mt-1.5 text-sm text-[#686868]">{label}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 self-start text-[#D4D4D4] transition-colors duration-150 group-hover:text-[#262626]" />
            </div>
          </Link>
        ))}
      </div>

      {/* monitoring */}
      <h2 className="mb-4 mt-10 font-display text-lg font-bold tracking-tight text-[#262626]">
        Monitoring
      </h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <a
          href="https://vercel.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className={`${cardClass} group block p-6`}
        >
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/[0.04] text-[#525252]">
              <BarChart3 className="h-[18px] w-[18px]" />
            </div>
            <ExternalLink className="h-4 w-4 text-[#D4D4D4] transition-colors duration-150 group-hover:text-[#262626]" />
          </div>
          <h3 className="mt-4 font-display font-bold tracking-tight text-[#262626]">
            Statistik Pengunjung
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-[#686868]">
            Jumlah pengunjung, sumber trafik, dan halaman populer tercatat via Vercel
            Analytics. Buka dashboard Vercel → project koperasi-kpjmi → tab Analytics.
          </p>
        </a>

        <div className={`${cardClass} p-6`}>
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/[0.04] text-[#525252]">
              <Database className="h-[18px] w-[18px]" />
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Sinkron otomatis
            </span>
          </div>
          <h3 className="mt-4 font-display font-bold tracking-tight text-[#262626]">
            Sumber Data
          </h3>
          <p className="mt-1 truncate text-sm font-medium text-[#262626]">
            {supabaseHost ?? "belum terhubung"}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#686868]">
            Perubahan di panel ini langsung tayang di website tanpa deploy ulang.
          </p>
        </div>
      </div>
    </div>
  );
}
