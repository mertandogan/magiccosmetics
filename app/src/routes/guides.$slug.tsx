import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { pimg, money, productByKey, productTitle, shopUrl, type Product } from "@/site/data";
import { GUIDES, guideBySlug } from "@/site/guides";
import { productAlt } from "@/site/sections";
import { articleLd, breadcrumbLd, faqLd, howToLd, orgLd, pageHead } from "@/site/seo";
import { Crumbs, Shell, guideLink, prodLink } from "@/site/shell";

const dateOf = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    if (!guideBySlug(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const g = guideBySlug(params.slug);
    if (!g) return {};
    const how = g.howToSection ? g.sections.find((s) => s.h === g.howToSection)?.ol : undefined;
    return pageHead({
      title: `${g.title} | Magic Cosmetics`.length <= 70 ? `${g.title} | Magic Cosmetics` : g.title,
      description: g.description,
      path: `/guides/${g.slug}`,
      type: "article",
      ld: [
        orgLd(),
        articleLd(g),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: g.title, path: `/guides/${g.slug}` },
        ]),
        faqLd(g.faqs),
        ...(how ? [howToLd(g.title, how)] : []),
      ],
    });
  },
  component: GuidePage,
});

function GuidePage() {
  const { slug } = Route.useParams();
  const g = guideBySlug(slug)!;
  const prods = g.products.map((k) => productByKey(k)).filter((p): p is Product => Boolean(p));
  const related = GUIDES.filter((x) => g.related.includes(x.slug));
  return (
    <Shell ctaHref={prods[0] ? shopUrl(prods[0]) : undefined}>
      <article className="page">
        <div className="article">
          <Crumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Guides", href: "/guides" },
              { name: g.kicker },
            ]}
          />
          <h1>{g.title}</h1>
          <p className="article__meta">
            {g.readMins} min read · Updated {dateOf(g.updated)} · By Magic Cosmetics
          </p>
          <p className="answer">{g.answer}</p>
          {g.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p?.map((t) => (
                <p key={t}>{t}</p>
              ))}
              {s.ul ? (
                <ul>
                  {s.ul.map((t) => (
                    <li key={t}>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {s.ol ? (
                <ol>
                  {s.ol.map((t) => (
                    <li key={t}>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
            </section>
          ))}

          <h2>Products in this guide</h2>
          <div className="minis">
            {prods.map((p) => (
              <Link key={p.key} {...prodLink(p.key)} className="mini">
                {p.hasImage ? <img src={pimg(p.key, "sm").src} width={pimg(p.key, "sm").width} height={pimg(p.key, "sm").height} alt={productAlt(p)} loading="lazy" decoding="async" /> : null}
                <span>{productTitle(p)}</span>
                <small>{money(p.price)}</small>
              </Link>
            ))}
          </div>

          <h2>Questions</h2>
          <div className="faq__list">
            {g.faqs.map((f) => (
              <details key={f.q}>
                <summary>
                  <h3>{f.q}</h3>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          {related.length ? (
            <>
              <h2>Keep reading</h2>
              <ul>
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link {...guideLink(r.slug)} className="read-link">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </article>
    </Shell>
  );
}
