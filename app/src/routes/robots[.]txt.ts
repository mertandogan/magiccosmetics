import { createFileRoute } from "@tanstack/react-router";

import { SITE_URL, isProductionHost } from "@/site/data";

/** Search and AI crawlers are all welcome on the public pages (GEO). Checkout lives on the Shopify subdomain. */
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Applebot-Extended", "CCBot"];
const BLOCKED = ["/app", "/cart", "/account", "/checkout"];

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isProductionHost(new URL(request.url).host)) {
          return new Response("User-agent: *\nDisallow: /\n", { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
        }
        const rules = ["Allow: /", ...BLOCKED.map((p) => `Disallow: ${p}`)];
        const body = [
          "User-agent: *",
          ...rules,
          "",
          ...AI_BOTS.flatMap((bot) => [`User-agent: ${bot}`, ...rules, ""]),
          `Sitemap: ${SITE_URL}/sitemap.xml`,
          "",
        ].join("\n");
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
