import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { COLLECTIONS, productsIn, shopCollectionUrl } from "@/site/data";
import { GUIDES } from "@/site/guides";
import { ProductCell } from "@/site/sections";
import { breadcrumbLd, itemListLd, orgLd, pageHead } from "@/site/seo";
import { Crumbs, Shell, guideLink } from "@/site/shell";

/** Short "how to choose" lines, written from the products' own descriptions. */
const CHOOSE: Record<string, string[]> = {
  "curl-care": [
    "Curl Cream: the lightweight everyday leave-in for all curl types.",
    "Avocado Oil Curl Cream: creamier, for thirstier curls and waves.",
    "Curl Therapy Keratin or Protein: a treatment for tired, frizz-prone curls.",
  ],
  "styling-powder": [
    "GUM 01: strong hold, volume and texture.",
    "BERRY 02: flexible hold you can restyle through the day.",
    "MELON 03: a natural hold for a lighter look.",
  ],
};

export const Route = createFileRoute("/collections/$handle")({
  loader: ({ params }) => {
    if (!COLLECTIONS[params.handle]) throw notFound();
    return { handle: params.handle };
  },
  head: ({ params }) => {
    const c = COLLECTIONS[params.handle];
    if (!c) return {};
    const path = `/collections/${params.handle}`;
    return pageHead({
      title: c.title,
      description: c.description,
      path,
      ld: [
        orgLd(),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: c.h1, path },
        ]),
        { "@type": "CollectionPage", name: c.h1, description: c.description, url: `https://magiccosmetics.co.uk${path}` },
        itemListLd(c.h1, productsIn(params.handle)),
      ],
    });
  },
  component: Collection,
});

function Collection() {
  const { handle } = Route.useParams();
  const c = COLLECTIONS[handle];
  const items = productsIn(handle);
  const guides = GUIDES.filter((g) => c.guides.includes(g.slug));
  return (
    <Shell ctaHref={shopCollectionUrl(handle)}>
      <section className="page">
        <div className="wrap">
          <Crumbs
            items={[
              { name: "Home", href: "/" },
              { name: c.h1, href: `/collections/${handle}` },
            ]}
          />
          <h1>{c.h1}</h1>
          <p className="lede page__intro">{c.intro}</p>
          <div className="pgrid">
            {items.map((p) => (
              <ProductCell key={p.key} p={p} />
            ))}
          </div>
          <div className="block">
            <h2>How to choose</h2>
            <ul className="ticks">
              {(CHOOSE[handle] ?? []).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          {guides.length ? (
            <div className="block">
              <h2>Guides</h2>
              <ul className="ticks">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link {...guideLink(g.slug)} className="read-link">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </Shell>
  );
}
