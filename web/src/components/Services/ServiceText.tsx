import React from "react";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { urlFor } from "./imageUtils";
import "./ServiceText.css";

type Props = {
  title: string;
  text?: PortableTextBlock[]; // blockContent
  photo?: any;
  photoAlt?: string;
};

const ServiceText: React.FC<Props> = ({ title, text, photo, photoAlt }) => {
  return (
    <div className="serviceTextWrap">
      {photo && (
        <img
          className="serviceTextPhoto"
          src={urlFor(photo)}
          alt={photoAlt || `${title} photo`}
        />
      )}

      <div className="serviceTextContent">
        {text && text.length ? (
          <div className="richText">
            <PortableText
              value={text}
              components={{
                block: {
                  normal: ({ children }) => <p>{children}</p>,
                },
                marks: {
                  link: ({ children, value }) => {
                    const href = value?.href || "#";
                    const isExternal = href.startsWith("http");
                    return (
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                      >
                        {children}
                      </a>
                    );
                  },
                },
              }}
            />
          </div>
        ) : (
          <p className="serviceEmpty">No text yet.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceText;
