import { createElement as h, Fragment } from "react";

import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";
import { SHOP_URL } from "@/site/data";

/** Brand palette from design-brief.md: stage black, chalk text, one chartreuse accent. */
export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#cbd65a",
  background: "#0a0b09",
  ink: "#ece9de",
  muted: "#a5a99b",
};

/**
 * One continuous stage film in four legs. Each leg ends on the exact frame the next one starts with,
 * so the scrub never shows a seam. Desktop is 16:9 with the hero right of centre (copy sits left);
 * mobile is a dedicated 9:16 render with the hero centred.
 */
const leg = (n: string) => ({
  clip: `/assets/world/scene-${n}.mp4`,
  poster: `/assets/world/scene-${n}-poster.webp`,
  mobileClip: `/assets/world/scene-${n}-mobile.mp4`,
  mobilePoster: `/assets/world/scene-${n}-mobile-poster.webp`,
});

const shopNow = h("a", { className: "cta-shop", href: SHOP_URL, "data-cta": "shop-now" }, "Shop now");
const shopCurl = h("a", { className: "frame-btn", href: "/collections/curl-care", "data-cta": "shop-curl-care" }, "Shop curl care");
const shopPowder = h("a", { className: "big-link", href: "/collections/styling-powder", "data-cta": "shop-styling-powder" }, "Shop styling powder", h("span", { "aria-hidden": "true" }, "→"));

/** Four chapters over the film. Copy is en-GB, no dashes, product claims only in the products' own wording. */
export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    id: "curl-care", label: "Curl care", heading: "h1", kicker: "Curl cream · Curl therapy",
    title: "Curls that behave.",
    body: "Leave-in curl care from a UK brand, made for every curl type.",
    tags: ["Curl Cream", "Curl Therapy"], align: "left", actions: shopNow, scroll: 1.3, ...leg("01"),
  },
  {
    id: "curl-cream", label: "Curl Cream", kicker: "Curl Cream",
    title: "Soft, defined, less frizz.",
    body: "Curl Cream softens, moisturises and defines without weighing curls down.",
    tags: ["Leave-in", "All curl types"], align: "left", scroll: 2, ...leg("02"),
  },
  {
    id: "curl-therapy", label: "Curl Therapy", kicker: "Curl Therapy",
    title: "Hydrate. Repair. Define.",
    body: "Curl Therapy adds keratin or protein care for tired, frizz-prone curls.",
    tags: ["Keratin", "Protein"], align: "left", scroll: 1.8, ...leg("03"),
  },
  {
    id: "styling-powder", label: "Styling Powder", kicker: "Hair Styling Powder",
    title: "Then add the lift.",
    body: "Styling Powder gives instant volume and a matte, natural hold.",
    tags: ["GUM 01", "BERRY 02", "MELON 03"], align: "left", actions: h(Fragment, null, shopCurl, shopPowder), scroll: 1.8, ...leg("04"),
  },
];
