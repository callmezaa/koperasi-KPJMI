import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "./Container";
import { company } from "../../data/company";
import { contact } from "../../data/contact";
import logoSrc from "../../assets/logo_kpjmi.png";

const quickLinks = [
  { label: "Beranda", href: "#hero" },
  { label: "Tentang", href: "#about" },
  { label: "Unit Bisnis", href: "#business-units" },
  { label: "Produk", href: "#products" },
  { label: "Galeri", href: "#gallery" },
  { label: "Kontak", href: "#contact" },
];

const socials = [
  {
    name: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98" fill="currentColor" stroke="#1A1A1A" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A]">
      <div className="border-t-2 border-brand-red/20" />
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoSrc} alt="KPJMI" className="h-10 w-auto" />
              <span className="font-display text-xl font-bold text-white">
                {company.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF]">
              {company.description}
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wide text-white uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#9CA3AF] transition-all duration-200 hover:text-brand-red hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wide text-white uppercase">
              Kontak
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[#9CA3AF]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                <span className="leading-relaxed">{contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                <Phone className="h-4 w-4 shrink-0 text-brand-red" />
                {contact.phone}
              </li>
              <li className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                <Mail className="h-4 w-4 shrink-0 text-brand-red" />
                {contact.email}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wide text-white uppercase">
              Media Sosial
            </h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#333] text-[#9CA3AF] transition-all duration-200 hover:border-brand-red hover:bg-brand-red hover:text-white hover:-translate-y-0.5"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-[#222]">
        <Container className="py-6">
          <p className="text-center text-sm text-[#6B6B6B]">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
