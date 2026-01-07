// src/components/Branches/Branches.tsx  (FULL updated file)
import { useEffect, useState } from "react";
import "./Branches.css";

import { sanity } from "../../sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = createImageUrlBuilder(sanity);
const urlFor = (src: any) =>
  src ? builder.image(src).width(240).height(180).fit("max").url() : "";

const onlyDigits = (s = "") => String(s).replace(/[^\d+]/g, "");
const toTelHref = (tel: string) => {
  const clean = onlyDigits(tel);
  return clean ? `tel:${clean}` : "#";
};
const toWaHref = (wa: string) => {
  const clean = String(wa || "").replace(/[^\d]/g, "");
  return clean ? `https://wa.me/${clean}` : "#";
};

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.6 10.8c1.6 3.2 3.9 5.5 7.1 7.1l2.4-2.4c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.4 22 2 13.6 2 3c0-.6.4-1 1-1h4.2c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16 3C9.4 3 4 8.2 4 14.7c0 2.6.9 5.1 2.6 7.1L5 29l7.5-1.9c1.1.3 2.3.5 3.5.5 6.6 0 12-5.2 12-11.7S22.6 3 16 3zm0 21.2c-1.1 0-2.2-.2-3.2-.6l-.7-.3-4.4 1.1 1.2-4.1-.4-.7c-1-1.7-1.5-3.6-1.5-5.5C7 9.7 11 5.8 16 5.8s9 3.9 9 8.7-4 8.7-9 8.7zm5-6.5c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.1-.8.9-1 1.1-.4.2-.7.1c-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.2 4.9 4.4.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" />
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
  </svg>
);


const Branches = () => {
  const [data, setData] = useState<{ branchesTitle: string; list: any[] }>({
    branchesTitle: "Our Branches",
    list: [],
  });
  const [openFindUs, setOpenFindUs] = useState<null | { title: string; findUs: any }>(null);

  useEffect(() => {
    const query = `*[_type == "homePage"][0]{
      branches{
        branchesTitle,
        list[]{
          title,
          image,
          addressLine1,
          addressLine2,
          telephone,
          callContact,
          whatsappContact,
          mapLink,
          findUs
        }
      }
    }`;

    sanity
      .fetch(query)
      .then((res) => {
        if (res?.branches) setData(res.branches);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="branchesWrap">
      <h2 className="branchesTitle">{data.branchesTitle || "Our Branches"}</h2>

      <div className="branchesList">
        {(data.list || []).map((b, idx) => {
          const callNumber = b.callContact?.trim() || b.telephone?.trim() || "";
          const waNumber = b.whatsappContact?.trim() || "";

          return (
            <article key={`${b.title}-${idx}`} className="branchCard">
              {/* 1) TOP ROW: name + image */}
              <div className="branchTopRow">
                <h3 className="branchName">{b.title}</h3>

                <div className="branchStamp">
                  {b.image ? (
                    <img className="branchImg" src={urlFor(b.image)} alt="" />
                  ) : (
                    <div className="branchImgPlaceholder" />
                  )}
                </div>
              </div>

              {/* 2) MIDDLE: address + tel full width */}
              <div className="branchMeta">
                {b.addressLine1 && (
                  <div className="branchLine">{b.addressLine1}</div>
                )}
                {b.addressLine2 && (
                  <div className="branchLine">{b.addressLine2}</div>
                )}
                {b.telephone && (
                  <div className="branchLine">Tel: {b.telephone}</div>
                )}
              </div>

              {/* 3) BOTTOM: actions full width */}
              <div className="branchActions">
                {callNumber && (
                  <a
                    className="branchBtn mobileOnly"
                    href={toTelHref(callNumber)}
                  >
                    <span className="btnIcon">
                      <PhoneIcon />
                    </span>
                    Call
                  </a>
                )}

                {waNumber && (
                  <a
                    className="branchBtn mobileOnly"
                    href={toWaHref(waNumber)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="btnIcon">
                      <WhatsAppIcon />
                    </span>
                    WhatsApp
                  </a>
                )}

                {b.mapLink ? (
                  <a
                    className="branchBtn"
                    href={b.mapLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="btnIcon">
                      <MapIcon />
                    </span>
                    Open in Maps
                  </a>
                ) : (
                  <button className="branchBtn" type="button" disabled>
                    <span className="btnIcon">
                      <MapIcon />
                    </span>
                    Open in Maps
                  </button>
                )}
  {/* ✅ NEW: Are you lost? button */}
                {b.findUs?.length ? (
                  <button
                    type="button"
                    className="lostBtn"
                    onClick={() => setOpenFindUs({ title: b.title, findUs: b.findUs })}
                  >
                    Are you lost?
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>


      {/* ✅ NEW: Overlay / Modal */}
      {openFindUs ? (
        <div
          className="findUsOverlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenFindUs(null)} // click outside closes
        >
          <div className="findUsModal" onClick={(e) => e.stopPropagation()}>
            <div className="findUsHeader">
              <div className="findUsTitle">{openFindUs.title}</div>
              <button className="findUsClose" onClick={() => setOpenFindUs(null)} aria-label="Close">
                ×
              </button>
            </div>
            <div className="findUsBody">
              <PortableText value={openFindUs.findUs} />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Branches;
