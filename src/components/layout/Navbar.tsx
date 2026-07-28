import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { navItems } from "../../data/navigation";
import logoSrc from "../../assets/logo_kpjmi.png";

const sectionIds = navItems.map((item) => item.id);

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75], rootMargin: "-80px 0px 0px 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2.5 shrink-0 active:scale-[0.96] transition-transform duration-150"
        >
          <img src={logoSrc} alt="KPJMI" className="h-9 w-auto" />
          <span className={cn("text-base font-bold transition-colors duration-300", scrolled ? "text-brand-red" : "text-white")}>KPJMI</span>
        </button>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "group relative px-3 py-2 text-sm font-medium",
                "transition-colors duration-200",
                "active:scale-[0.96] active:transition-transform active:duration-150",
                scrolled
                  ? activeSection === item.id
                    ? "text-brand-red"
                    : "text-[#4A4A4A] hover:text-brand-red"
                  : activeSection === item.id
                    ? "text-brand-red"
                    : "text-white/80 hover:text-white"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute bottom-0 left-3 right-3 h-[2px] bg-brand-red",
                  "origin-left transition-transform duration-300 ease-out",
                  activeSection === item.id
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-2 text-sm font-medium text-white shadow-lg shadow-brand-red/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-red/30 active:scale-[0.97]"
        >
          Gabung Sekarang
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "flex items-center justify-center p-2 md:hidden active:scale-[0.96] transition-transform duration-150",
            scrolled ? "text-[#4A4A4A]" : "text-white"
          )}
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
        >
          <motion.div
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[#E5E4E7] bg-white md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "block w-full rounded-md px-3 py-2.5 text-left text-sm font-medium",
                    "transition-colors duration-200",
                    "active:scale-[0.96] active:transition-transform active:duration-150",
                    activeSection === item.id
                      ? "text-brand-red bg-brand-red/5"
                      : "text-[#4A4A4A] hover:text-brand-red hover:bg-brand-red/5"
                  )}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollTo("contact")}
                className="mt-4 w-full rounded-full bg-brand-red px-5 py-3 text-sm font-medium text-white shadow-lg shadow-brand-red/20 transition-all duration-300 active:scale-[0.97]"
              >
                Gabung Sekarang
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
