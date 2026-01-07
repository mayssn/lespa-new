export type ServiceType = "menu" | "text";

export type ServiceTag = {
  _id: string;
  title: string;
  order?: number;
};

export type ServiceMenuItem = {
  _key: string;
  name: string;
  duration?: string;
  price?: string;
  tags?: ServiceTag[];
};

export type ServiceMenuSection = {
  _key: string;
  title?: string;
  introText?: string;
  items?: ServiceMenuItem[];
};

export type Service = {
  _id: string;
  order?: number;
  title: string;
  serviceType: ServiceType;

  icon?: any;

  sections?: ServiceMenuSection[];

  textPhoto?: any;
  textPhotoAlt?: string;
  text?: any;
};
