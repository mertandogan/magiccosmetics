import { createFileRoute } from "@tanstack/react-router";

import { BRAND, COLLECTIONS, FREE_DELIVERY_OVER, HOME_FAQS, SHOP_URL, SITE_URL, money, productTitle, productsIn } from "@/site/data";
import { GUIDES } from "@/site/guides";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const o = SITE_URL;
        const line = (p: ReturnType<typeof productsIn>[number]) => `- [${productTitle(p)}](${o}/products/${p.key}): ${p.short} ${money(p.price)}.`;
        const lines = [
          `# ${BRAND.name}`,
          "",
          `> ${BRAND.name} is a UK men's grooming brand selling leave-in curl creams, keratin and protein curl treatments and matte hair styling powders direct to customers and barbers. UK delivery only. Checkout is on ${SHOP_URL.replace("https://", "")}.`,
          "",
          "## Key pages",
          `- [Home](${o}/): curl care, styling powder, barber gift, guides and FAQ`,
          `- [Curl care](${o}/collections/curl-care): ${COLLECTIONS["curl-care"].description}`,
          `- [Hair styling powder](${o}/collections/styling-powder): ${COLLECTIONS["styling-powder"].description}`,
          `- [Guides](${o}/guides): how to define curls, why curls go frizzy, how to use styling powder`,
          `- [About](${o}/pages/about)`,
          `- [Delivery](${o}/pages/delivery)`,
          `- [Contact](${o}/pages/contact)`,
          `- [Shop and checkout](${SHOP_URL}): current prices, stock and delivery options`,
          "",
          "## Curl care",
          ...productsIn("curl-care").map(line),
          "",
          "## Hair styling powder",
          ...productsIn("styling-powder").map(line),
          "",
          "## Guides",
          ...GUIDES.map((g) => `- [${g.title}](${o}/guides/${g.slug}): ${g.answer}`),
          "",
          "## Facts",
          `- Delivery: UK only. Free standard delivery on orders over £${FREE_DELIVERY_OVER}. Options and times are shown at checkout.`,
          "- Barbers: a barber code entered at checkout adds a free Styling Powder 20g.",
          `- Address: ${BRAND.street}, ${BRAND.locality} ${BRAND.postcode}`,
          `- Email: ${BRAND.email}`,
          "",
          "## FAQ",
          ...HOME_FAQS.flatMap((f) => [`### ${f.q}`, f.a, ""]),
        ];
        return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" } });
      },
    },
  },
});
