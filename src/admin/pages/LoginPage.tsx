import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LogIn } from "lucide-react";
import { useAdminAuth } from "../auth";
import logoSrc from "../../assets/logo_kpjmi.png";

export default function LoginPage() {
  const { signIn } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          ? "Email atau password salah."
          : err instanceof Error
            ? err.message
            : "Terjadi kesalahan. Coba lagi.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <img src={logoSrc} alt="KPJMI" className="h-14 w-auto" />
          <h1 className="mt-4 font-display text-xl font-bold tracking-tight text-[#111827]">
            Panel Admin KPJMI
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Masuk untuk mengelola konten website
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-[#F3F4F6] bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.04)]"
        >
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#111827]">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kpjmi.id"
              className="w-full rounded-xl border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-brand-red/50 focus:outline-none focus:ring-2 focus:ring-brand-red/15"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#111827]">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-brand-red/50 focus:outline-none focus:ring-2 focus:ring-brand-red/15"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-brand-red/20 transition-all hover:bg-[#9c0e03] active:scale-[0.98] disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            Masuk
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#9CA3AF]">
          <Link to="/" className="transition-colors hover:text-brand-red">
            ← Kembali ke website
          </Link>
        </p>
      </div>
    </div>
  );
}
