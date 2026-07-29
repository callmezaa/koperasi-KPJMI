import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { Container } from "../layout/Container";
import { ResponsiveImage } from "../ui/ResponsiveImage";

const pngImages = import.meta.glob<{ default: string }>("/src/assets/dokumentasi/*.png", {
  eager: true,
});

const webpImages = import.meta.glob<{ default: string }>("/src/assets/dokumentasi/*.webp", {
  eager: true,
});

const toWebp = (pngPath: string) => pngPath.replace(/\.png$/, ".webp");

const gallery = [
  { src: pngImages["/src/assets/dokumentasi/rapat_tahunan1.png"]?.default, srcWebp: webpImages[toWebp("/src/assets/dokumentasi/rapat_tahunan1.png")]?.default, alt: "Rapat Tahunan KPJMI", category: "Acara" },
  { src: pngImages["/src/assets/dokumentasi/rapat_tahunan2.png"]?.default, srcWebp: webpImages[toWebp("/src/assets/dokumentasi/rapat_tahunan2.png")]?.default, alt: "Suasana Rapat Tahunan", category: "Acara" },
  { src: pngImages["/src/assets/dokumentasi/rapat_tahunan3.png"]?.default, srcWebp: webpImages[toWebp("/src/assets/dokumentasi/rapat_tahunan3.png")]?.default, alt: "Diskusi Rapat Tahunan", category: "Acara" },
  { src: pngImages["/src/assets/dokumentasi/sosialisasi1.png"]?.default, srcWebp: webpImages[toWebp("/src/assets/dokumentasi/sosialisasi1.png")]?.default, alt: "Sosialisasi Program", category: "Kegiatan" },
  { src: pngImages["/src/assets/dokumentasi/sosialisasi2.png"]?.default, srcWebp: webpImages[toWebp("/src/assets/dokumentasi/sosialisasi2.png")]?.default, alt: "Sosialisasi Bersama Anggota", category: "Kegiatan" },
  { src: pngImages["/src/assets/dokumentasi/bazar1.png"]?.default, srcWebp: webpImages[toWebp("/src/assets/dokumentasi/bazar1.png")]?.default, alt: "Bazar Produk Unggulan", category: "Kegiatan" },
  { src: pngImages["/src/assets/dokumentasi/baktisosial.png"]?.default, srcWebp: webpImages[toWebp("/src/assets/dokumentasi/baktisosial.png")]?.default, alt: "Bakti Sosial KPJMI", category: "Kegiatan" },
  { src: pngImages["/src/assets/dokumentasi/ceremony.png"]?.default, srcWebp: webpImages[toWebp("/src/assets/dokumentasi/ceremony.png")]?.default, alt: "Acara Seremoni KPJMI", category: "Acara" },
];

const categories = ["Semua", "Acara", "Kegiatan"];

export function Gallery() {
  const [filter, setFilter] = useState("Semua");
  const [selected, setSelected] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const pinchRef = useRef<{ dist: number; scaling: boolean }>({ dist: 0, scaling: false });

  const filtered = filter === "Semua" ? gallery : gallery.filter((item) => item.category === filter);
  const selectedItem = selected !== null ? filtered[selected] : null;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchRef.current.scaling = true;
      pinchRef.current.dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
    } else if (e.touches.length < 2) {
      pinchRef.current.scaling = false;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current.scaling) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      const delta = dist / pinchRef.current.dist;
      setScale((prev) => Math.max(1, Math.min(4, prev * delta)));
      pinchRef.current.dist = dist;
    }
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    setScale(1);
  }, []);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
      if (Math.abs(info.offset.y) > 80 || Math.abs(info.velocity.y) > 500) {
        close();
      }
    },
    [close],
  );

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

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                filter === cat
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/20"
                  : "bg-white text-[#6B7280] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:text-brand-red",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <div key={filter} className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.alt}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.94 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_rgba(0,0,0,0.06)]"
              onClick={() => setSelected(i)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ResponsiveImage
                  src={item.src}
                  srcWebp={item.srcWebp}
                  alt={item.alt}
                  wrapperClassName="h-full w-full"
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
        </AnimatePresence>
      </Container>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={close}
            drag="y"
            onDragEnd={handleDragEnd}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.5}
            style={{ touchAction: "pan-y" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <div
                className="max-h-[75vh] overflow-hidden bg-[#F9FAFB]"
                style={{ transform: `scale(${scale})` }}
                onTransitionEnd={() => setScale(scale)}
              >
                <ResponsiveImage
                  src={selectedItem.src}
                  srcWebp={selectedItem.srcWebp}
                  alt={selectedItem.alt}
                  wrapperClassName="h-full w-full"
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
                onClick={close}
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
