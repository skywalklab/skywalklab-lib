import { component_descriptions } from "../stories/component-descriptions.js";
import { BRAND_LAB } from "../brand/data.js";
import { createHomepageSchema } from "../utils/page-schema.js";

const homepageSchema = createHomepageSchema({
  name: BRAND_LAB.company,
  url: BRAND_LAB.site,
  logo: BRAND_LAB.favicon,
  description: BRAND_LAB.industry
});

export const seo_static_props = new Map<string, any>([
  [
    "JsonLd",
    {
      storyDescription: component_descriptions.seo.get("JsonLd"),
      props: {
        schema: homepageSchema,
        showSchema: true
      }
    }
  ]
]);
