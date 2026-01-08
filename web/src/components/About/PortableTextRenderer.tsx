import { PortableText } from "@portabletext/react";
import React from "react";

const components = {
  marks: {
    link: ({ value, children }: any) => {
      const href = value?.href;
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },

    internalLink: ({ value, children }: any) => {
      const href = value?.path;
      if (!href) return <span>{children}</span>;
      return <a href={href}>{children}</a>;
    },
  },
};

const PortableTextRenderer = (props: any) => (
  <PortableText components={components} {...props} />
);

export default PortableTextRenderer;
