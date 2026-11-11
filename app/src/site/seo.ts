import { BRAND, PRODUCTS, SHOP_URL, SITE_URL, productTitle, shopUrl, type Faq, type Product } from "./data";
import type { Guide } from "./guides";
import appMeta from "../app-meta.json";
import siteCss from "./site.css?url";

const OG_DEFAULT = "/assets/og/magic-og.jpg";
/** Share card: the uploaded OG image when app-meta.json carries an absolute URL (so link previews work on any host), else our own asset. */
const OG_IMAGE = typeof appMeta.og_image_url === "string" && appMeta.og_image_url.startsWith("http") ? appMeta.og_image_url : OG_DEFAULT;

type HeadInput = { title: string; description: string; path: string; image?: string; type?: "website" | "article" | "product"; ld?: unknown[] };

/** Shared <head> for every public page: title, description, canonical, Open Graph and JSON-LD. */
export function pageHead({ title, description, path, image = OG_IMAGE, type = "website", ld = [] }: HeadInput) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const img = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:image", content: img },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
    ],
    links: [
      { rel: "stylesheet", href: siteCss },
      { rel: "canonical", href: url },
    ],
    scripts: ld.length ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": ld }) }] : [],
  };
}

export const orgLd = () => ({
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: BRAND.name,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  email: BRAND.email,
  description: "Magic Cosmetics is a UK men's grooming brand selling curl creams, curl treatments and hair styling powders to customers and barbers.",
  address: { "@type": "PostalAddress", streetAddress: BRAND.street, addressLocality: BRAND.locality, postalCode: BRAND.postcode, addressCountry: "GB" },
});

export const siteLd = () => ({ "@type": "WebSite", "@id": `${SITE_URL}/#site`, name: BRAND.name, url: SITE_URL, inLanguage: "en-GB", publisher: { "@id": `${SITE_URL}/#org` } });

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
});

export const faqLd = (faqs: Faq[]) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const productImage = (p: Product) => (p.hasImage ? `${SITE_URL}/assets/products/${p.key}-lg.webp` : `${SITE_URL}${OG_DEFAULT}`);

export const productLd = (p: Product) => ({
  "@type": "Product",
  "@id": `${SITE_URL}/products/${p.key}#product`,
  name: `${BRAND.name} ${productTitle(p)}`,
  sku: p.key,
  description: p.short,
  image: productImage(p),
  brand: { "@type": "Brand", name: BRAND.name },
  category: p.collection === "curl-care" ? "Curl care" : "Hair styling powder",
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/products/${p.key}`,
    priceCurrency: "GBP",
    price: p.price.toFixed(2),
    availability: "https://schema.org/InStock",
    seller: { "@id": `${SITE_URL}/#org` },
  },
});

export const itemListLd = (name: string, items: Product[]) => ({
  "@type": "ItemList",
  name,
  itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/products/${p.key}`, name: `${BRAND.name} ${productTitle(p)}` })),
});

export const articleLd = (g: Guide) => ({
  "@type": "Article",
  headline: g.title,
  description: g.description,
  datePublished: g.published,
  dateModified: g.updated,
  inLanguage: "en-GB",
  mainEntityOfPage: `${SITE_URL}/guides/${g.slug}`,
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  image: `${SITE_URL}${OG_DEFAULT}`,
});

export const howToLd = (name: string, steps: string[]) => ({
  "@type": "HowTo",
  name,
  step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s })),
});

export const allProductUrls = () => PRODUCTS.map((p) => `${SITE_URL}/products/${p.key}`);
export const checkoutUrl = (p: Product) => shopUrl(p);
export { SHOP_URL };
