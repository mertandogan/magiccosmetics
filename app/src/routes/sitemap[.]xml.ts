import { createFileRoute } from "@tanstack/react-router";

import { COLLECTIONS, PRODUCTS, SITE_URL } from "@/site/data";
import { GUIDES } from "@/site/guides";

/** Date the site content last changed in a meaningful way. Update with each content release. */
const SITE_UPDATED = "2026-11-08";

type Entry = { path: string; priority: string; changefreq: string; lastmod?: string; image?: string };

const entries = (): Entry[] => [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  ...Object.keys(COLLECTIONS).map((h) => ({ path: `/collections/${h}`, priority: "0.9", changefreq: "weekly" })),
  ...PRODUCTS.map((p) => ({ path: `/products/${p.key}`, priority: "0.8", changefreq: "weekly", image: p.hasImage ? `/assets/products/${p.key}-lg.webp` : undefined })),
  { path: "/guides", priority: "0.7", changefreq: "weekly" },
  ...GUIDES.map((g) => ({ path: `/guides/${g.slug}`, priority: "0.7", changefreq: "monthly", lastmod: g.updated })),
  ...["about", "delivery", "contact"].map((s) => ({ path: `/pages/${s}`, priority: "0.4", changefreq: "yearly" })),
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries().map((e) =>
          [
            "  <url>",
            `    <loc>${SITE_URL}${e.path === "/" ? "/" : e.path}</loc>`,
            `    <lastmod>${e.lastmod ?? SITE_UPDATED}</lastmod>`,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            ...(e.image ? [`    <image:image><image:loc>${SITE_URL}${e.image}</image:loc></image:image>`] : []),
            "  </url>",
          ].join("\n"),
        );
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
          ...urls,
          "</urlset>",
          "",
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
