import { createImageUrlBuilder } from "@sanity/image-url";
import { sanity } from "./client";

const builder = createImageUrlBuilder(sanity);

export const urlFor = (source: any) => builder.image(source);
