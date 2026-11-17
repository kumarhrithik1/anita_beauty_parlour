const u = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const CATEGORIES = [
  { slug: "makeup", name: "Makeup", intro: "Bridal, HD, party and traditional looks that last through the whole event.",
    image: u("photo-1487412720507-e7ab37603c6f"),
    items: [
      { name: "Bridal makeup", note: "Trial included on request" },
      { name: "HD makeup", note: "Camera-ready, light finish" },
      { name: "Party and occasion", note: "Soft glam to full glam" },
      { name: "Traditional Indian", note: "Festive and ceremony looks" },
    ] },
  { slug: "mehndi", name: "Mehndi", intro: "Bridal, Arabic, Rajasthani and minimal designs drawn by hand.",
    image: u("photo-1603899122634-f086ca5f5ddd"),
    items: [
      { name: "Bridal mehndi", note: "Full hands and feet" },
      { name: "Arabic mehndi", note: "Flowing florals, open space" },
      { name: "Rajasthani", note: "Dense, heritage patterns" },
      { name: "Minimal and Indo-Arabic", note: "Quick and contemporary" },
    ] },
  { slug: "skin-care", name: "Skin care", intro: "Facials, cleanups and bridal skin preparation.",
    image: u("photo-1570172619644-dfd03ed5d881"),
    items: [
      { name: "Signature facial", note: "Deep cleanse and glow" },
      { name: "Cleanup", note: "Quick refresh" },
      { name: "Bridal skin prep", note: "Plan starts 4 weeks before" },
      { name: "Glow treatment", note: "Before events" },
    ] },
  { slug: "nail-art", name: "Nail art", intro: "Bridal sets, gel nails, French tips and custom designs.",
    image: u("photo-1604654894610-df63bc536371"),
    items: [
      { name: "Bridal nails", note: "Matched to your outfit" },
      { name: "Gel nails", note: "Glossy, long-lasting" },
      { name: "Custom nail art", note: "Bring a reference photo" },
      { name: "French nails", note: "Clean and classic" },
    ] },
  { slug: "hair-care", name: "Hair care", intro: "Cuts, styling, spa, bridal hairstyles and colour.",
    image: u("photo-1522337360788-8b13dee7a37e"),
    items: [
      { name: "Haircut and styling", note: "Cut shaped to your face" },
      { name: "Hair spa", note: "Repair and shine" },
      { name: "Bridal hairstyling", note: "Updos, braids, buns" },
      { name: "Hair colouring", note: "Global colour and highlights" },
    ] },
];

export const HERO_IMAGES = [
  u("photo-1519741497674-611481863552", 800),
  u("photo-1603899122634-f086ca5f5ddd", 800),
];

export const TESTIMONIALS = [
  { quote: "My bridal makeup stayed perfect from the pheras to the reception.", who: "Bride, December wedding" },
  { quote: "The mehndi was finished in under three hours and every detail was sharp.", who: "Sangeet client" },
  { quote: "I came for a facial and now book hair spa here every month.", who: "Regular client" },
];
