import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import footerBg from "@/assets/footer.png"; // ✅ your image

import { sanity } from "../../sanity/client";

const resolveHref = (link) => {
  if (!link?.type) return null;
  if (link.type === "internal") return link.internalPath || null;
  if (link.type === "external") return link.externalUrl || null;
  return null;
};

const FooterLine = ({ item }) => {
  const href = resolveHref(item?.link);

  // no link -> plain text
  if (!href) return <div className="footerLine">{item?.line}</div>;

  // internal
  if (item.link.type === "internal") {
    return (
      <div className="footerLine">
        <a className="footerLink" href={href}>
          {item?.line}
        </a>
      </div>
    );
  }

  // external
  return (
    <div className="footerLine">
      <a className="footerLink" href={href} target="_blank" rel="noreferrer">
        {item?.line}
      </a>
    </div>
  );
};

export default function Footer() {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    const query = `*[_type == "homePage"][0]{
      footer{
        footerTitle,
        topLines[]{line, link{type, internalPath, externalUrl}},
        bottomLines[]{line, link{type, internalPath, externalUrl}}
      }
    }`;

    sanity
      .fetch(query)
      .then((res) => setFooter(res?.footer || null))
      .catch(console.error);
  }, []);

  const title = footer?.footerTitle || "Le Spa";
  const topLines = footer?.topLines || [];
  const bottomLines = footer?.bottomLines || [];

  return (
    <footer className="footerWrap">
      <div className="footerBg" aria-hidden="true">
        <img src={footerBg} alt="" />
      </div>

      <div className="footerContent">
        <h2 className="footerTitle">{title}</h2>

        <div className="footerTop">
          {topLines.map((item, i) => (
            <FooterLine key={`${item?.line}-${i}`} item={item} />
          ))}
        </div>

        <div className="footerDivider" />

        <div className="footerBottom">
          {bottomLines.map((item, i) => (
            <FooterLine key={`${item?.line}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </footer>
  );
}
