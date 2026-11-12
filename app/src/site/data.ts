import manifest from "./products-manifest.json";

export const SITE_URL = "https://magiccosmetics.co.uk";
/**
 * Flip to true when the new Shopify store at shop.magiccosmetics.co.uk is live and its product handles match our keys.
 * Until then Shop now, Add to bag and the newsletter form use the current store, so the shared preview has no dead buttons.
 * At launch magiccosmetics.co.uk is served by this site, so this MUST be true before the domain moves.
 */
export const CHECKOUT_LIVE = false;
export const SHOP_URL = CHECKOUT_LIVE ? "https://shop.magiccosmetics.co.uk" : "https://magiccosmetics.co.uk";
export const SHOP_HOST = SHOP_URL.replace("https://", "");
/** Handles on the current store (several do not match their titles there, so these are mapped by title). */
const CURRENT_STORE_PRODUCTS: Record<string, string> = {
  "curl-cream-200ml": "magic-cosmetics-curl-cream-200ml",
  "curl-cream-pump-200ml": "magic-cosmetics-curl-cream-200ml-copy",
  "curl-cream-pump-400ml": "magic-cosmetics-curl-cream-pump-400ml",
  "avocado-oil-curl-cream-250ml": "magic-cosmetics-avocado-oil-curl-cream-250ml",
  "avocado-oil-curl-cream-pump-200ml": "magic-cosmetics-avocado-oil-curl-cream-pump-400ml-copy",
  "avocado-oil-curl-cream-pump-400ml": "magic-cosmetics-avocado-oil-curl-cream-pump-200ml",
  "curl-therapy-keratin-200ml": "magic-cosmetics-curl-therapy-keratin-200ml",
  "curl-therapy-protein-200ml": "magic-cosmetics-curl-therapy-keratin-200ml-copy",
  "hair-styling-powder-gum-01": "magic-cosmetics-hair-styling-powder-20g-gum-01",
  "hair-styling-powder-berry-02": "magic-cosmetics-hair-styling-powder-20g-berry-02",
  "hair-styling-powder-melon-03": "magic-cosmetics-hair-styling-powder-20g-melon-03",
};
const CURRENT_STORE_COLLECTIONS: Record<string, string> = { "curl-care": "curl-care-treatment", "styling-powder": "powder-wax" };
/** Only the production domain may be indexed; any other host (preview, workers.dev) gets noindex and a blocking robots.txt. */
export const isProductionHost = (host: string) => ["magiccosmetics.co.uk", "www.magiccosmetics.co.uk"].includes(host.toLowerCase().split(":")[0]);
/** Browser chrome colour (stage black from the design brief). */
export const THEME_COLOR = "#0a0b09";
export const BRAND = {
  name: "Magic Cosmetics",
  email: "info@magiccosmetics.co.uk",
  street: "85 Great Portland Street, 1st Floor",
  locality: "London",
  postcode: "W1W 7LT",
};
/** Policy value taken from the strategy doc; confirm before launch. */
export const FREE_DELIVERY_OVER = 30;

type Dim = { w: number; h: number; kb: number };
const M = manifest as Record<string, { lg: Dim; sm: Dim }>;

export function pimg(key: string, size: "lg" | "sm" = "sm") {
  const m = M[key][size];
  return { src: `/assets/products/${key}-${size}.webp`, width: m.w, height: m.h };
}

export type Faq = { q: string; a: string };

export type Product = {
  key: string;
  name: string;
  size: string;
  line: "Curl Cream" | "Avocado Oil Curl Cream" | "Curl Therapy" | "Hair Styling Powder";
  collection: "curl-care" | "styling-powder";
  pack: "Flip-cap bottle" | "Pump bottle" | "Jar" | "Shaker";
  price: number;
  short: string;
  benefits: string[];
  how: string[];
  suitable: string;
  faqs: Faq[];
  guides: string[];
  /** Set false until the real packshot / label art is available. */
  hasImage: boolean;
  hold?: { label: string; level: 1 | 2 | 3 | 4 | 5 };
};

const CURL_HOW = [
  "Start with clean, damp hair and detangle gently.",
  "Work a small amount through each section from the mid-lengths to the ends.",
  "Scrunch upwards, then air dry or diffuse on a low heat without touching.",
  "Add a little more next time only if your curls still feel dry.",
];

const CURL_FAQ: Faq[] = [
  { q: "Can I use it every day?", a: "Yes. It is a leave-in product, so use a small amount after washing or to refresh damp curls on non-wash days." },
  { q: "Will it make my curls crunchy?", a: "A small amount applied to damp hair and left to dry untouched should leave curls soft. Scrunch out any stiffness once your hair is fully dry." },
];

export const PRODUCTS: Product[] = [
  {
    key: "curl-cream-200ml", name: "Curl Cream", size: "200ml", line: "Curl Cream", collection: "curl-care", pack: "Flip-cap bottle", price: 12.99,
    short: "A lightweight leave-in cream that softens, moisturises and defines curls without weighing them down.",
    benefits: ["Softens and moisturises", "Defines curl pattern", "Helps control frizz", "For all curl types"],
    how: CURL_HOW, suitable: "Curly and wavy hair, all curl types.", faqs: CURL_FAQ,
    guides: ["how-to-define-curls", "why-is-my-curly-hair-frizzy"], hasImage: true,
  },
  {
    key: "curl-cream-pump-200ml", name: "Curl Cream Pump", size: "200ml", line: "Curl Cream", collection: "curl-care", pack: "Pump bottle", price: 12.99,
    short: "The same lightweight leave-in curl cream in a pump bottle for quick, even application.",
    benefits: ["Softens and moisturises", "Defines curl pattern", "Easy pump application", "For all curl types"],
    how: CURL_HOW, suitable: "Curly and wavy hair, all curl types.", faqs: CURL_FAQ,
    guides: ["how-to-define-curls", "why-is-my-curly-hair-frizzy"], hasImage: true,
  },
  {
    key: "curl-cream-pump-400ml", name: "Curl Cream Pump", size: "400ml", line: "Curl Cream", collection: "curl-care", pack: "Pump bottle", price: 19.99,
    short: "The larger pump bottle of our lightweight leave-in curl cream, made for regular and salon use.",
    benefits: ["Softens and moisturises", "Defines curl pattern", "Larger 400ml pump", "For all curl types"],
    how: CURL_HOW, suitable: "Curly and wavy hair, all curl types.", faqs: CURL_FAQ,
    guides: ["how-to-define-curls", "why-is-my-curly-hair-frizzy"], hasImage: true,
  },
  {
    key: "avocado-oil-curl-cream-250ml", name: "Avocado Oil Curl Cream", size: "250ml", line: "Avocado Oil Curl Cream", collection: "curl-care", pack: "Jar", price: 14.99,
    short: "A creamy leave-in enriched with avocado oil that softens, moisturises and defines curly or wavy hair.",
    benefits: ["Enriched with avocado oil", "Softens and moisturises", "Defines curls and waves", "For all curl types"],
    how: CURL_HOW, suitable: "Dry or thirsty curls and waves.", faqs: CURL_FAQ,
    guides: ["how-to-define-curls", "why-is-my-curly-hair-frizzy"], hasImage: true,
  },
  {
    key: "avocado-oil-curl-cream-pump-200ml", name: "Avocado Oil Curl Cream Pump", size: "200ml", line: "Avocado Oil Curl Cream", collection: "curl-care", pack: "Pump bottle", price: 12.99,
    short: "Avocado oil curl cream in a pump bottle that softens, moisturises and defines curls.",
    benefits: ["Enriched with avocado oil", "Softens and moisturises", "Defines curls and waves", "Easy pump application"],
    how: CURL_HOW, suitable: "Dry or thirsty curls and waves.", faqs: CURL_FAQ,
    guides: ["how-to-define-curls", "why-is-my-curly-hair-frizzy"], hasImage: true,
  },
  {
    key: "avocado-oil-curl-cream-pump-400ml", name: "Avocado Oil Curl Cream Pump", size: "400ml", line: "Avocado Oil Curl Cream", collection: "curl-care", pack: "Pump bottle", price: 19.99,
    short: "The same avocado oil curl cream in a larger 400ml pump bottle, made for regular and salon use.",
    benefits: ["Enriched with avocado oil", "Softens and moisturises", "Defines curls and waves", "Larger 400ml pump"],
    how: CURL_HOW, suitable: "Dry or thirsty curls and waves.", faqs: CURL_FAQ,
    guides: ["how-to-define-curls", "why-is-my-curly-hair-frizzy"], hasImage: true,
  },
  {
    key: "curl-therapy-keratin-200ml", name: "Curl Therapy Keratin", size: "200ml", line: "Curl Therapy", collection: "curl-care", pack: "Pump bottle", price: 12.99,
    short: "A keratin-enriched curl treatment that hydrates, repairs and defines tired, frizz-prone curls.",
    benefits: ["Hydrates", "Repairs", "Defines curls", "Lightweight formula"],
    how: [
      "Start with clean, damp hair.",
      "Smooth a small amount through your curls from mid-lengths to ends.",
      "Leave in and style as normal, or scrunch and air dry.",
      "Use it as often as your curls need it.",
    ],
    suitable: "Curls that feel dry, tired or frizz-prone.", faqs: [
      { q: "Keratin or protein: which should I choose?", a: "Both are curl treatments with the same hydrate, repair and define promise. Choose the one that suits your hair best and read our guide to protein and moisture to compare." },
      { q: "Is it a rinse-out or a leave-in?", a: "It is a lightweight leave-in treatment. Apply a small amount to damp hair and style as normal." },
    ],
    guides: ["why-is-my-curly-hair-frizzy", "how-to-define-curls"], hasImage: true,
  },
  {
    key: "curl-therapy-protein-200ml", name: "Curl Therapy Protein", size: "200ml", line: "Curl Therapy", collection: "curl-care", pack: "Pump bottle", price: 12.99,
    short: "A protein-enriched curl treatment that hydrates, repairs and defines tired, frizz-prone curls.",
    benefits: ["Hydrates", "Repairs", "Defines curls", "Lightweight formula"],
    how: [
      "Start with clean, damp hair.",
      "Smooth a small amount through your curls from mid-lengths to ends.",
      "Leave in and style as normal, or scrunch and air dry.",
      "Use it as often as your curls need it.",
    ],
    suitable: "Curls that feel dry, tired or frizz-prone.", faqs: [
      { q: "Keratin or protein: which should I choose?", a: "Both are curl treatments with the same hydrate, repair and define promise. Choose the one that suits your hair best and read our guide to protein and moisture to compare." },
      { q: "Is it a rinse-out or a leave-in?", a: "It is a lightweight leave-in treatment. Apply a small amount to damp hair and style as normal." },
    ],
    guides: ["why-is-my-curly-hair-frizzy", "how-to-define-curls"], hasImage: true,
  },
  ...(
    [
      { key: "hair-styling-powder-gum-01", shade: "GUM 01", hold: "Strong hold", level: 5 as const, short: "A lightweight styling powder for strong hold, volume and texture with a matte finish." },
      { key: "hair-styling-powder-berry-02", shade: "BERRY 02", hold: "Flexible hold", level: 3 as const, short: "A lightweight styling powder for flexible hold, volume and texture with a matte finish." },
      { key: "hair-styling-powder-melon-03", shade: "MELON 03", hold: "Natural hold", level: 2 as const, short: "A lightweight styling powder for a natural hold, volume and texture with a matte finish." },
    ] satisfies { key: string; shade: string; hold: string; level: 1 | 2 | 3 | 4 | 5; short: string }[]
  ).map<Product>((s) => ({
    key: s.key, name: `Hair Styling Powder ${s.shade}`, size: "20g", line: "Hair Styling Powder", collection: "styling-powder", pack: "Shaker", price: 9.99,
    short: s.short,
    benefits: [s.hold, "Instant volume and texture", "Matte finish", "Lightweight 20g shaker"],
    how: [
      "Start with dry hair.",
      "Shake a small amount onto your fingertips or at the roots.",
      "Work it through and style as normal.",
      "Build up gradually until you reach the hold you want.",
    ],
    suitable: "Fine, flat or low-volume hair, and anyone who wants a matte, textured finish.",
    faqs: [
      { q: "Does styling powder wash out?", a: "Yes. Wash it out with your normal shampoo." },
      { q: "Which shade has the strongest hold?", a: "GUM 01 is the strong-hold shade, BERRY 02 is flexible and MELON 03 is a natural hold. All three have a matte finish." },
    ],
    guides: ["how-to-use-hair-styling-powder", "how-to-define-curls"], hasImage: false, hold: { label: s.hold, level: s.level },
  })),
];

export const COLLECTIONS: Record<string, { title: string; h1: string; description: string; intro: string; guides: string[] }> = {
  "curl-care": {
    title: "Curl Care: Curl Creams and Curl Therapy | Magic Cosmetics",
    h1: "Curl care",
    description: "Leave-in curl creams and keratin or protein curl treatments from Magic Cosmetics. Soften, moisturise and define curls. UK delivery.",
    intro: "Leave-in curl creams and curl treatments that soften, moisturise and define, made for every curl type. Pick a lightweight Curl Cream for every day, Avocado Oil Curl Cream for thirstier curls, or a Curl Therapy treatment for tired, frizz-prone hair.",
    guides: ["how-to-define-curls", "why-is-my-curly-hair-frizzy"],
  },
  "styling-powder": {
    title: "Hair Styling Powder: Matte Volume Powder 20g | Magic Cosmetics",
    h1: "Hair styling powder",
    description: "Lightweight matte hair styling powder in GUM 01, BERRY 02 and MELON 03. Instant volume, texture and hold. 20g. UK delivery.",
    intro: "A lightweight styling powder for instant volume, texture and a matte finish. Choose strong hold with GUM 01, flexible hold with BERRY 02 or a natural hold with MELON 03.",
    guides: ["how-to-use-hair-styling-powder"],
  },
};

export function productsIn(collection: string) {
  return PRODUCTS.filter((p) => p.collection === collection);
}
export const productByKey = (key: string) => PRODUCTS.find((p) => p.key === key);
export const money = (n: number) => `£${n.toFixed(2)}`;
export const shopUrl = (p: Product) => {
  if (CHECKOUT_LIVE) return `${SHOP_URL}/products/${p.key}`;
  const handle = CURRENT_STORE_PRODUCTS[p.key];
  return handle ? `${SHOP_URL}/products/${handle}` : SHOP_URL;
};
export const shopCollectionUrl = (handle: string) =>
  CHECKOUT_LIVE ? `${SHOP_URL}/collections/${handle}` : `${SHOP_URL}/collections/${CURRENT_STORE_COLLECTIONS[handle] ?? "all"}`;
export const productTitle = (p: Product) => `${p.name} ${p.size}`;

export const FINDER = [
  { key: "frizz", word: "Frizz", line: "Dry, rough or puffy curls that will not settle.", products: ["curl-cream-pump-200ml", "avocado-oil-curl-cream-pump-200ml"], guide: "why-is-my-curly-hair-frizzy", guideLabel: "Why is my curly hair frizzy?" },
  { key: "definition", word: "No definition", line: "Curls that fall flat or clump into a shapeless puff.", products: ["curl-cream-pump-400ml", "curl-cream-200ml"], guide: "how-to-define-curls", guideLabel: "How to define curls" },
  { key: "dry", word: "Dry or tired", line: "Curls that feel thirsty, rough or worn out.", products: ["curl-therapy-keratin-200ml", "curl-therapy-protein-200ml"], guide: "why-is-my-curly-hair-frizzy", guideLabel: "Dryness and frizz fixes" },
  { key: "flat", word: "Flat and limp", line: "Fine hair with no lift at the roots.", products: ["hair-styling-powder-gum-01", "hair-styling-powder-melon-03"], guide: "how-to-use-hair-styling-powder", guideLabel: "How to use styling powder" },
  { key: "hold", word: "Will not hold", line: "A style that drops after an hour.", products: ["hair-styling-powder-gum-01", "hair-styling-powder-berry-02"], guide: "how-to-use-hair-styling-powder", guideLabel: "Which powder to pick" },
];

export const ROUTINE = [
  { t: "Wash gently, condition well", d: "Detangle with your fingers or a wide-tooth comb while the conditioner is still in." },
  { t: "Apply to soaking wet hair", d: "Work curl cream through each section, then scrunch upwards so curls clump together." },
  { t: "Leave it alone to dry", d: "Air dry or diffuse on a low heat. Touching curls while they dry is what causes frizz." },
];

export const HOME_FAQS: Faq[] = [
  { q: "What is Magic Cosmetics?", a: "Magic Cosmetics is a UK men's grooming brand, founded in the United Kingdom and trusted by barbers. It sells curl creams, curl treatments and hair styling powders direct to customers." },
  { q: "Which curl cream should I choose?", a: "Curl Cream is the lightweight everyday leave-in. Avocado Oil Curl Cream is creamier and suits thirstier curls. Curl Therapy Keratin and Protein are treatments for tired, frizz-prone curls." },
  { q: "How do I use hair styling powder?", a: "Apply it to dry hair, shake a small amount onto your fingertips or at the roots, work it through and style as normal. Build up gradually for more hold." },
  { q: "What is the difference between GUM 01, BERRY 02 and MELON 03?", a: "All three are matte 20g styling powders. GUM 01 gives strong hold, BERRY 02 gives flexible hold and MELON 03 gives a natural hold." },
  { q: "Do you deliver across the UK?", a: `Yes. We deliver within the UK, with free standard delivery on orders over £${FREE_DELIVERY_OVER}. Delivery options and times are shown at checkout.` },
  { q: "Where do I check out?", a: `Shop now takes you to our secure Shopify checkout at ${SHOP_HOST}, where you see current prices, stock and delivery options before you pay.` },
  { q: "Can barbers get a free Styling Powder?", a: "Yes. Enter your barber code at checkout and a free Styling Powder 20g is added to your order." },
];
