import type { Faq } from "./data";

export type GuideSection = { h: string; p?: string[]; ol?: string[]; ul?: string[] };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  published: string;
  updated: string;
  readMins: number;
  answer: string;
  sections: GuideSection[];
  products: string[];
  faqs: Faq[];
  related: string[];
  /** Section heading whose ordered list is the HowTo schema. */
  howToSection?: string;
};

export const GUIDES: Guide[] = [
  {
    slug: "how-to-define-curls",
    title: "How to define curls: a step-by-step routine for men",
    description: "Learn how to define curls in six steps: wash, detangle, apply curl cream to wet hair, scrunch and leave to dry. A simple routine for men.",
    kicker: "Curl care",
    published: "2026-11-08",
    updated: "2026-11-08",
    readMins: 4,
    answer: "To define curls, apply a leave-in curl cream to soaking wet hair, scrunch upwards and leave your hair to dry without touching it. Start with a small amount and add more only if your curls still feel dry.",
    sections: [
      { h: "What you need", ul: ["A gentle shampoo and a conditioner", "A wide-tooth comb or your fingers", "A leave-in curl cream", "A cotton t-shirt or microfibre towel", "A diffuser, if you like"] },
      {
        h: "The routine",
        ol: [
          "Wash only as often as you need to. Most curly hair copes well with a few washes a week, and a gentle shampoo helps avoid stripping moisture.",
          "Condition and detangle. Work conditioner through from the mid-lengths to the ends and detangle gently with your fingers or a wide-tooth comb while it is still in.",
          "Rinse, then squeeze out water. Use a cotton t-shirt or microfibre towel instead of rubbing with a rough towel.",
          "Apply curl cream to wet hair. Work a small amount through each section, then scrunch upwards towards the scalp so curls clump together.",
          "Leave it alone. Air dry or diffuse on a low heat. Touching or brushing curls while they dry breaks up the curl clumps and causes frizz.",
          "Scrunch out any stiffness. Once your hair is completely dry, scrunch gently to soften the curls.",
        ],
      },
      { h: "Which curl cream to use", p: ["Curl Cream is a lightweight leave-in for every day. Avocado Oil Curl Cream is creamier, so it suits thirstier curls. For tired or frizz-prone curls, add a Curl Therapy treatment with keratin or protein."] },
      { h: "Common mistakes", ul: ["Using too much product. Start small and add more only if you need it.", "Applying to dry, tangled hair. Define curls while they are wet.", "Rubbing hair with a towel.", "Touching curls while they dry."] },
      { h: "Refreshing curls on day two", p: ["Dampen your hair with a little water, scrunch in a small amount of curl cream and let it dry. You do not need to wash your hair every day."] },
    ],
    products: ["curl-cream-pump-200ml", "avocado-oil-curl-cream-250ml", "curl-therapy-keratin-200ml"],
    faqs: [
      { q: "How much curl cream should I use?", a: "Start with a small amount, about the size of a 20p coin for short hair or one pump from a pump bottle, and add more only if your curls still feel dry." },
      { q: "Can I define curls on dry hair?", a: "It works best on wet hair, but you can refresh dry curls by lightly dampening them first and scrunching in a little curl cream." },
      { q: "How long do curls take to dry?", a: "It depends on the length and thickness of your hair. Air drying can take a few hours, and a diffuser on a low heat speeds it up." },
      { q: "Is curl cream only for very curly hair?", a: "No. Wavy hair can benefit from curl cream too. Use a light hand and see how your waves respond." },
    ],
    related: ["why-is-my-curly-hair-frizzy", "how-to-use-hair-styling-powder"],
    howToSection: "The routine",
  },
  {
    slug: "why-is-my-curly-hair-frizzy",
    title: "Why is my curly hair frizzy? 7 causes and fixes",
    description: "Frizzy curls usually come down to dryness, rough towelling, humidity or heat. Here are 7 common causes and simple fixes for softer, smoother curls.",
    kicker: "Curl care",
    published: "2026-11-08",
    updated: "2026-11-08",
    readMins: 4,
    answer: "Curly hair gets frizzy when it loses moisture and the outer layer of each strand lifts, so curl clumps break apart. The most common causes are dryness, rough drying, humidity, heat, over-washing, brushing dry curls and products that do not suit your hair.",
    sections: [
      {
        h: "7 causes of frizzy curls and how to fix them",
        ol: [
          "Dryness. Curly hair is naturally drier because scalp oils travel slowly down a curl. Use a leave-in curl cream after every wash and add a Curl Therapy treatment when your hair feels tired.",
          "Rough towel drying. Rubbing with a terry towel roughens the surface of the hair. Squeeze water out with a cotton t-shirt or microfibre towel instead.",
          "Brushing dry curls. A brush breaks up curl clumps. Detangle when your hair is wet and full of conditioner, using your fingers or a wide-tooth comb.",
          "Washing too often or too harshly. Wash only as often as you need to and choose a gentle shampoo.",
          "Heat. Hot dryers and straighteners dry hair out. Air dry or use a diffuser on a low heat.",
          "Humidity. Damp air makes dry hair swell and frizz. Seal moisture in with a leave-in cream while your hair is wet, and avoid touching curls as they dry.",
          "The wrong products. Heavy or drying products can weigh curls down or leave them rough. Choose a lightweight leave-in and use a small amount.",
        ],
      },
      { h: "Where to start", p: ["If you only change one thing, apply curl cream to wet hair and leave your curls alone while they dry. Curl Cream is a lightweight everyday option, Avocado Oil Curl Cream suits thirstier curls, and Curl Therapy Keratin or Protein is a treatment for tired, frizz-prone curls."] },
    ],
    products: ["curl-cream-pump-200ml", "avocado-oil-curl-cream-pump-200ml", "curl-therapy-protein-200ml"],
    faqs: [
      { q: "Is frizz a sign of damage?", a: "Not always. Frizz often means hair is dry or was disturbed while drying. If your hair also feels rough, breaks easily or has lost its curl, it may be damaged, and a hairdresser can advise." },
      { q: "Does curl cream stop frizz completely?", a: "No product removes frizz entirely, especially in humid weather. A leave-in curl cream helps soften curls and control frizz when you use it on wet hair." },
      { q: "Should I use keratin or protein?", a: "Most curls need a balance of care. Curl Therapy comes in Keratin and Protein, so you can try one and see how your curls respond." },
    ],
    related: ["how-to-define-curls", "how-to-use-hair-styling-powder"],
  },
  {
    slug: "how-to-use-hair-styling-powder",
    title: "How to use hair styling powder (and which one to pick)",
    description: "How to use hair styling powder for instant volume and a matte finish, plus how to choose between GUM 01, BERRY 02 and MELON 03.",
    kicker: "Styling powder",
    published: "2026-11-08",
    updated: "2026-11-08",
    readMins: 3,
    answer: "Shake a small amount of styling powder onto dry hair, work it in at the roots with your fingertips and style as normal. Build up gradually: a little adds lift and a matte texture, and more adds stronger hold.",
    sections: [
      {
        h: "How to apply styling powder",
        ol: [
          "Start with dry hair. Powder grips best when hair is fully dry.",
          "Shake a small amount into your palm or straight onto the roots. A little goes a long way.",
          "Rub your fingertips through the roots to work the powder in and lift the hair.",
          "Style as normal with your fingers or a comb.",
          "Add more in small amounts until you reach the hold you want.",
        ],
      },
      { h: "Which powder to pick", ul: ["GUM 01: strong hold, volume and texture.", "BERRY 02: flexible hold, so you can restyle through the day.", "MELON 03: a natural hold for a lighter look."], p: ["All three are matte, lightweight 20g powders."] },
      { h: "Tips for the best result", ul: ["Apply to the roots rather than the lengths for lift.", "Shake into your palm first to avoid a cloud of powder.", "Use a small amount on fine hair. More is not always better.", "Wash it out with shampoo."] },
      { h: "Styling powder, wax or clay?", p: ["Powder is the lightest of the three and is a good choice when you want volume and a natural, matte look. Wax and clay add more weight and shape."] },
    ],
    products: ["hair-styling-powder-gum-01", "hair-styling-powder-berry-02", "hair-styling-powder-melon-03"],
    faqs: [
      { q: "Does styling powder wash out?", a: "Yes. Wash it out with your normal shampoo." },
      { q: "Can I use styling powder on wet hair?", a: "It works best on dry hair. Wet hair clumps the powder and reduces the lift." },
      { q: "Is styling powder suitable for fine hair?", a: "Yes. It is designed to add volume and texture, which many people with fine or flat hair look for. Use a small amount and build up." },
      { q: "How much should I use?", a: "Start with a small amount and add more gradually. Too much can leave hair feeling stiff." },
    ],
    related: ["how-to-define-curls", "why-is-my-curly-hair-frizzy"],
    howToSection: "How to apply styling powder",
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
