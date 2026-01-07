import React, { useEffect } from "react";
import { PortableText } from "@portabletext/react";
import type { OverlayPage } from "./overlayTypes";
import FlowerDivider from "./FlowerDivider";
import "./OverlayModal.css";
const onlyDigits = (s = "") => String(s).replace(/[^\d+]/g, "");
const toTelHref = (tel?: string) => {
  const clean = onlyDigits(tel || "");
  return clean ? `tel:${clean}` : "#";
};
const toWaHref = (wa?: string) => {
  const clean = String(wa || "").replace(/[^\d]/g, "");
  return clean ? `https://wa.me/${clean}` : "#";
};

type Props = {
  open: boolean;
  onClose: () => void;
  data: OverlayPage | null;
};

const OverlayModal: React.FC<Props> = ({ open, onClose, data }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !data) return null;

  return (
    <div className="overlayBackdrop" onMouseDown={onClose}>
      <div className="overlayCard" onMouseDown={(e) => e.stopPropagation()}>
        <button
          className="overlayClose"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {data.sections.map((sec) => (
          <section key={sec._key} className="overlaySection">
            <h2 className="overlayTitle">{sec.title}</h2>

            {(sec.body?.length ?? 0) > 0 && (
              <div className="overlayBody">
                <PortableText value={sec.body} />
              </div>
            )}

            {!!(sec.bullets && sec.bullets.length) && (
              <ul className="overlayBullets">
                {sec.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}

            {sec.footerLine && (
              <p className="overlayFooterLine">{sec.footerLine}</p>
            )}

            {sec.showFlowerDivider !== false && <FlowerDivider />}
          </section>
        ))}

        {data.contact?.callPhone || data.contact?.whatsAppPhone ? (
          <div className="overlayContact">
            <p className="overlayContactLine">
              {data.contact?.label || "For more info, feel free to reach out"}{" "}
              {data.contact?.callPhone ? (
                <a
                  className="overlayLink"
                  href={toTelHref(data.contact.callPhone)}
                >
                  {data.contact.callPhone}
                </a>
              ) : null}
            </p>

            <div className="overlayContactBtns">
              {data.contact?.callPhone && (
                <a
                  className="overlayBtn"
                  href={toTelHref(data.contact.callPhone)}
                >
                  Call
                </a>
              )}
              {data.contact?.whatsAppPhone && (
                <a
                  className="overlayBtn"
                  href={toWaHref(data.contact.whatsAppPhone)}
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OverlayModal;
