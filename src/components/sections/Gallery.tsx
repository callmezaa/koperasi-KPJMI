import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, X } from "lucide-react";
import { Container } from "../layout/Container";

const images = import.meta.glob<{ default: string }>("/src/assets/dokumentasi/*.png", {
  eager: true,
});

const gallery = [
  { src: images["/src/assets/dokumentasi/rapat_tahunan1.png"]?.default, alt: "Rapat Tahunan KPJMI", category: "Acara" },
  { src: images["/src/assets/dokumentasi/rapat_tahunan2.png"]?.default, alt: "Suasana Rapat Tahunan", category: "Acara" },
  { src: images["/src/assets/dokumentasi/rapat_tahunan3.png"]?.default, alt: "Diskusi Rapat Tahunan", category: "Acara" },
  { src: images["/src/assets/dokumentasi/sosialisasi1.png"]?.default, alt: "Sosialisasi Program", category: "Kegiatan" },
  { src: images["/src/assets/dokumentasi/sosialisasi2.png"]?.default, alt: "Sosialisasi Bersama Anggota", category: "Kegiatan" },
  { src: images["/src/assets/dokumentasi/bazar1.png"]?.default, alt: "Bazar Produk Unggulan", category: "Kegiatan" },
  { src: images["/src/assets/dokumentasi/baktisosial.png"]?.default, alt: "Bakti Sosial KPJMI", category: "Kegiatan" },
  { src: images["/src/assets/dokumentasi/ceremony.png"]?.default, alt: "Acara Seremoni KPJMI", category: "Acara" },
];

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedItem = selected !== null ? gallery[selected] : null;

  return (
    <section id="gallery" className="bg-[#FAFAFA] py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block text-[14px] font-medium uppercase tracking-[0.15em] text-brand-red">
            Dokumentasi
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] tracking-tight text-[#111827]">
            Galeri Kegiatan
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[#6B7280]">
            Momen dan kegiatan terbaik KPJMI dalam mendukung petani lokal.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {gallery.map((item, i) => (
            <motion.div
              key={item.alt}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              onClick={() => setSelected(i)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
                  {item.category}
                </span>
                <p className="mt-1.5 text-sm font-medium text-white drop-shadow-sm">
                  {item.alt}
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <ZoomIn className="h-5 w-5 text-brand-red" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[75vh] overflow-hidden bg-[#F9FAFB]">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  className="w-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <span className="inline-block rounded-full bg-brand-red/10 px-3 py-1 text-xs font-medium text-brand-red">
                    {selectedItem.category}
                  </span>
                  <p className="mt-2 text-base font-medium text-[#111827]">
                    {selectedItem.alt}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
