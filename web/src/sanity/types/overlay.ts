export type OverlayContact = {
  label?: string;
  callPhone?: string;
  whatsAppPhone?: string;
};

export type OverlaySection = {
  _key: string;
  title: string;
  body?: any;
  bullets?: string[];
  showFlowerDivider?: boolean;
  footerLine?: string;
};

export type OverlayPage = {
  _id: string;
  title: string;
  slug: string;
  sections: OverlaySection[];
  contact?: OverlayContact;
};
