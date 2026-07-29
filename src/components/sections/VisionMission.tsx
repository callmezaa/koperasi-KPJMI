import { motion } from "motion/react";
import { Container } from "../layout/Container";
import {
  company,
  visionMissions,
  commitmentStats,
} from "../../data/company";
import {
  Sprout,
  TrendingUp,
  Handshake,
  Leaf,
  Quote,
  ShieldCheck,
} from "lucide-react";
import bgImg from "../../assets/bg1.png";
import bgImgWebp from "../../assets/bg1.webp";

const missionIcons = {
  sprout: Sprout,
  trending: TrendingUp,
  handshake: Handshake,
  leaf: Leaf,
} as const;

export function VisionMission() {
  return (
    <section
      id="vision-mission"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      {/* ── Subtle top-left decorative leaf stroke ── */}
      <div className="pointer-events-none absolute -left-16 -top-10 z-0 opacity-[0.07]">
        <svg
          width="340"
          height="500"
          viewBox="0 0 340 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 260C100 170 220 130 300 180C220 250 160 340 175 440C115 395 60 335 40 260Z"
            stroke="#C1121F"
            strokeWidth="1.2"
          />
          <path
            d="M100 210C150 245 185 300 200 370"
            stroke="#C1121F"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* ── Top-right decorative curve ── */}
      <div className="pointer-events-none absolute -right-8 top-32 z-0 opacity-[0.08]">
        <svg width="200" height="300" viewBox="0 0 200 300" fill="none">
          <path
            d="M200 0C200 165.685 65.685 300 -100 300"
            stroke="#C1121F"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* ═══════════════════════════════════════════
            HEADER: Editorial Title
        ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Label badge */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#C1121F]/40" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#C1121F]">
              Vision & Mission
            </span>
            <span className="h-[2px] w-8 rounded-full bg-[#C1121F]/40" />
          </div>

          {/* Large editorial heading */}
          <h2 className="font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
            Building Sustainable
            <br />
            Agriculture for{" "}
            <span className="text-[#C1121F]">Indonesia.</span>
          </h2>

          {/* Supporting paragraph */}
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-[#6B7280] sm:text-base">
            Kami hadir untuk memberdayakan petani, meningkatkan nilai pertanian,
            dan menciptakan masa depan yang lebih sejahtera bagi bangsa.
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════
            VISION CARD – Centered glass quote
        ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-14 max-w-2xl"
        >
          {/* Soft gradient background glow */}
          <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-to-br from-[#C1121F]/[0.04] via-transparent to-[#C1121F]/[0.02] blur-xl" />

            <div className="relative rounded-[28px] border border-[#E5E7EB]/70 bg-white/80 px-8 py-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-sm sm:px-12 sm:py-12">
            {/* Quote mark */}
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#FDF0F0]">
              <Quote className="h-5 w-5 text-[#C1121F]" />
            </div>

            {/* "OUR VISION" sub-label */}
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C1121F]">
              Our Vision
            </span>

            {/* Vision text */}
            <p className="mx-auto mt-4 max-w-lg font-display text-lg font-bold leading-relaxed tracking-tight text-[#111827] sm:text-xl lg:text-[1.35rem]">
              Menjadi koperasi pertanian terdepan yang membangun ekosistem
              pertanian berkelanjutan dan menyejahterakan petani Indonesia.
            </p>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════
            MISSION SECTION
        ═══════════════════════════════════════════ */}
        <div className="mt-16 sm:mt-20">
          {/* Section label + heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C1121F]">
              Our Mission
            </span>
            <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl">
              Langkah Nyata Kami
            </h3>
          </motion.div>

          {/* ── Zigzag / staggered mission cards with timeline ── */}
          <div className="relative mx-auto mt-12 max-w-3xl">
            {/* Vertical timeline connector line (desktop only) */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#C1121F]/20 via-[#C1121F]/10 to-transparent lg:block" />

            <div className="flex flex-col gap-8 lg:gap-10">
              {visionMissions.map((mission, idx) => {
                const Icon =
                  missionIcons[
                    mission.icon as keyof typeof missionIcons
                  ];
                const isEven = idx % 2 === 0;

                return (
                  <motion.div
                    key={mission.number}
                    initial={{
                      opacity: 0,
                      x: isEven ? -40 : 40,
                      rotate: isEven ? -1.5 : 1.5,
                    }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      delay: idx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`relative flex items-start gap-4 lg:w-[48%] ${
                      isEven
                        ? "lg:mr-auto lg:pr-8"
                        : "lg:ml-auto lg:pl-8"
                    }`}
                  >
                    {/* Timeline dot on center line (desktop) */}
                    <div
                      className={`absolute top-4 hidden h-3 w-3 rounded-full border-2 border-[#C1121F] bg-white lg:block ${
                        isEven
                          ? "right-0 translate-x-[calc(100%+22px)]"
                          : "left-0 -translate-x-[calc(100%+22px)]"
                      }`}
                    />

                    {/* Card */}
                    <div className="group w-full rounded-[22px] border border-[#E5E7EB]/70 bg-white p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_2px_16px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_30px_rgba(0,0,0,0.07)]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          {/* Number badge */}
                          <span className="text-xs font-extrabold text-[#C1121F]">
                            {mission.number}
                          </span>

                          {/* Title */}
                          <h4 className="mt-1 text-base font-bold text-[#111827] sm:text-lg">
                            {mission.title}
                          </h4>

                          {/* Description */}
                          <p className="mt-2 text-xs leading-relaxed text-[#6B7280] sm:text-sm">
                            {mission.desc}
                          </p>
                        </div>

                        {/* Icon circle */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FDF0F0] text-[#C1121F] transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-5 w-5 stroke-[2]" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            BOTTOM BANNER – Komitmen Kami + Stats on Image
        ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-[32px] shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
        >
          <picture className="absolute inset-0 h-full w-full">
            <source srcSet={bgImgWebp} type="image/webp" />
            <img
              src={bgImg}
              alt="Lahan pertanian Indonesia"
              className="h-full w-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/50" />

          <div className="relative z-10 flex flex-col items-stretch gap-6 px-6 py-10 sm:flex-row sm:items-center sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="flex items-start gap-4 sm:max-w-[320px]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-white">
                  Komitmen Kami
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  Kami berkomitmen untuk terus berinovasi, bekerja sepenuh hati,
                  dan tumbuh bersama petani demi pertanian Indonesia yang lebih
                  maju, mandiri, dan berkelanjutan.
                </p>
              </div>
            </div>

            <div className="hidden h-14 w-px bg-white/20 sm:block" />

            <div className="grid flex-1 grid-cols-3 gap-4">
              {commitmentStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/10 px-3 py-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/20 sm:px-4 sm:py-5"
                >
                  <div className="font-display text-xl font-extrabold text-white sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium text-white/60 sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>

      {/* ── Decorative bottom-right leaf accent ── */}
      <div className="pointer-events-none absolute -bottom-12 -right-12 z-0 opacity-[0.06] hidden sm:block">
        <svg width="320" height="400" viewBox="0 0 320 400" fill="none">
          <path
            d="M280 50C200 120 160 220 180 350C220 280 290 200 310 100C300 80 290 60 280 50Z"
            fill="#22C55E"
          />
          <path
            d="M280 50C200 120 160 220 180 350"
            stroke="#166534"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
}
