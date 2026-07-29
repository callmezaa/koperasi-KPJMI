import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Map, MessageCircle } from "lucide-react";
import { Container } from "../layout/Container";
import { contact } from "../../data/contact";

const contactDetails = [
  { icon: MapPin, label: "Alamat", value: contact.address },
  { icon: Phone, label: "Telepon", value: contact.phone },
  { icon: Mail, label: "Email", value: contact.email },
  { icon: Clock, label: "Jam Operasional", value: contact.hours },
];

export function Contact() {
  return (
    <section id="contact" className="bg-[#FAFAFA] py-24 sm:py-32">
      <Container>
        <div className="mb-16 text-center">
          <span className="mb-4 block text-[14px] font-medium uppercase tracking-[0.15em] text-brand-red">
            Kontak
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] tracking-tight text-[#111827]">
            Hubungi Kami
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[#6B7280]">
            Punya pertanyaan? Tim kami siap membantu Anda.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="space-y-6"
          >
            {contactDetails.map((item) => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                  <item.icon className="h-5 w-5 text-brand-red" />
                </div>
                <div className="pt-0.5">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#9CA3AF]">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[#111827]">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="overflow-hidden rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.04)]">
              <iframe
                src={contact.mapsEmbed}
                width="100%"
                height="320"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Lokasi KPJMI"
                className="w-full"
              />
            </div>

            <div className="flex gap-4">
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ripple flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-sm font-medium text-[#111827] shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-red/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] active:scale-[0.97]"
              >
                <Map className="h-4 w-4 text-brand-red" />
                Google Maps
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ripple flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-brand-red px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-brand-red/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-red/30 active:scale-[0.97]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
