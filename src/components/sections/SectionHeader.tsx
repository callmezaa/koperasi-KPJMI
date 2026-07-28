import { motion } from "motion/react";
import { cn } from "../../utils/cn";

interface Props {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("mb-12", centered && "text-center")}
    >
      <div className={cn("mb-4 h-1 w-12 rounded-full bg-brand-red", centered && "mx-auto")} />
      <h2 className="font-display text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 text-lg text-[#6B6B6B]">{subtitle}</p>}
    </motion.div>
  );
}
