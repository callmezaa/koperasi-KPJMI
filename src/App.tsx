import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ContentProvider } from "./content/provider";
import { Navbar } from "./components/layout/Navbar";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { BackToTop } from "./components/layout/BackToTop";
import { SectionDivider } from "./components/layout/SectionDivider";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { VisionMission } from "./components/sections/VisionMission";
import { BusinessUnits } from "./components/sections/BusinessUnits";
import { Products } from "./components/sections/Products";
import { Gallery } from "./components/sections/Gallery";
import { Testimonials } from "./components/sections/Testimonials";
import { FAQ } from "./components/sections/FAQ";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/layout/Footer";

const AdminApp = lazy(() => import("./admin/AdminApp"));

function PublicSite() {
  return (
    <ContentProvider>
      <main>
        <ScrollProgress />
        <Navbar />
        <BackToTop />
        <Hero />
        <About />
        <VisionMission />
        <BusinessUnits />
        <Products />
        <SectionDivider variant="curve" from="white" />
        <Gallery />
        <Testimonials />
        <SectionDivider variant="leaf" from="#FAFAFA" />
        <FAQ />
        <SectionDivider variant="curve" from="white" />
        <Contact />
        <SectionDivider variant="wave" from="#FAFAFA" />
        <Footer />
      </main>
    </ContentProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="*" element={<PublicSite />} />
        </Routes>
      </Suspense>
      <Analytics />
    </BrowserRouter>
  );
}
