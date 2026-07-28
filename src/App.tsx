import { Navbar } from "./components/layout/Navbar";
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
      <Navbar />
      <Hero />
      <About />
      <VisionMission />
      <BusinessUnits />
      <Products />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;