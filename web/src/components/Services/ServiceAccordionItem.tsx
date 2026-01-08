import React, { useRef, useEffect } from "react";
import { urlFor } from "./imageUtils";
import type { Service } from "../../sanity/types";
import ServiceMenu from "./ServiceMenu";
import ServiceText from "./ServiceText";
import "./ServiceAccordionItem.css";

interface ServiceAccordionItemProps {
  service: Service;
  open: boolean;
  onToggle: () => void;
}

const ServiceAccordionItem: React.FC<ServiceAccordionItemProps> = ({
  service,
  open,
  onToggle,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollLockRef = useRef<number | null>(null);
  const isLockingRef = useRef(false);

  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  const handleToggle = () => {
    isLockingRef.current = true;

    // Prevent scroll during state update
    const preventScroll = (e: Event) => {
      if (isLockingRef.current) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    // Call the toggle
    onToggle();

    // After a tick, scroll the button into view minimally
    requestAnimationFrame(() => {
      if (buttonRef.current) {
        buttonRef.current.scrollIntoView({
          behavior: "auto",
          block: "nearest",
        });
      }

      // Stop preventing scroll after layout settles
      if (scrollLockRef.current !== null) {
        clearTimeout(scrollLockRef.current);
      }

      scrollLockRef.current = window.setTimeout(() => {
        isLockingRef.current = false;
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        scrollLockRef.current = null;
      }, 300);
    });
  };
  return (
    <div
      className={`serviceRow${!service.icon ? " noIcon" : ""}`}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
      style={{ cursor: "pointer" }}
    >
      {service.icon && (
        <div className="serviceIconBox">
          <img
            className="serviceIcon"
            src={urlFor(service.icon).width(120).height(120).fit("max").url()}
            alt={`${service.title} icon`}
          />
        </div>
      )}

      <h2 className="serviceText">{service.title}</h2>

      <div
        ref={buttonRef}
        className="servicePlus"
        aria-label={`${open ? "Close" : "Open"} ${service.title}`}
        aria-expanded={open}
        onClick={(e) => e.stopPropagation()}
      >
        {open ? "–" : "+"}
      </div>

      {open && (
        <div className="serviceAccordionContent">
          {service.serviceType === "menu" ? (
            <ServiceMenu menuItems={service.menuItems || []} />
          ) : (
            <ServiceText
              text={service.text}
              photo={service.textPhoto}
              photoAlt={service.textPhotoAlt}
              title={service.title}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceAccordionItem;
