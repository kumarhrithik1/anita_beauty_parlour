import settings from "./settings.json";
import photo from "../data/photos/2.jpg";
import mehendi from "../data/photos/3.jpg";
import makeup from "../data/photos/4.jpeg";

const u = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
// JSON may hold either an Unsplash photo id or a full image URL.
const img = (v, w) => (!v ? "" : /^https?:/.test(v) ? v : u(v, w));

// Every JSON file in ./catalog becomes a category automatically.
const files = import.meta.glob("./catalog/*.json", { eager: true });

export const CATEGORIES = Object.values(files)
  .map((m) => m.default)
  .filter((c) => c.active !== false)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
  .map((c) => ({
    ...c,
    image: img(c.image),
    types: (c.types || [])
      .filter((t) => t.active !== false)
      .map((t) => ({
        ...t,
        image: img(t.image || c.image),
        options: (t.options || []).filter((o) => o.active !== false),
      })),
  }));

/* ---------- Pricing helpers (the only place prices are formatted) ---------- */
export const formatPrice = (n) =>
  new Intl.NumberFormat(settings.locale, { style: "currency", currency: settings.currency, maximumFractionDigits: 0 }).format(n);

export const priceOf = (o) => (o.priceMax && o.priceMax > o.price ? `${formatPrice(o.price)} – ${formatPrice(o.priceMax)}` : formatPrice(o.price));

const minOf = (list) => (list.length ? Math.min(...list.map((o) => o.price)) : null);
export const typeMinPrice = (t) => minOf(t.options);
export const categoryMinPrice = (c) => minOf(c.types.flatMap((t) => t.options));
export const fromPrice = (n) => (n == null ? "" : `${settings.fromLabel} ${formatPrice(n)}`);
export const PRICE_DISCLAIMER = settings.disclaimer;

/* ---------- Lookups ---------- */
export const findCategory = (key) => {
  const k = String(key || "").toLowerCase();
  return CATEGORIES.find((c) => c.slug === k || c.name.toLowerCase() === k) || null;
};
export const findType = (c, id) => c?.types.find((t) => t.id === id) || null;
export const findOption = (t, id) => t?.options.find((o) => o.id === id) || null;
export const bookUrl = (c, t, o) =>
  `/contact?service=${c.slug}${t ? `&type=${t.id}` : ""}${o ? `&option=${o.id}` : ""}`;

/* ---------- Static site content ---------- */
export const HERO_SLIDES = [
  { image: photo, title: "Look Beautiful", accent: "Feel Confident",
    text: "Professional Makeup, Mehndi & Beauty Services for Every Occasion" },
  { image: mehendi, title: "Artistry in Every Detail", accent: "Mehndi That Tells Your Story",
    text: "Bridal, Arabic, Traditional and contemporary mehndi designs" },
  { image: makeup, title: "Your Beauty", accent: "Our Expertise",
    text: "Makeup, skin care, nails and hair care — all under one roof" },
];
export const HERO_IMAGES = HERO_SLIDES.map((s) => s.image);

export const ABOUT_IMAGE = u("photo-1560066984-138dadb4c035", 1200);

export const TESTIMONIALS = [
  { quote: "My bridal makeup stayed perfect from the pheras to the reception.", who: "Bride, December wedding" },
  { quote: "The mehndi was finished in under three hours and every detail was sharp.", who: "Sangeet client" },
  { quote: "I came for a facial and now book hair spa here every month.", who: "Regular client" },
];