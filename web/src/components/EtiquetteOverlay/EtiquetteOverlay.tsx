// Overlay component removed
import { useEffect, useMemo, useState } from "react";
import "./EtiquetteOverlay.css";

import { sanity } from "../../sanity/client";
import { PortableText } from "@portabletext/react";

type EtiquetteDoc = {
  etiquetteTitle?: string;
  etiquetteBullets?: any;
  voucherTitle?: string;
  voucherBullets?: any;
  contactNumber?: string;
};

type Props = {
  onClose: () => void;
};

const onlyDigits = (s = "") => String(s).replace(/[^\d+]/g, "");

const toTelHref = (tel: string) => {
  const clean = onlyDigits(tel);
  return clean ? `tel:${clean}` : "#";
};

const toWaHref = (wa: string) => {
  const clean = String(wa || "").replace(/[^\d]/g, "");
  return clean ? `https://wa.me/${clean}` : "#";
};

export default function EtiquetteOverlay({ onClose }: Props) {
  const [data, setData] = useState<EtiquetteDoc | null>(null);
  const [copied, setCopied] = useState(false);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia?.("(pointer: coarse)").matches ||
      window.innerWidth < 900
    );
  }, []);

  useEffect(() => {
    // scroll lock
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const query = `*[_type == "etiquetteAndVouchers"][0]{
      etiquetteTitle,
      etiquetteBullets,
      voucherTitle,
      voucherBullets,
      contactNumber
    }`;

    sanity
      .fetch(query)
      .then((res) => setData(res || null))
      .catch(console.error);
  }, []);

  const contact = data?.contactNumber?.trim() || "";
  const telHref = toTelHref(contact);
  const waHref = toWaHref(contact);

  const copyNumber = async () => {
    if (!contact) return;
    try {
      await navigator.clipboard.writeText(contact);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1300);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = contact;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1300);
    }
  };

  return (
    <div
      className="etqOverlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="etqModal" onClick={(e) => e.stopPropagation()}>
        <button className="etqClose" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 className="etqTitle">{data?.etiquetteTitle || "Spa Etiquette"}</h2>
        <div className="etqRule" />

        <div className="etqBody">
          {data?.etiquetteBullets?.length ? (
            <PortableText value={data.etiquetteBullets} />
          ) : (
            <p className="etqMuted">No etiquette content found.</p>
          )}
        </div>

        <div className="etqThanks">Thank you for your cooperation.</div>

        <div className="etqDivider">
          <span className="etqDividerIcon">✦</span>
        </div>

        <h3 className="etqSubTitle">
          {data?.voucherTitle || "Gift Vouchers Terms and Conditions"}
        </h3>

        <div className="etqBody">
          {data?.voucherBullets?.length ? (
            <PortableText value={data.voucherBullets} />
          ) : (
            <p className="etqMuted">No voucher terms found.</p>
          )}
        </div>

        <div className="etqFooter">
          <span>For more information, </span>

          {/* Call + WhatsApp only “work” on mobile */}
          {isMobile ? (
            <>
              <a className="etqActionLink" href={telHref}>
                call
              </a>
              <span> or </span>
              <a
                className="etqActionLink"
                href={waHref}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <span> us on </span>
            </>
          ) : (
            <>
              <span className="etqMutedInline">call or WhatsApp us on </span>
            </>
          )}

          <button className="etqNumber" type="button" onClick={copyNumber}>
            {contact || "—"}
          </button>

          <span className={`etqCopied ${copied ? "show" : ""}`}>Copied</span>
        </div>
      </div>
    </div>
  );
}
