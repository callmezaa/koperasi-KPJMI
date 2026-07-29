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

function App() {
  return (
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
  );
}

export default App;