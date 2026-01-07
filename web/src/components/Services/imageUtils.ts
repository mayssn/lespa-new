import { createImageUrlBuilder } from "@sanity/image-url";
import { sanity } from "../../sanity/client";

const builder = createImageUrlBuilder(sanity);
export const urlFor = (src: any) =>
  src ? builder.image(src).width(80).height(80).fit("max").url() : "";
