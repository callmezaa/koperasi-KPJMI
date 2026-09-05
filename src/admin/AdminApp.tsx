import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAdminAuth } from "./auth";
import { isSupabaseConfigured } from "../lib/supabase";
import AdminLayout from "./layout/AdminLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import GalleryPage from "./pages/GalleryPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import { SetupNotice, Spinner } from "./components/ui";

function RequireConfig({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] p-6">
        <SetupNotice message="Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env (lihat .env.example), jalankan supabase/schema.sql di SQL Editor Supabase, lalu restart dev server." />
      </div>
    );
  }
  return <>{children}</>;
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdminAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
        <Spinner />
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <Toaster position="top-center" richColors closeButton />
      <Routes>
        <Route
          path="login"
          element={
            <RequireConfig>
              <LoginPage />
            </RequireConfig>
          }
        />
        <Route
          element={
            <RequireConfig>
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            </RequireConfig>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="produk" element={<ProductsPage />} />
          <Route path="galeri" element={<GalleryPage />} />
          <Route path="testimoni" element={<TestimonialsPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="kontak" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
