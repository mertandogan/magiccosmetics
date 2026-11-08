import { createFileRoute, notFound } from "@tanstack/react-router";

import { BRAND, FREE_DELIVERY_OVER } from "@/site/data";
import { breadcrumbLd, orgLd, pageHead } from "@/site/seo";
import { Crumbs, Shell } from "@/site/shell";

type Page = { title: string; description: string; h1: string; lede: string; body: { h: string; p: string[] }[] };

/** Only pages whose content is fully known. Privacy, terms and returns follow once company details and policies are confirmed. */
const PAGES: Record<string, Page> = {
  about: {
    title: "About Magic Cosmetics | UK Men's Grooming Brand",
    description: "Magic Cosmetics is a UK men's grooming brand with curl creams, curl treatments and hair styling powders, trusted by barbers and sold direct.",
    h1: "About Magic Cosmetics",
    lede: "Magic Cosmetics is a UK men's grooming brand. Our range is curl creams, curl treatments and hair styling powders, sold direct to you.",
    body: [
      { h: "The range", p: ["Our curl care is built around leave-in creams and treatments that soften, moisturise and define curls. Our hair styling powders add instant volume, texture and a matte finish.", "Magic Cosmetics was founded in the UK and sells direct. Shop now takes you to our secure checkout, where you see current prices, stock and delivery options before you pay."] },
      { h: "For barbers", p: ["Barbers trust Magic Cosmetics. If you have a barber code, enter it at checkout and a free Styling Powder 20g is added to your order."] },
      { h: "Where to find us", p: [`${BRAND.name}, ${BRAND.street}, ${BRAND.locality} ${BRAND.postcode}. Email ${BRAND.email}.`] },
    ],
  },
  delivery: {
    title: "UK Delivery | Magic Cosmetics",
    description: `Magic Cosmetics delivers across the UK. Free standard delivery on orders over £${FREE_DELIVERY_OVER}. Options and times are shown at checkout.`,
    h1: "UK delivery",
    lede: "We deliver across the UK.",
    body: [
      { h: "Delivery", p: [`Free standard delivery on orders over £${FREE_DELIVERY_OVER}. Delivery options, times and prices are shown at checkout before you pay.`, "We currently deliver within the United Kingdom only."] },
      { h: "Questions about an order", p: [`Email ${BRAND.email} with your order number and we will help.`] },
    ],
  },
  contact: {
    title: "Contact Magic Cosmetics",
    description: "Contact Magic Cosmetics by email or post. Ask about orders, products or a barber code.",
    h1: "Contact us",
    lede: "Questions about an order, a product or a barber code? Email us and we will reply.",
    body: [
      { h: "Email", p: [BRAND.email] },
      { h: "Post", p: [`${BRAND.name}, ${BRAND.street}, ${BRAND.locality} ${BRAND.postcode}`] },
      { h: "Barber codes", p: ["Barbers can ask for a code that adds a free Styling Powder 20g at checkout. Email us with the name of your barbershop."] },
    ],
  },
};

export const Route = createFileRoute("/pages/$slug")({
  loader: ({ params }) => {
    if (!PAGES[params.slug]) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const pg = PAGES[params.slug];
    if (!pg) return {};
    return pageHead({
      title: pg.title,
      description: pg.description,
      path: `/pages/${params.slug}`,
      ld: [
        orgLd(),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: pg.h1, path: `/pages/${params.slug}` },
        ]),
      ],
    });
  },
  component: InfoPage,
});

function InfoPage() {
  const { slug } = Route.useParams();
  const pg = PAGES[slug];
  return (
    <Shell>
      <section className="page">
        <div className="article">
          <Crumbs
            items={[
              { name: "Home", href: "/" },
              { name: pg.h1, href: `/pages/${slug}` },
            ]}
          />
          <h1>{pg.h1}</h1>
          <p className="answer">{pg.lede}</p>
          {pg.body.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </Shell>
  );
}
