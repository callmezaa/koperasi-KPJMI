import { useScroll, motion } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand-red"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
