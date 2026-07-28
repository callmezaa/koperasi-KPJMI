import { motion } from "motion/react";
import { Container } from "../layout/Container";

import candyImg from "../../assets/papaya candy.png";
import chipImg from "../../assets/papaya chip.png";
import soapImg from "../../assets/papay soap.png";

const products = [
  { name: "Papaya Candy", description: "Permen pepaya organik dengan rasa alami buah pepaya pilihan dari kebun sendiri.", image: candyImg },
  { name: "Papaya Chips", description: "Opak dan churros pepaya renyah dari pepaya organik segar, camilan sehat tanpa pengawet.", image: chipImg },
  { name: "Papaya Soap", description: "Sabun pepaya organik kaya vitamin untuk perawatan kulit alami.", image: soapImg },
];

export function Products() {
  return (
    <section id="products" className="bg-white py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block text-[14px] font-medium uppercase tracking-[0.15em] text-brand-red">
            Produk Unggulan
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] tracking-tight text-[#111827]">
            Olahan Pepaya Organik
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[#6B7280]">
            Produk olahan pepaya organik berkualitas tinggi dari petani lokal Desa Kramat, Banyumas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group rounded-3xl border border-[#F3F4F6] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-3xl bg-[#F9FAFB]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-7">
                <span className="inline-block rounded-full bg-brand-red/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-red">
                  Produk Unggulan
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-[#111827]">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
