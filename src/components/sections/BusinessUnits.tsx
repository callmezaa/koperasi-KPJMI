import { motion } from "motion/react";
import { Container } from "../layout/Container";

const items = [
  {
    number: "01",
    title: "Production Capacity",
    stat: "1,5 Tons/month",
    statLabel: "Total kapasitas produksi",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4h12v2H6z" />
        <path d="M4 6h16v2H4z" />
        <path d="M3 8h18v12H3z" />
        <path d="M8 14h8" />
        <path d="M8 17h5" />
        <path d="M10 11h4" />
      </svg>
    ),
    details: [
      { label: "Papaya Chips", value: "Opak & Churros" },
      { label: "Papaya Candy", value: "Permen pepaya" },
      { label: "Papaya Soap", value: "Sabun organik" },
    ],
    badge: "100% Organic",
    footer: "Produksi dilakukan secara tradisional oleh petani lokal dengan bahan baku pepaya organik dari kebun sendiri.",
  },
  {
    number: "02",
    title: "Members",
    stat: "30",
    statLabel: "Petani aktif",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    details: [
      { label: "Desa Kramat", value: "Petani inti" },
      { label: "Kembaran", value: "Petani plasma" },
      { label: "Banyumas Raya", value: "Petani mitra" },
    ],
    badge: "Berkembang",
    footer: "Seluruh anggota binaan mendapat pendampingan teknik budidaya pepaya organik secara berkelanjutan.",
  },
  {
    number: "03",
    title: "Distribution",
    stat: "Reseller, Distributor",
    statLabel: "Saluran distribusi",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    details: [
      { label: "Jawa Tengah", value: "Distribusi langsung" },
      { label: "Koperasi & Reseller", value: "Kemitraan" },
      { label: "Pusat Oleh-Oleh", value: "Banyumas Raya" },
    ],
    badge: "Jawa Tengah",
    footer: "Distribusi langsung ke pelanggan dan mitra di seluruh wilayah Jawa Tengah melalui jaringan koperasi dan reseller.",
  },
];

export function BusinessUnits() {
  return (
    <section id="business-units" className="bg-white py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block text-[14px] font-medium uppercase tracking-[0.15em] text-brand-red">
            Produksi & Distribusi
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] tracking-tight text-[#111827]">
            Kapasitas dan Jangkauan
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-3xl border border-[#E5E7EB] bg-white p-7 shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F9FAFB] text-[#9CA3AF] transition-colors duration-300 group-hover:bg-brand-red/10 group-hover:text-brand-red">
                  {item.icon}
                </div>
                <span className="rounded-full border border-[#E5E7EB] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                  {item.badge}
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-[#111827]">
                {item.title}
              </h3>

              <div className="mt-3">
                <div className="font-display text-[28px] font-extrabold leading-none tracking-tight text-brand-red">
                  {item.stat}
                </div>
                <p className="mt-1 text-xs text-[#9CA3AF]">{item.statLabel}</p>
              </div>

              <div className="mt-6 space-y-3 border-t border-[#F3F4F6] pt-5">
                {item.details.map((d) => (
                  <div key={d.label} className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">{d.label}</span>
                    <span className="text-sm font-medium text-[#111827]">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-relaxed text-[#9CA3AF]">
                {item.footer}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
