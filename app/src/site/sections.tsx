import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { BRAND, FINDER, HOME_FAQS, ROUTINE, money, pimg, productByKey, productTitle, productsIn, shopUrl, type Product } from "./data";
import { GUIDES } from "./guides";
import { Star, collLink, guideLink, prodLink } from "./shell";

/** Alt text for a packshot. */
export const productAlt = (p: Product) => `${BRAND.name} ${p.name} ${p.size}, ${p.pack.toLowerCase()}`;

export function ProductImg({ p, size = "sm", ...rest }: { p: Product; size?: "lg" | "sm"; loading?: "lazy" | "eager"; sizes?: string }) {
  const i = pimg(p.key, size);
  return <img src={i.src} width={i.width} height={i.height} alt={productAlt(p)} decoding="async" loading={rest.loading ?? "lazy"} sizes={rest.sizes} />;
}

const MARQUEE = ["Softens", "Moisturises", "Defines", "Hydrates", "Repairs", "Instant volume", "Matte finish"];

/** Decorative kinetic band under the film. Words are the products' own claims; hidden from assistive tech. */
export function Marquee() {
  const set = (k: string) => (
    <div className="marq__set" key={k}>
      {MARQUEE.map((w) => (
        <span key={w}>
          {w}
          <Star />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marq" aria-hidden="true">
      <div className="marq__track">
        {set("a")}
        {set("b")}
      </div>
    </div>
  );
}

/** 2. Hair problem finder: hover-accordion slices. */
export function Finder() {
  const [on, setOn] = useState(0);
  return (
    <section className="finder" aria-labelledby="finder-h">
      <div className="wrap">
        <div className="finder__head rv">
          <p className="eyebrow">Find your fix</p>
          <h2 className="h2" id="finder-h">
            What is your hair doing?
          </h2>
          <p className="lede">Pick the problem. We will point you to the product and the guide that helps.</p>
        </div>
        <div className="slices">
          {FINDER.map((f, i) => {
            const prods = f.products.map((k) => productByKey(k)).filter((p): p is Product => Boolean(p));
            return (
              <article className={`slice${on === i ? " is-on" : ""}`} data-bg={prods.some((p) => p.collection === "styling-powder") ? "smoke" : undefined} key={f.key} onMouseEnter={() => setOn(i)} onFocusCapture={() => setOn(i)}>
                <h3 className="slice__word">{f.word}</h3>
                <div className="slice__body">
                  <p className="slice__line">{f.line}</p>
                  <div className="slice__prods">
                    {prods.map((p) => (p.hasImage ? <ProductImg key={p.key} p={p} /> : <span key={p.key} className="slice__chip">{p.name.replace("Hair Styling Powder ", "")}</span>))}
                  </div>
                  <div className="slice__links">
                    {prods.map((p) => (
                      <Link key={p.key} {...prodLink(p.key)} className="slice__shop">
                        {productTitle(p)} · {money(p.price)}
                      </Link>
                    ))}
                    <Link {...guideLink(f.guide)} className="read-link">
                      {f.guideLabel}
                    </Link>
                  </div>
                </div>
                <button type="button" className="slice__hit" aria-label={`Show fixes for ${f.word}`} onClick={() => setOn(i)} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** 3. Styling powder: poster stacked, three shades, three steps. */
export function Powder() {
  const shades = productsIn("styling-powder");
  return (
    <section className="powder" aria-labelledby="powder-h">
      <div className="powder__plate" aria-hidden="true">
        <img src="/assets/plates/powder-smoke.webp" alt="" width={1920} height={1080} loading="lazy" decoding="async" />
      </div>
      <div className="wrap powder__grid">
        <div className="powder__copy rv">
          <p className="eyebrow">Hair styling powder</p>
          <h2 className="h2" id="powder-h">
            Lift that stays matte.
          </h2>
          <p className="lede">Lightweight 20g powders for instant volume, texture and a matte finish. Choose strong, flexible or natural hold.</p>
          <ol className="steps3">
            <li>Start with dry hair.</li>
            <li>Shake a little onto your fingertips or the roots and work it in.</li>
            <li>Build up until you reach the hold you want.</li>
          </ol>
          <Link {...collLink("styling-powder")} className="big-link" data-cta="shop-styling-powder">
            Shop styling powder <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="shades rv">
          {shades.map((p) => (
            <Link key={p.key} {...prodLink(p.key)} className="shade">
              <span className="shade__code">
                {p.name.replace("Hair Styling Powder ", "")}
                <small>{p.hold?.label}</small>
              </span>
              <span>
                <span className="meter" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <i key={n} className={n <= (p.hold?.level ?? 0) ? "on" : ""} />
                  ))}
                </span>
                <span className="sr">Hold level {p.hold?.level} out of 5</span>
              </span>
              <span className="shade__foot">
                <span>{p.size}</span>
                <span>{money(p.price)}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const RANGE: { key: string; span: 3 | 4 | 6; jar?: boolean }[] = [
  { key: "curl-cream-200ml", span: 4 },
  { key: "curl-cream-pump-200ml", span: 4 },
  { key: "curl-cream-pump-400ml", span: 4 },
  { key: "avocado-oil-curl-cream-250ml", span: 6, jar: true },
  { key: "avocado-oil-curl-cream-pump-200ml", span: 3 },
  { key: "avocado-oil-curl-cream-pump-400ml", span: 3 },
  { key: "curl-therapy-keratin-200ml", span: 6 },
  { key: "curl-therapy-protein-200ml", span: 6 },
];

/** One product cell, shared by the home bento and the collection grid. */
export function ProductCell({ p, span, jar, className = "" }: { p: Product; span?: 3 | 4 | 6; jar?: boolean; className?: string }) {
  return (
    <article className={`cell${span ? ` cell--${span}` : ""}${jar ? " cell--jar" : ""} ${className}`.trimEnd()}>
      <p className="cell__tag">{p.line}</p>
      <div className="cell__stage">
        {p.hasImage ? (
          <Link {...prodLink(p.key)} aria-label={`${productTitle(p)} details`}>
            <ProductImg p={p} />
          </Link>
        ) : (
          <Link {...prodLink(p.key)} className="cell__ph" aria-label={`${productTitle(p)} details`}>
            <b>{p.name.replace("Hair Styling Powder ", "")}</b>
            <small>{p.hold?.label}</small>
          </Link>
        )}
      </div>
      <div className="cell__body">
        <div>
          <Link {...prodLink(p.key)} className="cell__name">
            {p.name}
          </Link>
          <p className="cell__meta">
            {p.size} · {p.pack} · {money(p.price)}
          </p>
        </div>
        {/* Swap for a Shopify cart permalink (variant id) once products exist in the store. */}
        <a className="bag-btn" href={shopUrl(p)} rel="noopener" data-cta="add-to-bag" aria-label={`Add ${productTitle(p)} to bag`}>
          Add to bag
        </a>
      </div>
    </article>
  );
}

/** 4. Curl range: gapless bento, one cell per product. */
export function Range() {
  return (
    <section className="range" aria-labelledby="range-h">
      <div className="wrap">
        <div className="range__head rv">
          <div>
            <h2 className="h2" id="range-h">
              The curl range
            </h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Leave-in creams and treatments that soften, moisturise and define.
            </p>
          </div>
          <Link {...collLink("curl-care")} className="frame-btn" data-cta="shop-curl-care">
            Shop curl care
          </Link>
        </div>
        <div className="bento">
          {RANGE.map((r) => {
            const p = productByKey(r.key);
            return p ? <ProductCell key={r.key} p={p} span={r.span} jar={r.jar} /> : null;
          })}
        </div>
      </div>
    </section>
  );
}

/** 5. Made for barbers: off-grid editorial with an oversized hairline star. */
export function Barbers() {
  return (
    <section className="barbers" id="barbers" aria-labelledby="barbers-h">
      <Star className="barbers__star" outline />
      <div className="wrap barbers__grid">
        <figure className="barbers__photo rv">
          <img
            src="/assets/lifestyle/barber-counter.webp"
            width={1600}
            height={1067}
            alt="Magic Cosmetics Curl Cream and Curl Therapy bottles on a barber's counter"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="barbers__copy rv">
          <p className="eyebrow">For barbers</p>
          <h2 className="h2" id="barbers-h">
            Made for barbers.
          </h2>
          <p className="lede">Trusted by barbers and founded in the UK. What your barber uses is what you can take home.</p>
          <p className="gift">
            <b>Free Styling Powder 20g</b>
            <span>Have a barber code? Enter it at checkout and a free Styling Powder 20g is added to your order.</span>
          </p>
          <div>
            <a className="frame-btn" href={`mailto:${BRAND.email}?subject=Barber%20code`} data-cta="barber-code">
              Ask for a barber code
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 6. Routine: the HowTo in three steps. */
export function Routine() {
  const hero = productByKey("curl-cream-pump-200ml");
  return (
    <section className="routine" aria-labelledby="routine-h">
      <div className="wrap routine__grid">
        <div className="rv">
          <h2 className="h2" id="routine-h">
            Define curls in three steps.
          </h2>
          <ol className="routine__list">
            {ROUTINE.map((s) => (
              <li key={s.t}>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link {...guideLink("how-to-define-curls")} className="read-link">
            Read the full routine
          </Link>
        </div>
        <div className="routine__visual rv">{hero ? <ProductImg p={hero} size="lg" /> : null}</div>
      </div>
    </section>
  );
}

/** Guide cards: one lead and the rest side by side. Used on the home page and the guides index. */
export function GuideCards({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className="journal__grid">
      {GUIDES.map((g, i) => {
        const art = g.products.map((k) => productByKey(k)).find((p) => p?.hasImage);
        return (
          <Link key={g.slug} {...guideLink(g.slug)} className={`post ${i === 0 ? "post--lead" : "post--side"}${art ? " post--art" : ""}`}>
            <span className="post__meta">
              <span>{g.kicker}</span>
              <span>{g.readMins} min read</span>
            </span>
            <span>
              <H>{g.title}</H>
              <p style={{ marginTop: "0.9rem" }}>{g.description}</p>
            </span>
            {art ? (
              <span aria-hidden="true">
                <img className="post__art" src={pimg(art.key, "sm").src} width={pimg(art.key, "sm").width} height={pimg(art.key, "sm").height} alt="" loading="lazy" decoding="async" />
              </span>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}

/** 7. Journal: the guides. */
export function Journal() {
  return (
    <section className="journal" aria-labelledby="journal-h">
      <div className="wrap">
        <div className="rv">
          <h2 className="h2" id="journal-h">
            Straight answers on curls and style.
          </h2>
        </div>
        <GuideCards />
      </div>
    </section>
  );
}

/** 8. FAQ: accordion, mirrored by FAQPage JSON-LD on the route. */
export function Faq({ faqs = HOME_FAQS, title = "Questions, answered." }: { faqs?: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="faq" aria-labelledby="faq-h">
      <div className="wrap faq__grid">
        <div className="rv">
          <h2 className="h2" id="faq-h">
            {title}
          </h2>
          <p className="lede" style={{ marginTop: "1rem" }}>
            Cannot find it? Email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
          </p>
        </div>
        <div className="faq__list rv">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                <h3>{f.q}</h3>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
