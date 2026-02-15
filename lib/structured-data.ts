import { SITE_URL, SITE_NAME } from "./constants";

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Honest reviews, gentle recommendations, and trusted picks for your baby — by a mama who checks every label.",
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Honest reviews, gentle recommendations, and trusted picks for your baby.",
  };
}
