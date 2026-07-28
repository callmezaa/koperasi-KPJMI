import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Container } from "../layout/Container";
import { faqData } from "../../data/faq";

function AccordionItem({
  question,
  answer,
  isOpen,
  index,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  index: number;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#F3F4F6] last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-0 py-5 text-left sm:py-6"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F9FAFB] text-xs font-semibold text-[#9CA3AF] transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-medium text-[#111827] transition-colors duration-300">
          {question}
        </span>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen ? "bg-brand-red text-white" : "bg-[#F3F4F6] text-[#9CA3AF]"
          }`}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-12 pr-0 leading-relaxed text-[#6B7280] sm:pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="mb-16 text-center">
          <span className="mb-4 block text-[14px] font-medium uppercase tracking-[0.15em] text-brand-red">
            FAQ
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] tracking-tight text-[#111827]">
            Pertanyaan Umum
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[#6B7280]">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang KPJMI.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          {faqData.map((item, i) => (
            <AccordionItem
              key={i}
              index={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
