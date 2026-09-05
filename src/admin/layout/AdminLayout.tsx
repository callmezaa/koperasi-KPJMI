import { useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import {
  CircleHelp,
  ExternalLink,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Package,
  Phone,
  X,
} from "lucide-react";
import { useAdminAuth } from "../auth";
import logoSrc from "../../assets/logo_kpjmi.png";
import { cn } from "../../utils/cn";

const navItems = [
  { to: "/admin", end: true, label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/produk", label: "Produk", icon: Package },
  { to: "/admin/galeri", label: "Galeri", icon: Images },
  { to: "/admin/testimoni", label: "Testimoni", icon: MessageSquareQuote },
  { to: "/admin/faq", label: "FAQ", icon: CircleHelp },
  { to: "/admin/kontak", label: "Info Kontak", icon: Phone },
];

export default function AdminLayout() {
  const { user, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login", { replace: true });
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-[#141414]">
      <div className="flex items-center gap-3 px-6 py-5">
        <img src={logoSrc} alt="KPJMI" className="h-9 w-auto" />
        <div>
          <p className="font-display text-base font-bold leading-tight text-white">KPJMI</p>
          <p className="text-[11px] uppercase tracking-wider text-[#9CA3AF]">Panel Admin</p>
        </div>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-3">
        {navItems.map(({ to, end, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-red text-white shadow-sm shadow-brand-red/30"
                  : "text-[#9CA3AF] hover:bg-white/5 hover:text-white",
              )
            }
          >
            <Icon className="h-4.5 w-4.5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-[#9CA3AF] transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          Lihat Website
        </Link>
        <div className="mt-2 flex items-center gap-2.5 rounded-xl px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">
            {(user?.email ?? "?").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-white">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            aria-label="Keluar"
            title="Keluar"
            className="rounded-lg p-1.5 text-[#9CA3AF] transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">{sidebar}</aside>

      {/* Topbar + drawer mobile */}
      <div className="sticky top-0 z-40 flex items-center gap-3 bg-[#141414] px-4 py-3 lg:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Buka menu"
          className="rounded-lg p-2 text-[#9CA3AF] hover:bg-white/5 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>
        <img src={logoSrc} alt="KPJMI" className="h-7 w-auto" />
        <span className="font-display text-sm font-bold text-white">Panel Admin</span>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-y-0 left-0 w-64" onClick={(e) => e.stopPropagation()}>
            {sidebar}
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Tutup menu"
              className="absolute -right-10 top-3 rounded-lg p-2 text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
