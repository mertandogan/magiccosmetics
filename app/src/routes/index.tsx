import { createFileRoute } from "@tanstack/react-router";

import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";
import { HOME_FAQS, productsIn } from "@/site/data";
import { Barbers, Faq, Finder, Journal, Marquee, Powder, Range, Routine } from "@/site/sections";
import { faqLd, itemListLd, orgLd, pageHead, siteLd } from "@/site/seo";
import { Shell } from "@/site/shell";

export const Route = createFileRoute("/")({
  head: () => {
    const base = pageHead({
      title: "Curl Cream & Styling Powder for Men UK | Magic Cosmetics",
      description: "Leave-in curl cream, curl therapy and matte hair styling powder from Magic Cosmetics, a UK men's grooming brand. Sold direct with UK delivery.",
      path: "/",
      ld: [orgLd(), siteLd(), faqLd(HOME_FAQS), itemListLd("Curl care", productsIn("curl-care")), itemListLd("Hair styling powder", productsIn("styling-powder"))],
    });
    return {
      ...base,
      links: [
        ...base.links,
        { rel: "preload", as: "image", href: "/assets/world/scene-01-poster.webp", media: "(min-width: 861px)", fetchPriority: "high" as const },
        { rel: "preload", as: "image", href: "/assets/world/scene-01-mobile-poster.webp", media: "(max-width: 860px)", fetchPriority: "high" as const },
      ],
    };
  },
  component: Home,
});

function Home() {
  return (
    <Shell>
      <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} />
      <Marquee />
      <Finder />
      <Powder />
      <Range />
      <Barbers />
      <Routine />
      <Journal />
      <Faq />
    </Shell>
  );
}
