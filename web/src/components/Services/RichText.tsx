import React from "react";
import { PortableText } from "@portabletext/react";

type Props = {
  value: any;
};

const RichText: React.FC<Props> = ({ value }) => {
  if (!value || !Array.isArray(value) || value.length === 0) return null;

  return (
    <div className="richText">
      <PortableText
        value={value}
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
  );
};

export default RichText;
