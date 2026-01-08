export type ServiceType = "menu" | "text";

export type ServiceTag = {
  _id: string;
  title: string;
  order?: number;
};

export type ServiceMenuItem = {
  _key: string;
  name: string;
  duration: string;
  price: string;
  description?: string;
  bullets?: string[];
  tags?: ServiceTag[];
};

export type Service = {
  _id: string;
  order?: number;
  title: string;
  serviceType: ServiceType;

  icon?: any;

  menuItems?: ServiceMenuItem[];
  sections?: ServiceMenuSection[];

  textPhoto?: any;
  textPhotoAlt?: string;
  text?: any;
};
