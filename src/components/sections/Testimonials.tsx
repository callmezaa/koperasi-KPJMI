import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "../layout/Container";
import { useContent } from "../../content/provider";
import { cn } from "../../utils/cn";

const avatarGradients = [
  "linear-gradient(135deg, #f59e0b, #d97706)",
  "linear-gradient(135deg, #059669, #0d9488)",
  "linear-gradient(135deg, #3b82f6, #4f46e5)",
  "linear-gradient(135deg, #7c3aed, #9333ea)",
];

export function Testimonials() {
  const { testimonials } = useContent();
  const [progress, setProgress] = useState(0);
  const progressStartRef = useRef(Date.now());
  const rafRef = useRef<number>(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef(emblaApi?.plugins()?.autoplay);

  useEffect(() => {
    autoplayRef.current = emblaApi?.plugins()?.autoplay;
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const reset = () => { progressStartRef.current = Date.now(); setProgress(0); };
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      reset();
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const tick = () => {
      if (autoplayRef.current?.isPlaying()) {
        setProgress(Math.min((Date.now() - progressStartRef.current) / 4000, 1));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-[#FAFAFA] py-24 sm:py-32">
      <Container>
        <div className="mb-16 text-center">
          <span className="mb-4 block text-[14px] font-medium uppercase tracking-[0.15em] text-brand-red">
            Testimoni
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] tracking-tight text-[#111827]">
            Apa Kata Anggota Kami
          </h2>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className="min-w-0 flex-[0_0_100%] px-3 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
                >
                  <div className="flex h-full flex-col rounded-2xl border border-[#F3F4F6] bg-white p-7 shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                    <div className="mb-5 flex items-center gap-4">
                      <div
                        style={{ backgroundImage: avatarGradients[i % avatarGradients.length] }}
                        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                      >
                        {t.photoUrl ? (
                          <img
                            src={t.photoUrl}
                            alt={t.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          t.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">
                          {t.name}
                        </p>
                        <p className="text-sm text-[#6B7280]">{t.position}</p>
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <Quote className="absolute -left-1 -top-1 h-6 w-6 text-brand-red/10" />
                      <p className="pl-5 leading-relaxed text-[#4B5563]">
                        {t.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-[#E5E7EB] bg-white p-2.5 shadow-sm transition-all duration-200 hover:border-brand-red/30 hover:bg-brand-red hover:text-white active:scale-[0.96] lg:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-[#E5E7EB] bg-white p-2.5 shadow-sm transition-all duration-200 hover:border-brand-red/30 hover:bg-brand-red hover:text-white active:scale-[0.96] lg:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "relative overflow-hidden rounded-full transition-all duration-300",
                i === selectedIndex
                  ? "h-2.5 w-8 bg-[#E5E7EB]"
                  : "h-2.5 w-2.5 bg-[#D4D4D4] hover:bg-[#A3A3A3]"
              )}
              aria-label={`Slide ${i + 1}`}
            >
              {i === selectedIndex && (
                <span
                  className="absolute inset-0 rounded-full bg-brand-red"
                  style={{ width: `${progress * 100}%` }}
                />
              )}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
