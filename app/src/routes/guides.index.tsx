import { createFileRoute } from "@tanstack/react-router";

import { GuideCards } from "@/site/sections";
import { breadcrumbLd, orgLd, pageHead } from "@/site/seo";
import { Crumbs, Shell } from "@/site/shell";

export const Route = createFileRoute("/guides/")({
  head: () =>
    pageHead({
      title: "Curl and Hair Styling Guides | Magic Cosmetics",
      description: "Straight answers on defining curls, beating frizz and using hair styling powder, from Magic Cosmetics.",
      path: "/guides",
      ld: [
        orgLd(),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ]),
      ],
    }),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <Shell>
      <section className="page">
        <div className="wrap">
          <Crumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Guides", href: "/guides" },
            ]}
          />
          <h1>Guides</h1>
          <p className="lede page__intro">Straight answers on curls and style: how to define curls, why curls go frizzy and how to use styling powder.</p>
          <GuideCards headingLevel={2} />
        </div>
      </section>
    </Shell>
  );
}
