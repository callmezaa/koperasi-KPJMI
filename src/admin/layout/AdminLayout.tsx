import { useEffect, useState } from "react";
import { NavLink, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Phone,
  X,
} from "lucide-react";
import { useAdminAuth } from "../auth";
import logoSrc from "../../assets/logo_kpjmi.png";
import logoSrcWebp from "../../assets/logo_kpjmi.webp";
import { cn } from "../../utils/cn";

const navItems = [
  { to: "/admin", end: true, label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/produk", label: "Produk", icon: Package },
  { to: "/admin/galeri", label: "Galeri", icon: Images },
  { to: "/admin/testimoni", label: "Testimoni", icon: MessageSquareQuote },
  { to: "/admin/faq", label: "FAQ", icon: CircleHelp },
  { to: "/admin/kontak", label: "Info Kontak", icon: Phone },
];

const COLLAPSE_KEY = "kpjmi:admin-sidebar-collapsed";

function Logo({ className }: { className?: string }) {
  return (
    <picture>
      <source srcSet={logoSrcWebp} type="image/webp" />
      <img src={logoSrc} alt="Logo KPJMI" className={className} />
    </picture>
  );
}

function SidebarContent({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden border-r border-black/[0.06] bg-[#FAFAFA]">
      {/* brand */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-black/[0.06]",
          collapsed ? "justify-center" : "px-4",
        )}
      >
        {collapsed ? (
          <Logo className="h-8 w-auto" />
        ) : (
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-auto" />
            <div className="min-w-0">
              <p className="font-display text-sm font-bold leading-tight tracking-tight text-[#262626]">
                KPJMI
              </p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#A3A3A3]">
                Panel Admin
              </p>
            </div>
          </div>
        )}
      </div>

      {/* navigasi */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto overflow-x-hidden p-2">
        {navItems.map(({ to, end, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            aria-label={label}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
                collapsed ? "h-10 justify-center px-0" : "px-2.5 py-2",
                isActive
                  ? "bg-white text-[#262626] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06]"
                  : "text-[#686868] hover:bg-black/[0.04] hover:text-[#262626]",
              )
            }
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            <span
              className={cn(
                "overflow-hidden whitespace-nowrap transition-all duration-150",
                collapsed ? "max-w-0 opacity-0" : "max-w-[140px] opacity-100",
              )}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* footer */}
      <div className="border-t border-black/[0.06] p-2">
        <Link
          to="/"
          title={collapsed ? "Lihat Website" : undefined}
          className={cn(
            "flex items-center gap-2.5 rounded-lg text-sm font-medium text-[#686868] transition-colors duration-150 hover:bg-black/[0.04] hover:text-[#262626]",
            collapsed ? "h-10 justify-center px-0" : "px-2.5 py-2",
          )}
        >
          <ExternalLink className="h-[18px] w-[18px] shrink-0" />
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap transition-all duration-150",
              collapsed ? "max-w-0 opacity-0" : "max-w-[140px] opacity-100",
            )}
          >
            Lihat Website
          </span>
        </Link>
      </div>
    </div>
  );
}

function UserMenu() {
  const { user, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menu akun"
        className="flex items-center gap-1 rounded-full p-0.5 transition-colors duration-150 hover:bg-black/[0.04]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#262626] text-xs font-semibold text-white">
          {(user?.email ?? "?").charAt(0).toUpperCase()}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-[#A3A3A3] transition-transform duration-150",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 rounded-xl border border-black/[0.06] bg-white p-1 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.16)]"
          >
            <div className="px-3 py-2">
              <p className="text-[11px] uppercase tracking-wider text-[#A3A3A3]">
                Masuk sebagai
              </p>
              <p className="mt-0.5 truncate text-sm font-medium text-[#262626]">
                {user?.email}
              </p>
            </div>
            <button
              role="menuitem"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#262626] transition-colors duration-150 hover:bg-black/[0.04]"
            >
              <LogOut className="h-4 w-4 text-[#686868]" />
              Keluar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminLayout() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(COLLAPSE_KEY) === "1",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const current = navItems.find((i) =>
    i.end ? pathname === "/admin" : pathname.startsWith(i.to),
  );

  function toggleCollapse() {
    setCollapsed((v) => {
      localStorage.setItem(COLLAPSE_KEY, v ? "0" : "1");
      return !v;
    });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* sidebar desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden transition-[width] duration-200 ease-out lg:block",
          collapsed ? "w-[68px]" : "w-60",
        )}
      >
        <SidebarContent collapsed={collapsed} />
      </aside>

      {/* navbar atas */}
      <div
        className={cn(
          "transition-[padding] duration-200 ease-out",
          collapsed ? "lg:pl-[68px]" : "lg:pl-60",
        )}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center gap-1.5 border-b border-black/[0.06] bg-white/80 px-3 backdrop-blur-xl sm:px-5 lg:px-6">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Buka menu"
            className="rounded-lg p-2 text-[#686868] transition-colors duration-150 hover:bg-black/[0.04] hover:text-[#262626] lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            onClick={toggleCollapse}
            aria-label={collapsed ? "Perlebar sidebar" : "Persempit sidebar"}
            className="hidden rounded-lg p-2 text-[#686868] transition-colors duration-150 hover:bg-black/[0.04] hover:text-[#262626] lg:block"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>

          <Logo className="h-7 w-auto lg:hidden" />

          <nav
            aria-label="Lokasi halaman"
            className="hidden items-center gap-1.5 lg:flex"
          >
            <span className="text-sm text-[#A3A3A3]">Admin</span>
            <ChevronRight className="h-3.5 w-3.5 text-[#D4D4D4]" />
            <span className="text-sm font-medium text-[#262626]">
              {current?.label ?? "Dashboard"}
            </span>
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Link
              to="/"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#686868] transition-colors duration-150 hover:bg-black/[0.04] hover:text-[#262626] sm:flex"
            >
              <ExternalLink className="h-4 w-4" />
              Lihat Website
            </Link>
            <UserMenu />
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      {/* drawer mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="absolute inset-y-0 left-0 w-60"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent onNavigate={() => setMenuOpen(false)} />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Tutup menu"
              className="absolute -right-10 top-3 rounded-lg p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
