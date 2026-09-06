import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { useAdminAuth } from "../auth";
import logoSrc from "../../assets/logo_kpjmi.png";
import logoSrcWebp from "../../assets/logo_kpjmi.webp";

/* Komposisi geometris: kontur terasering, cakram matahari, dan lengkung daun —
   bahasa visual yang sama dengan SectionDivider di website publik. */
function Illustration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 520 640"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      {/* matahari */}
      <circle cx="356" cy="128" r="46" fill="#FFFACD" opacity="0.92" />
      <circle cx="356" cy="128" r="66" fill="none" stroke="#FFFACD" strokeWidth="1.5" opacity="0.28" />
      <circle cx="356" cy="128" r="90" fill="none" stroke="#FFFACD" strokeWidth="1" opacity="0.12" />

      {/* daun — geometri lengkung bersih, bukan gambar */}
      <g transform="translate(96 176) rotate(-28)">
        <path d="M0 0 Q34 -44 96 -46 Q92 16 0 0 Z" fill="#FFFACD" opacity="0.2" />
        <path d="M0 0 Q46 -22 92 -42" fill="none" stroke="#FFFACD" strokeWidth="1.5" opacity="0.5" />
      </g>
      <g transform="translate(392 302) rotate(24) scale(0.55)">
        <path d="M0 0 Q34 -44 96 -46 Q92 16 0 0 Z" fill="none" stroke="#FFFACD" strokeWidth="2" opacity="0.4" />
      </g>

      {/* kontur terasering */}
      <path d="M-20 400 C 120 336 300 348 540 420 L 540 660 L -20 660 Z" fill="#FFFACD" opacity="0.1" />
      <path d="M-20 464 C 140 404 320 412 540 488 L 540 660 L -20 660 Z" fill="#FFFACD" opacity="0.14" />
      <path d="M-20 528 C 160 472 340 476 540 552 L 540 660 L -20 660 Z" fill="#FFFACD" opacity="0.18" />
      <path d="M-20 588 C 180 540 360 540 540 612 L 540 660 L -20 660 Z" fill="#FFFACD" opacity="0.24" />

      {/* titik benih */}
      <circle cx="120" cy="300" r="3" fill="#FFFACD" opacity="0.4" />
      <circle cx="300" cy="232" r="2.5" fill="#FFFACD" opacity="0.3" />
      <circle cx="442" cy="212" r="2" fill="#FFFACD" opacity="0.35" />
      <circle cx="210" cy="118" r="2" fill="#FFFACD" opacity="0.25" />
    </svg>
  );
}

function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <picture>
        <source srcSet={logoSrcWebp} type="image/webp" />
        <img src={logoSrc} alt="Logo KPJMI" className="h-10 w-auto" />
      </picture>
      <div>
        <p
          className={`font-display text-lg font-bold leading-tight ${
            dark ? "text-[#111827]" : "text-white"
          }`}
        >
          KPJMI
        </p>
        <p
          className={`text-[11px] uppercase tracking-[0.18em] ${
            dark ? "text-[#9CA3AF]" : "text-brand-lemon/85"
          }`}
        >
          Panel Admin
        </p>
      </div>
    </div>
  );
}

const inputClass =
  "block h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-[border-color,box-shadow] duration-200 focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/10";

export default function LoginPage() {
  const { signIn } = useAdminAuth();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error && err.message.includes("Invalid login")
          ? "Email atau password salah. Coba periksa kembali."
          : err instanceof Error
            ? err.message
            : "Terjadi kesalahan. Coba lagi.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F5EF] p-4 sm:p-6">
      {/* latar halaman — gema kontur yang sama, jauh lebih samar */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <circle cx="1250" cy="120" r="90" fill="none" stroke="#B81104" strokeWidth="1" opacity="0.08" />
        <path d="M-40 780 C 320 700 760 720 1480 820 L 1480 940 L -40 940 Z" fill="none" stroke="#B81104" strokeWidth="1" opacity="0.07" />
        <path d="M-40 830 C 380 760 820 776 1480 866 L 1480 940 L -40 940 Z" fill="#B81104" opacity="0.03" />
      </svg>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative grid w-full max-w-md overflow-hidden rounded-[1.75rem] bg-white shadow-[0_32px_80px_-24px_rgba(24,16,12,0.28),0_4px_16px_rgba(24,16,12,0.06)] lg:max-w-5xl lg:grid-cols-[1.05fr_1fr]"
      >
        {/* kiri — panel brand */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-brand-red p-10 lg:flex xl:p-12">
          <Illustration />
          <div className="relative z-10">
            <BrandMark />
          </div>
          <div className="relative z-10 max-w-[30ch]">
            <p className="font-display text-[1.35rem] font-bold leading-snug tracking-tight text-white">
              Bersama Petani, Kita Membangun Negeri.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-lemon/85">
              Koperasi Petani Jaya Makmur Indonesia — Desa Kramat, Banyumas.
            </p>
          </div>
        </aside>

        {/* kanan — form */}
        <div className="flex flex-col justify-center bg-white p-8 sm:p-12 lg:p-14">
          <div className="mb-8 lg:hidden">
            <BrandMark dark />
          </div>

          <h1 className="font-display text-2xl font-bold tracking-tight text-[#111827] sm:text-[1.75rem]">
            Selamat Datang Kembali
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Masuk untuk mengelola konten website KPJMI.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-[#111827]">Email</span>
              <input
                type="email"
                required
                autoFocus
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kpjmi.id"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-[#111827]">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#9CA3AF] transition-colors hover:text-[#111827]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="btn-ripple flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-red text-sm font-medium text-white shadow-[0_1px_2px_rgba(184,17,4,0.24),0_6px_16px_-4px_rgba(184,17,4,0.4)] transition-all duration-200 hover:bg-[#9E0E03] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              Masuk
            </button>
          </form>

          <p className="mt-8 border-t border-[#F3F4F6] pt-6 text-center lg:text-left">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] transition-colors hover:text-brand-red"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali ke website
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
