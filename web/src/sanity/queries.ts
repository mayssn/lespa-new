export const homePageQuery = `
*[_type == "homePage"][0]{
  hero {
    logo,
    quoteLine1,
    quoteLine2
  },
  about {
    titleLine1,
    titleLine2,
    text,
    miniLabel,
    photos[] {
      image,
      alt
    }
  }
}`;

export const servicesQuery = `
*[_type == "service"] | order(order asc, title asc) {
  _id,
  title,
  serviceType,
  order,
  icon,

  // menu
  sections[] {
    ...
  },

  // text
  textPhoto,
  textPhotoAlt,
  text
}
`;

export const overlayBySlugQuery = `
*[_type=="overlayPage" && slug.current==$slug][0]{
  _id,
  title,
  "slug": slug.current,
  sections[]{
    _key,
    title,
    body,
    bullets,
    showFlowerDivider,
    footerLine
  },
  contact{
    label,
    callPhone,
    whatsAppPhone
  }
}`;
