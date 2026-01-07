import "./Hero.css";
import videoSrc from "@/assets/waterloop.mp4";
import { useEffect, useState } from "react";
import { sanity } from "@/sanity/client";
import { homePageQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const Hero = () => {
  const [hero, setHero] = useState<{
    logo?: any;
    quoteLine1?: string;
    quoteLine2?: string;
  } | null>(null);

  useEffect(() => {
    sanity.fetch(homePageQuery).then((data) => {
      setHero(data.hero);
    });
  }, []);

  const handleClick = () => {
    const heroEnd = document.getElementById("hero-end");
    if (heroEnd) {
      heroEnd.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className="hero"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label="Scroll to end of hero section"
    >
      <video
        className="hero-video"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="hero-overlay">
        {hero?.logo && (
          <img
            src={urlFor(hero.logo).url()}
            alt="Le Spa"
            className="hero-logo"
          />
        )}

        {(hero?.quoteLine1 || hero?.quoteLine2) && (
          <p className="hero-quote">
            {hero?.quoteLine1}
            {hero?.quoteLine2 && (
              <>
                <br />
                {hero.quoteLine2}
              </>
            )}
          </p>
        )}

        <div className="hero-arrow" aria-hidden="true">
          ↓
        </div>
      </div>

      {/* ✅ target: end of the GIF/video section */}
      <div id="hero-end" aria-hidden="true" />
    </header>
  );
};

export default Hero;
