import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "motion/react";
import {
  Users,
  BarChart3,
  Leaf,
  CalendarDays,
  Handshake,
  MapPin,
  Quote,
  UserCheck,
} from "lucide-react";
import { Container } from "../layout/Container";
import { company, aboutFeatures, aboutStats, aboutStory } from "../../data/company";
import aboutImg from "../../assets/tentangkami_section.jpg";
import aboutImgWebp from "../../assets/tentangkami_section.webp";

function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  const num = parseInt(match[1].replace(/\./g, ""));
  return { num, suffix: match[2] };
}

function formatStat(num: number): string {
  return num.toLocaleString("id-ID");
}

function StatCounter({ value, duration = 1.8 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  const { num, suffix } = parseStatValue(value);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let frame: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * num));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, num, duration]);

  return <div ref={ref}>{formatStat(display)}{suffix}</div>;
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["-6%", "6%"]);
  const textY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "3%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FAF9F6] py-20 lg:py-28"
    >
      {/* Background Subtle Leaf Watermark */}
      <div className="pointer-events-none absolute left-0 top-1/4 z-0 opacity-15">
        <svg
          width="400"
          height="600"
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#C1121F]"
        >
          <path
            d="M50 300C120 200 250 150 350 200C250 280 180 380 200 500C130 450 70 380 50 300Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path d="M120 240C180 280 220 340 240 420" stroke="currentColor" strokeWidth="1" />
          <path d="M160 210C190 230 210 260 220 300" stroke="currentColor" strokeWidth="1" />
          <path d="M80 320C120 340 150 370 170 420" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading & Features */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-5 flex flex-col justify-center will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#C1121F]">
                  TENTANG KAMI
                </span>
                <span className="h-[2px] w-10 bg-[#C1121F]/50 rounded-full" />
              </div>

              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.18] tracking-tight text-[#111827]">
                Bersama Petani,
                <br />
                <span className="text-[#C1121F]">Kita Membangun Negeri.</span>
              </h2>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#4B5563] max-w-[50ch]">
                {company.description}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="mt-8 flex flex-col gap-6"
            >
              {aboutFeatures.map((item) => {
                const IconComponent =
                  item.icon === "users"
                    ? Users
                    : item.icon === "barchart"
                      ? BarChart3
                      : Leaf;

                return (
                  <motion.div
                    key={item.title}
                    variants={{
                      hidden: { opacity: 0, x: -20, scale: 0.95, rotate: -1 },
                      visible: { opacity: 1, x: 0, scale: 1, rotate: 0 },
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FDF0F0] text-[#C1121F] shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <IconComponent className="h-5 w-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#111827]">{item.title}</h3>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#6B7280] max-w-[42ch]">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image with Organic Curved Shape & Floating Quote Card */}
          <motion.div
            style={{ y: imageY }}
            className="lg:col-span-7 relative will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full overflow-hidden rounded-[32px] sm:rounded-[40px] shadow-2xl bg-white"
            >
              <svg className="absolute w-0 h-0" aria-hidden="true">
                <defs>
                  <clipPath id="organic-about-clip" clipPathUnits="objectBoundingBox">
                    <path d="M 0.28,0 C 0.42,0.18 0.26,0.48 0.08,0.58 C 0.01,0.64 0,0.72 0,0.8 L 0,0.95 C 0,0.98 0.02,1 0.05,1 L 0.95,1 C 0.98,1 1,0.98 1,0.95 L 1,0.05 C 1,0.02 0.98,0 0.95,0 Z" />
                  </clipPath>
                </defs>
              </svg>

              <div className="relative min-h-[380px] sm:min-h-[480px] lg:min-h-[520px] w-full">
                <picture className="absolute inset-0 h-full w-full">
                  <source srcSet={aboutImgWebp} type="image/webp" />
                  <img
                    src={aboutImg}
                    alt="Kegiatan Bimbingan Teknis Koperasi KPJMI bersama Petani"
                    className="h-full w-full object-cover object-center"
                    style={{ clipPath: "url(#organic-about-clip)" }}
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: -20, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 max-w-[240px] sm:max-w-[290px] rounded-[24px] bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/60 z-20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif text-3xl font-bold leading-none text-[#C1121F]">
                    &ldquo;
                  </span>
                  <Quote className="h-4 w-4 text-[#C1121F]/40" />
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#374151]">
                  {company.philosophy}
                </p>
                <div className="mt-3 text-[11px] font-bold tracking-wider text-[#C1121F]">
                  &mdash; KPJMI
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* BOTTOM SECTION: STATISTICS & STORY CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          <div className="lg:col-span-7 rounded-[28px] bg-white p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-[#E5E7EB]/80 flex flex-col justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              {aboutStats.map((stat, idx) => {
                const StatIcon =
                  stat.icon === "calendar"
                    ? CalendarDays
                    : stat.icon === "users"
                      ? Users
                      : stat.icon === "handshake"
                        ? Handshake
                        : MapPin;

                return (
                  <div
                    key={stat.label}
                    className={`flex flex-col items-center text-center ${
                      idx !== 0 ? "pt-4 sm:pt-0 sm:pl-4" : ""
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDF0F0] text-[#C1121F] mb-3">
                      <StatIcon className="h-5 w-5" />
                    </div>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#C1121F] tabular-nums">
                      <StatCounter value={stat.value} />
                    </div>
                    <div className="mt-1 text-xs sm:text-sm font-medium text-[#6B7280]">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-[28px] bg-white p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-[#E5E7EB]/80 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#C1121F]/20 bg-[#FDF0F0]/50 text-[#C1121F]">
              <UserCheck className="h-6 w-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#111827]">
                {aboutStory.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6B7280]">
                {aboutStory.desc}
              </p>
            </div>
          </div>
        </motion.div>
      </Container>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>
  );
}
