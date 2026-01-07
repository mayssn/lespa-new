import { useEffect, useState } from "react";
import { sanity } from "@/sanity/client";
import { homePageQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import PortableTextRenderer from "./PortableTextRenderer";
import "./About.css";

interface AboutPhoto {
  image: any;
  alt?: string;
}

interface AboutData {
  titleLine1: string;
  titleLine2: string;
  text: any;
  miniLabel: string;
  photos: AboutPhoto[];
}

const About = () => {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    sanity.fetch(homePageQuery).then((data) => {
      setAbout(data.about);
    });
  }, []);

  useEffect(() => {
    if (!about?.photos?.length) return;
    const interval = setInterval(() => {
      setPhotoIdx((idx) => (idx + 1) % about.photos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [about]);

  if (!about) return null;

  return (
    <section className="about" id="about-section">
      <div className="about-content">
        <div className="about-text-container">
          <div className="about-text">
            <h1>{about.titleLine1}</h1>
            <h1 style={{ fontStyle: "italic", color: "#6EA3AF" }}>
              {about.titleLine2}
            </h1>
            <div className="about-description">
              {about.text && Array.isArray(about.text) ? (
                <PortableTextRenderer value={about.text} />
              ) : typeof about.text === "string" ? (
                <p>{about.text}</p>
              ) : null}
            </div>
            <div className="about-mini-label">{about.miniLabel}</div>
          </div>
        </div>
        <div className="about-photo-container">
          {about.photos?.length > 0 && (
            <div className="about-carousel">
              <img
                src={urlFor(about.photos[photoIdx].image).url()}
                alt={about.photos[photoIdx].alt || "About photo"}
                className="about-photo"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
