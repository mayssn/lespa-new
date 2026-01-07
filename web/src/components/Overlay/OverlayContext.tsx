import React, { createContext, useContext, useState } from "react";
type OverlayContextValue = {
  slug: string | null;
  open: (slug: string) => void;
  close: () => void;
};

const OverlayContext = createContext<OverlayContextValue | null>(null);

export const OverlayProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [slug, setSlug] = useState<string | null>(null);

  return (
    <OverlayContext.Provider
      value={{
        slug,
        open: (s) => setSlug(s),
        close: () => setSlug(null),
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  const ctx = useContext(OverlayContext);
  if (!ctx)
    throw new Error("useOverlay must be used inside <OverlayProvider />");
  return ctx;
};
