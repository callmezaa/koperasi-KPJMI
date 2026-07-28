export interface NavItem { label: string; href: string; id: string; }
export interface StatItem { value: number; suffix: string; label: string; }
export interface ValueItem { icon: string; title: string; description: string; }
export interface BusinessUnit { title: string; description: string; image: string; }
export interface Product { name: string; description: string; category: string; image: string; }
export interface TimelineEvent { year: number; title: string; description: string; }
export interface GalleryImage { src: string; alt: string; category: string; }
export interface Certification { name: string; logo: string; }
export interface Partner { name: string; logo: string; }
export interface Testimonial { name: string; position: string; comment: string; avatar: string; }
export interface FAQItem { question: string; answer: string; }
export interface ContactInfo { address: string; phone: string; email: string; hours: string; }