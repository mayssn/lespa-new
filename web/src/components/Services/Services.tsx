import { useEffect, useState } from "react";
import "./Services.css";

import { sanity } from "../../sanity/client";
import ServiceAccordionItem from "./ServiceAccordionItem";
import type { Service } from "../../sanity/types";

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const query = `*[_type == "service"] | order(order asc, title asc) {
  _id,
  title,
  serviceType,
  order,
  icon,
  sections[] {
    _key,
    title,
    introText,
    items[] {
      _key,
      name,
      description,
      duration,
      price,
  tags[]->{
    _id,
    title,
    order
  
      }
    }
  },
  textPhoto,
  textPhotoAlt,
  text
}`;

    sanity
      .fetch(query)
      .then((data) => setServices(data))
      .catch(console.error);
  }, []);

  return (
    <section className="servicesWrap">
      <h1 className="servicesTitle">Our Services</h1>

      <div className="servicesCard">
        {services.map((service) => (
          <ServiceAccordionItem
            key={service._id}
            service={service}
            open={openId === service._id}
            onToggle={() =>
              setOpenId((prev) => (prev === service._id ? null : service._id))
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
