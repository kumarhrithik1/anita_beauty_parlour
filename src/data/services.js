const u = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const CATEGORIES = [
  { slug: "makeup", name: "Makeup", icon: "💄", intro: "Bridal, HD, party and traditional Indian looks that last through the whole event.",
    image: u("photo-1487412720507-e7ab37603c6f"),
    items: [
      { name: "Bridal makeup", note: "Trial included on request", image: u("photo-1487412720507-e7ab37603c6f") },
      { name: "HD makeup", note: "Camera-ready, light finish", image: u("photo-1522335789203-aabd1fc54bc9") },
      { name: "Party & Occasion", note: "Soft glam to full glam", image: u("photo-1487412912498-0447578fcca8") },
      { name: "Traditional Indian", note: "Festive and ceremony looks", image: u("photo-1524250502761-1ac6f2e30d43") },
    ] },
  { slug: "mehndi", name: "Mehndi", icon: "🌿", intro: "Bridal, Arabic, Rajasthani and minimal designs drawn by hand.",
    image: u("photo-1603899122634-f086ca5f5ddd"),
    items: [
      { name: "Bridal Mehndi", note: "Full hands and feet", image: u("photo-1603899122634-f086ca5f5ddd") },
      { name: "Arabic Mehndi", note: "Flowing florals, open space", image: u("photo-1594736797933-d0f06ba6d5a8") },
      { name: "Rajasthani / Traditional", note: "Dense, heritage patterns", image: u("photo-1582552938357-32b906df40cb") },
      { name: "Minimal & Indo-Arabic", note: "Quick and contemporary", image: u("photo-1599643478518-a784e5dc4c8f") },
    ] },
  { slug: "skin-care", name: "Skin Care", icon: "✨", intro: "Facials, cleanups, glow care and bridal skin preparation.",
    image: u("photo-1570172619644-dfd03ed5d881"),
    items: [
      { name: "Signature facial", note: "Deep cleanse and glow", image: u("photo-1570172619644-dfd03ed5d881") },
      { name: "Cleanup", note: "Quick refresh", image: u("photo-1556228578-0d85b1a4d571") },
      { name: "Bridal skin prep", note: "Plan starts 4 weeks before", image: u("photo-1515377905703-c4788e51af15") },
      { name: "Glow treatment", note: "Before events", image: u("photo-1598440947619-2c35fc9aa908") },
    ] },
  { slug: "nail-art", name: "Nail Art", icon: "💅", intro: "Bridal nails, gel nails, French nails and custom designs.",
    image: u("photo-1604654894610-df63bc536371"),
    items: [
      { name: "Bridal nails", note: "Matched to your outfit", image: u("photo-1604654894610-df63bc536371") },
      { name: "Gel nails", note: "Glossy, long-lasting", image: u("photo-1610992015732-2449b76344bc") },
      { name: "Custom nail art", note: "Bring a reference photo", image: u("photo-1632345031435-8727f6897d53") },
      { name: "French nails", note: "Clean and classic", image: u("photo-1604654894610-df63bc536371") },
    ] },
  { slug: "hair-care", name: "Hair Care", icon: "💇‍♀️", intro: "Haircuts, styling, spa, bridal hairstyles and colour.",
    image: u("photo-1522337360788-8b13dee7a37e"),
    items: [
      { name: "Haircut & Styling", note: "Cut shaped to your face", image: u("photo-1562322140-8baeececf3df") },
      { name: "Hair spa", note: "Repair and shine", image: u("photo-1521590832167-7bcbfaa6381f") },
      { name: "Bridal hairstyling", note: "Updos, braids, buns", image: u("photo-1522337360788-8b13dee7a37e") },
      { name: "Hair colouring", note: "Global colour and highlights", image: u("photo-1492707892479-7bc8d5a4ee93") },
    ] },
];

export const HERO_SLIDES = [
  { image: u("photo-1519741497674-611481863552", 1800), title: "Look Beautiful", accent: "Feel Confident",
    text: "Professional Makeup, Mehndi & Beauty Services for Every Occasion" },
  { image: u("photo-1603899122634-f086ca5f5ddd", 1800), title: "Artistry in Every Detail", accent: "Mehndi That Tells Your Story",
    text: "Bridal, Arabic, Traditional and contemporary mehndi designs" },
  { image: u("photo-1487412720507-e7ab37603c6f", 1800), title: "Your Beauty", accent: "Our Expertise",
    text: "Makeup, skin care, nails and hair care — all under one roof" },
];
export const HERO_IMAGES = HERO_SLIDES.map((s) => s.image);

export const ABOUT_IMAGE = u("photo-1560066984-138dadb4c035", 1200);

export const TESTIMONIALS = [
  { quote: "My bridal makeup stayed perfect from the pheras to the reception.", who: "Bride, December wedding" },
  { quote: "The mehndi was finished in under three hours and every detail was sharp.", who: "Sangeet client" },
  { quote: "I came for a facial and now book hair spa here every month.", who: "Regular client" },
];
