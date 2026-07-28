import { motion } from "motion/react";
import { Container } from "../layout/Container";
import { MessageCircle } from "lucide-react";
import heroBg from "../../assets/hero_section.png";
import { contact } from "../../data/contact";

const headlineLines = [
  { text: "Koperasi Petani", highlight: false },
  { text: "Jaya Makmur", highlight: true },
  { text: "Indonesia", highlight: false },
];

const heroDescription =
  "Kami memproduksi produk pepaya organik. Beberapa produknya antara lain Opak Pepaya, Permen Pepaya, Churros Pepaya, dan Sabun Pepaya. Proses budidaya dilakukan oleh petani lokal dengan konsep pertanian organik dengan mengandalkan input produksi berkelanjutan, serta dalam pengolahan produknya. Kami berada di Desa Kramat, Kembaran, Kab. Banyumas.";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20"
    >
      <div
        style={{ backgroundImage: `url(${heroBg})` }}
        className="absolute inset-0 bg-cover bg-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-b from-transparent to-white" />

      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-20">
        <div className="max-w-2xl">
          <motion.h1
            initial="hidden"
            animate="visible"
            className="font-display text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                {line.highlight ? (
                  <span className="text-brand-red">{line.text}</span>
                ) : (
                  line.text
                )}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#about"
              className="inline-flex items-center rounded-xl bg-white px-8 py-4 font-medium text-brand-red shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-xl active:scale-[0.96]"
            >
              Jelajahi Profil
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-xl border-2 border-white/40 px-8 py-4 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#1A1A1A] active:scale-[0.96]"
            >
              Hubungi Kami
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-6 py-4 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#1A1A1A] active:scale-[0.96]"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
