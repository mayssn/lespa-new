import React from "react";
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
  return (
    <div className={`serviceRow${!service.icon ? " noIcon" : ""}`}>
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

      <button
        className="servicePlus"
        type="button"
        aria-label={`${open ? "Close" : "Open"} ${service.title}`}
        aria-expanded={open}
        onClick={onToggle}
      >
        {open ? "–" : "+"}
      </button>

      {open && (
        <div className="serviceAccordionContent">
          {service.serviceType === "menu" ? (
            <ServiceMenu sections={service.sections || []} />
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
