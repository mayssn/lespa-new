import { useState, useEffect } from "react";

import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Branches from "../components/Branches";
import Footer from "../components/Footer";
import Waves from "../components/Waves/Waves";
import EtiquetteOverlay from "../components/EtiquetteOverlay";

export default function Home() {
  const [showEtiquette, setShowEtiquette] = useState(false);

  // 1. Maintain the scroll position in sessionStorage as the user scrolls
  useEffect(() => {
    // Set manual restoration to prevent browser from jumping around
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleScroll = () => {
      // Don't save if we are at 0 (might be a momentary reset during navigation)
      if (window.scrollY > 0) {
        sessionStorage.setItem("homeScrollPosition", String(window.scrollY));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Restore scroll position on mount with retries for late-loading content
  useEffect(() => {
    const savedY = sessionStorage.getItem("homeScrollPosition");
    if (savedY) {
      const targetY = parseInt(savedY, 10);
      let attempts = 0;

      const tryScroll = () => {
        attempts++;
        window.scrollTo(0, targetY);

        // If we haven't reached the target (likely because page isn't long enough yet),
        // keep trying for up to ~1.5 seconds (90 frames)
        if (Math.abs(window.scrollY - targetY) > 5 && attempts < 90) {
          requestAnimationFrame(tryScroll);
        }
      };

      // Start the attempt loop after a tiny delay to allow initial paint
      setTimeout(() => requestAnimationFrame(tryScroll), 50);
    }
  }, []);

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
