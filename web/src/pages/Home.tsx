import { useState } from "react";

import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Branches from "../components/Branches";
import Footer from "../components/Footer";
import Waves from "../components/Waves/Waves";
import EtiquetteOverlay from "../components/EtiquetteOverlay";

export default function Home() {
  const [showEtiquette, setShowEtiquette] = useState(false);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Waves />
      <Branches onOpenEtiquette={() => setShowEtiquette(true)} />
      {showEtiquette && (
        <EtiquetteOverlay onClose={() => setShowEtiquette(false)} />
      )}
      <Footer />
    </>
  );
}
