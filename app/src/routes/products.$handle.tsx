import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { BRAND, COLLECTIONS, FREE_DELIVERY_OVER, SHOP_URL, money, pimg, productByKey, productTitle, productsIn, shopUrl, type Product } from "@/site/data";
import { GUIDES } from "@/site/guides";
import { ProductImg, productAlt } from "@/site/sections";
import { breadcrumbLd, faqLd, orgLd, pageHead, productImage, productLd } from "@/site/seo";
import { Crumbs, Shell, guideLink, prodLink } from "@/site/shell";

const SUFFIX: Record<Product["line"], string> = {
  "Curl Cream": "Leave-in Curl Cream",
  "Avocado Oil Curl Cream": "Leave-in Curl Cream",
  "Curl Therapy": "Curl Treatment",
  "Hair Styling Powder": "Matte Volume Powder",
};

function seoTitle(p: Product) {
  const long = `${productTitle(p)}: ${SUFFIX[p.line]} | ${BRAND.name}`;
  return long.length <= 62 ? long : `${productTitle(p)} | ${BRAND.name}`;
}

export const Route = createFileRoute("/products/$handle")({
  loader: ({ params }) => {
    if (!productByKey(params.handle)) throw notFound();
    return { key: params.handle };
  },
  head: ({ params }) => {
    const p = productByKey(params.handle);
    if (!p) return {};
    const c = COLLECTIONS[p.collection];
    return pageHead({
      title: seoTitle(p),
      description: `${p.short} Sold direct by ${BRAND.name} with UK delivery.`,
      path: `/products/${p.key}`,
      image: productImage(p),
      type: "product",
      ld: [
        orgLd(),
        productLd(p),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: c.h1, path: `/collections/${p.collection}` },
          { name: productTitle(p), path: `/products/${p.key}` },
        ]),
        faqLd(p.faqs),
      ],
    });
  },
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const p = productByKey(handle) as Product;
  const c = COLLECTIONS[p.collection];
  const more = productsIn(p.collection).filter((x) => x.key !== p.key).slice(0, 3);
  const guides = GUIDES.filter((g) => p.guides.includes(g.slug));
  const code = p.name.replace("Hair Styling Powder ", "");
  return (
    <Shell ctaHref={shopUrl(p)}>
      <section className="page">
        <div className="wrap">
          <Crumbs
            items={[
              { name: "Home", href: "/" },
              { name: c.h1, href: `/collections/${p.collection}` },
              { name: productTitle(p) },
            ]}
          />
          <div className="pdp">
            <div className="pdp__stage">
              {p.hasImage ? (
                <ProductImg p={p} size="lg" loading="eager" />
              ) : (
                <>
                  <img className="pdp__plate" src="/assets/plates/powder-smoke.webp" alt="" width={1920} height={1080} decoding="async" />
                  <div className="pdp__ph">
                    <b>{code}</b>
                    <span className="eyebrow">{p.hold?.label}</span>
                    <span className="mono" style={{ color: "var(--muted)" }}>
                      {p.size} styling powder
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="pdp__buy">
              <h1>{productTitle(p)}</h1>
              <p className="pdp__price">{money(p.price)}</p>
              <p className="pdp__answer">{p.short}</p>
              <ul className="ticks">
                {p.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                <a className="cta-shop" href={shopUrl(p)} rel="noopener" data-cta="pdp-shop-now">
                  Shop now
                </a>
                {guides[0] ? (
                  <Link {...guideLink(guides[0].slug)} className="frame-btn">
                    Read the guide
                  </Link>
                ) : null}
              </div>
              <dl style={{ margin: 0 }}>
                <div className="fact">
                  <dt>Size</dt>
                  <dd>{p.size}</dd>
                </div>
                <div className="fact">
                  <dt>Pack</dt>
                  <dd>{p.pack}</dd>
                </div>
                <div className="fact">
                  <dt>Best for</dt>
                  <dd>{p.suitable}</dd>
                </div>
                <div className="fact">
                  <dt>Delivery</dt>
                  <dd>UK only. Free standard delivery over £{FREE_DELIVERY_OVER}. Options and times are shown at checkout.</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="block">
            <h2>How to use</h2>
            <ol className="steps3" style={{ maxWidth: "46rem" }}>
              {p.how.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>

          <div className="block">
            <h2>Questions about {p.name}</h2>
            <div className="faq__list" style={{ maxWidth: "52rem" }}>
              {p.faqs.map((f) => (
                <details key={f.q}>
                  <summary>
                    <h3>{f.q}</h3>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
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

          <div className="block">
            <h2>More from {c.h1.toLowerCase()}</h2>
            <div className="minis">
              {more.map((m) => (
                <Link key={m.key} {...prodLink(m.key)} className="mini">
                  {m.hasImage ? <img src={pimg(m.key, "sm").src} width={pimg(m.key, "sm").width} height={pimg(m.key, "sm").height} alt={productAlt(m)} loading="lazy" decoding="async" /> : null}
                  <span>{productTitle(m)}</span>
                  <small>{money(m.price)}</small>
                </Link>
              ))}
            </div>
          </div>
          <p className="mono" style={{ marginTop: "2rem", color: "var(--muted)", fontSize: "0.75rem" }}>
            Prices shown in GBP. Current price, stock and delivery are confirmed at checkout on {SHOP_URL.replace("https://", "")}.
          </p>
        </div>
      </section>
    </Shell>
  );
}
