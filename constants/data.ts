export const SITE = {
  name: "LUMINA",
  tagline: "Where Light Meets Hair",
  craftLine: "Modern Luxury. Indian Soul.",
  provenance: "Crafted in India",
  description:
    "A unisex luxury hair atelier rooted in India — crafting cinematic transformations with precision, hospitality, and quiet craftsmanship.",
  email: "info@lumina.salon",
  phone: "+91 22 4890 2148",
  phoneHref: "tel:+912248902148",
  address: "Level 3, One International Center, Senapati Bapat Marg, Mumbai 400013",
  mapEmbed:
    "https://maps.google.com/maps?q=One%20International%20Center%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapLink:
    "https://maps.google.com/?q=One+International+Center+Senapati+Bapat+Marg+Mumbai",
  hours: "Mon–Sat 10am–9pm · Sun 11am–7pm",
  hoursDetailed: [
    { day: "Monday – Friday", time: "10:00 AM – 9:00 PM" },
    { day: "Saturday", time: "10:00 AM – 9:00 PM" },
    { day: "Sunday", time: "11:00 AM – 7:00 PM" },
  ],
  social: {
    instagram: "https://instagram.com/lumina.salon",
    facebook: "https://facebook.com/lumina.salon",
    twitter: "https://x.com/lumina_salon",
  },
  url: "https://lumina.salon",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "Team", href: "/team" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  explore: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Pricing", href: "/pricing" },
    { label: "Team", href: "/team" },
  ],
  company: [
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Book Appointment", href: "/book" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;

export const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
] as const;

export type GalleryCategory =
  | "all"
  | "hair"
  | "color"
  | "spa"
  | "bridal"
  | "treatment";

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hair", label: "Hair" },
  { id: "color", label: "Color" },
  { id: "spa", label: "Spa" },
  { id: "bridal", label: "Bridal" },
  { id: "treatment", label: "Treatment" },
];

export const SERVICES = [
  {
    slug: "hair-cut",
    title: "Hair Cut",
    shortTitle: "Cut",
    description:
      "Precision cuts tailored to your face shape, lifestyle, and personal style — refined to feel effortless every day.",
    longDescription:
      "At Lumina, a haircut is architecture. We study bone structure, growth patterns, and how you move through your week, then sculpt a silhouette that feels inevitable. Every cut includes a consultation, precision shampoo ritual, and finishing style.",
    price: "From $65",
    priceFrom: 65,
    duration: "45–75 min",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=85",
    icon: "Scissors",
    benefits: [
      "Face-shape analysis and style consultation",
      "Precision cut with scissors and texturizing",
      "Luxury wash and scalp massage",
      "Blow-dry finish with product education",
    ],
    process: [
      { step: "01", title: "Consult", text: "We listen, observe, and align on the look you want to live in." },
      { step: "02", title: "Sculpt", text: "Section-by-section precision cutting with weight and movement in mind." },
      { step: "03", title: "Refine", text: "Dry detailing and texturizing for a polished, natural fall." },
      { step: "04", title: "Style", text: "A finish tailored to your routine, plus take-home guidance." },
    ],
    pricingOptions: [
      { name: "Signature Cut", price: "$65", note: "Wash, cut & style" },
      { name: "Restyle Cut", price: "$85", note: "Significant length or shape change" },
      { name: "Cut + Treatment", price: "$120", note: "Add deep conditioning" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80",
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=900&q=80",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&q=80",
    ],
    faqs: [
      {
        question: "How often should I get a haircut?",
        answer:
          "Most clients return every 6–8 weeks to maintain shape. Shorter styles may benefit from every 4–5 weeks.",
      },
      {
        question: "Do you cut all hair textures?",
        answer:
          "Yes. Our stylists are trained across straight, wavy, curly, and coily textures.",
      },
    ],
  },
  {
    slug: "hair-color",
    title: "Hair Color",
    shortTitle: "Color",
    description:
      "Custom color artistry from lived-in tones to bold transformations, formulated for lasting luminosity.",
    longDescription:
      "Color at Lumina is never one-size-fits-all. Our master colorists blend custom formulas for your undertone, history, and desired dimension — whether that’s a soft glaze, dimensional balayage, or a full transformation.",
    price: "From $145",
    priceFrom: 145,
    duration: "90–180 min",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&q=85",
    icon: "Palette",
    benefits: [
      "Custom formulation matched to your undertone",
      "Bond-building treatments during color",
      "Dimensional techniques for natural movement",
      "Gloss finish for glass-like shine",
    ],
    process: [
      { step: "01", title: "Diagnosis", text: "We review your color history, porosity, and goals." },
      { step: "02", title: "Formulate", text: "Custom blends crafted for your canvas." },
      { step: "03", title: "Apply", text: "Precise application with bond care throughout." },
      { step: "04", title: "Reveal", text: "Tone, gloss, and style for the final cinematic finish." },
    ],
    pricingOptions: [
      { name: "Root Touch-Up", price: "$145", note: "Regrowth coverage" },
      { name: "Full Color", price: "$185", note: "Single-process all over" },
      { name: "Balayage / Highlights", price: "$250+", note: "Dimensional artistry" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=900&q=80",
    ],
    faqs: [
      {
        question: "How long does color last?",
        answer:
          "Most color services remain vibrant 4–8 weeks with proper aftercare. We recommend a gloss refresh between full appointments.",
      },
      {
        question: "Can you correct previous color?",
        answer:
          "Yes. Color corrections require a consultation so we can plan a safe, staged approach.",
      },
    ],
  },
  {
    slug: "hair-spa",
    title: "Hair Spa",
    shortTitle: "Spa",
    description:
      "Deep nourishing rituals that restore shine, softness, and scalp balance.",
    longDescription:
      "Our spa rituals combine botanical oils, steam, and scalp massage to revive depleted hair. Ideal before events, after travel, or as a monthly reset for lasting health and luminosity.",
    price: "From $95",
    priceFrom: 95,
    duration: "60–90 min",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85",
    icon: "Sparkles",
    benefits: [
      "Deep hydration and protein balance",
      "Scalp detox and circulation massage",
      "Steam infusion for deeper absorption",
      "Visible shine and softness after one visit",
    ],
    process: [
      { step: "01", title: "Assess", text: "Scalp and strand analysis to choose the right ritual." },
      { step: "02", title: "Cleanse", text: "Gentle detox wash and aromatic oils." },
      { step: "03", title: "Infuse", text: "Treatment mask with steam and massage." },
      { step: "04", title: "Seal", text: "Cool rinse, serum seal, and soft finish." },
    ],
    pricingOptions: [
      { name: "Signature Spa", price: "$95", note: "60-minute ritual" },
      { name: "Intense Repair Spa", price: "$135", note: "Bond + moisture dual therapy" },
      { name: "Spa + Style", price: "$155", note: "Includes blowout finish" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80",
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=900&q=80",
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=900&q=80",
    ],
    faqs: [
      {
        question: "How often should I book a spa?",
        answer:
          "Monthly is ideal for most hair types. Color-treated or heat-styled hair may benefit every 3–4 weeks.",
      },
    ],
  },
  {
    slug: "hair-treatment",
    title: "Hair Treatment",
    shortTitle: "Treatment",
    description:
      "Reparative therapies for damaged, dull, or stressed hair — clinically thoughtful, sensorially luxurious.",
    longDescription:
      "From Olaplex bond rebuilding to custom protein-moisture balancing, our treatments restore integrity without weighing hair down. Every protocol is chosen after a strand assessment.",
    price: "From $110",
    priceFrom: 110,
    duration: "45–75 min",
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200&q=85",
    icon: "Heart",
    benefits: [
      "Rebuilds broken bonds and elasticity",
      "Reduces breakage and split ends",
      "Improves manageability and shine",
      "Pairs beautifully with color services",
    ],
    process: [
      { step: "01", title: "Diagnose", text: "Porosity and damage mapping." },
      { step: "02", title: "Treat", text: "Targeted bond or moisture protocol." },
      { step: "03", title: "Activate", text: "Timed processing for maximum repair." },
      { step: "04", title: "Protect", text: "Sealants and heat-protect finish." },
    ],
    pricingOptions: [
      { name: "Bond Repair", price: "$110", note: "Olaplex-style ritual" },
      { name: "Protein Balance", price: "$125", note: "Strength + softness" },
      { name: "Treatment Add-On", price: "$55", note: "Add to any service" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=900&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=900&q=80",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&q=80",
    ],
    faqs: [
      {
        question: "Can treatments be added to color?",
        answer:
          "Absolutely — and we often recommend it. Bond care during color dramatically improves longevity and hair health.",
      },
    ],
  },
  {
    slug: "hair-smoothening",
    title: "Hair Smoothening",
    shortTitle: "Smooth",
    description:
      "Silky, frizz-free finishes that last for months with controlled softness and movement.",
    longDescription:
      "Our smoothening services tame frizz while preserving natural movement. We customize intensity based on your texture and lifestyle — never a rigid, over-processed look.",
    price: "From $180",
    priceFrom: 180,
    duration: "2–3.5 hrs",
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1200&q=85",
    icon: "Wind",
    benefits: [
      "Frizz control for 3–5 months",
      "Reduced styling time daily",
      "Soft, natural movement retained",
      "Customized intensity for your texture",
    ],
    process: [
      { step: "01", title: "Consult", text: "Texture goals and maintenance plan." },
      { step: "02", title: "Prep", text: "Clarify and section for even processing." },
      { step: "03", title: "Smooth", text: "Formula application and sealing." },
      { step: "04", title: "Finish", text: "Blowout reveal and aftercare kit." },
    ],
    pricingOptions: [
      { name: "Express Smooth", price: "$180", note: "Shorter hair" },
      { name: "Signature Smooth", price: "$240", note: "Medium length" },
      { name: "Long Smooth", price: "$320", note: "Long / dense hair" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80",
    ],
    faqs: [
      {
        question: "How long until I can wash my hair?",
        answer:
          "We typically recommend waiting 48–72 hours before the first wash. We’ll give you precise aftercare for your formula.",
      },
    ],
  },
  {
    slug: "keratin",
    title: "Keratin Treatment",
    shortTitle: "Keratin",
    description:
      "Luxury keratin infusion for glass-like smoothness, strength, and lasting shine.",
    longDescription:
      "Our keratin rituals rebuild the hair’s outer layer with premium formulations. Expect silkier strands, reduced frizz, and luminous shine that photographs beautifully.",
    price: "From $220",
    priceFrom: 220,
    duration: "2.5–4 hrs",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1200&q=85",
    icon: "Gem",
    benefits: [
      "Glass-like shine and softness",
      "Strengthens weakened strands",
      "Humidity resistance for months",
      "Premium, salon-grade formulas only",
    ],
    process: [
      { step: "01", title: "Clarify", text: "Deep cleanse to open the cuticle." },
      { step: "02", title: "Infuse", text: "Keratin applied section by section." },
      { step: "03", title: "Seal", text: "Heat sealing for lasting results." },
      { step: "04", title: "Reveal", text: "Cool, style, and aftercare briefing." },
    ],
    pricingOptions: [
      { name: "Express Keratin", price: "$220", note: "Shorter hair" },
      { name: "Signature Keratin", price: "$295", note: "Medium length" },
      { name: "Long Keratin", price: "$380", note: "Long / dense hair" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=900&q=80",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&q=80",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&q=80",
    ],
    faqs: [
      {
        question: "Is keratin safe for color-treated hair?",
        answer:
          "Yes. We select formulas compatible with color and often schedule keratin after color has settled for best results.",
      },
    ],
  },
  {
    slug: "beard-styling",
    title: "Beard Styling",
    shortTitle: "Beard",
    description:
      "Sculpted beard designs with hot towel ritual and premium grooming finishes.",
    longDescription:
      "From clean lines to full sculpting, our grooming experts shape facial hair with precision. Expect hot towels, blade work where appropriate, and oils that leave skin calm and beard refined.",
    price: "From $40",
    priceFrom: 40,
    duration: "30–45 min",
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200&q=85",
    icon: "User",
    benefits: [
      "Precision line-up and sculpting",
      "Hot towel and skin prep",
      "Premium oils and balms",
      "Shape advice for face structure",
    ],
    process: [
      { step: "01", title: "Shape Map", text: "Discuss density, growth, and preferred silhouette." },
      { step: "02", title: "Sculpt", text: "Clipper and scissor work for clean architecture." },
      { step: "03", title: "Detail", text: "Edges refined; skin soothed." },
      { step: "04", title: "Finish", text: "Oil, balm, and maintenance tips." },
    ],
    pricingOptions: [
      { name: "Beard Trim", price: "$40", note: "Shape & tidy" },
      { name: "Beard Sculpt", price: "$55", note: "Full design + hot towel" },
      { name: "Cut + Beard", price: "$95", note: "Haircut with beard styling" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=900&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&q=80",
    ],
    faqs: [
      {
        question: "Can I combine beard styling with a haircut?",
        answer:
          "Yes — our Cut + Beard package is one of our most requested men’s grooming experiences.",
      },
    ],
  },
  {
    slug: "bridal-package",
    title: "Bridal Package",
    shortTitle: "Bridal",
    description:
      "Bespoke bridal looks crafted for your most important day — trials included.",
    longDescription:
      "From engagement shoots to the aisle, our bridal atelier designs looks that hold under light, movement, and emotion. Packages include trials, day-of styling, and optional on-location teams.",
    price: "From $320",
    priceFrom: 320,
    duration: "Custom",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85",
    icon: "Crown",
    benefits: [
      "Personalized bridal consultation",
      "Full trial session included",
      "Day-of styling with longevity focus",
      "Optional party and on-location add-ons",
    ],
    process: [
      { step: "01", title: "Vision", text: "Moodboards, dress neckline, and venue lighting review." },
      { step: "02", title: "Trial", text: "Full rehearsal of hair (and optional makeup partners)." },
      { step: "03", title: "Refine", text: "Adjustments based on photos and comfort." },
      { step: "04", title: "Day Of", text: "Calm, precise styling with touch-up kit." },
    ],
    pricingOptions: [
      { name: "Bridal Hair", price: "$320", note: "Trial + wedding day" },
      { name: "Bridal Party", price: "$95/pp", note: "Per additional guest" },
      { name: "On-Location", price: "+$150", note: "Travel within Manhattan" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&q=80",
    ],
    faqs: [
      {
        question: "When should I book my bridal trial?",
        answer:
          "We recommend booking 6–12 months ahead for peak wedding season, with the trial 4–8 weeks before the wedding.",
      },
    ],
  },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export const WHY_CHOOSE = [
  {
    value: 15,
    suffix: "+",
    label: "Years of Excellence",
    description: "Crafting timeless looks since 2010.",
  },
  {
    value: 12,
    suffix: "k+",
    label: "Happy Clients",
    description: "Trusted across India and beyond.",
  },
  {
    value: 18,
    suffix: "",
    label: "Expert Stylists",
    description: "Artists trained in global craft.",
  },
  {
    value: 100,
    suffix: "%",
    label: "Premium Products",
    description: "Only the finest formulations.",
  },
] as const;

export const TEAM = [
  {
    id: "ananya-rao",
    name: "Ananya Rao",
    role: "Creative Director",
    experience: "14 years",
    specialization: "Precision cutting, editorial styling",
    bio: "Ananya shaped Lumina’s creative language — architectural cuts with soft, wearable movement, informed by years between Mumbai, London, and Paris.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85",
    social: {
      instagram: "https://instagram.com/ananya.rao.hair",
      facebook: "https://facebook.com/lumina.salon",
    },
  },
  {
    id: "rohan-kapoor",
    name: "Rohan Kapoor",
    role: "Master Colorist",
    experience: "11 years",
    specialization: "Balayage, corrective color, lived-in tones",
    bio: "Rohan builds color like light — dimensional, flattering, and designed to grow out gracefully. Clients travel for his corrective expertise.",
    image:
      "https://images.unsplash.com/photo-1615109398623-88346a601842?w=800&q=85",
    social: {
      instagram: "https://instagram.com/rohan.kapoor.color",
      facebook: "https://facebook.com/lumina.salon",
    },
  },
  {
    id: "meher-banerjee",
    name: "Meher Banerjee",
    role: "Bridal Specialist",
    experience: "9 years",
    specialization: "Bridal, updos, ceremonial styling",
    bio: "Meher designs bridal looks that photograph beautifully and feel secure from pheras to last dance — modern, personal, never costume.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=85",
    social: {
      instagram: "https://instagram.com/meher.banerjee.bridal",
      facebook: "https://facebook.com/lumina.salon",
    },
  },
  {
    id: "kabir-singh",
    name: "Kabir Singh",
    role: "Grooming Expert",
    experience: "10 years",
    specialization: "Men’s cuts, beard sculpting, texture",
    bio: "Kabir brings quiet precision to men’s grooming — clean architecture, refined beards, and effortless finishes for the modern wardrobe.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=85",
    social: {
      instagram: "https://instagram.com/kabir.singh.groom",
      facebook: "https://facebook.com/lumina.salon",
    },
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Amelia Hart",
    role: "Fashion Editor",
    quote:
      "An extraordinary experience. The attention to detail and artistry transformed not just my hair, but how I feel walking into a room.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    hasVideo: true,
  },
  {
    name: "Arjun Malhotra",
    role: "Creative Director",
    quote:
      "Lumina is in a league of its own. Every visit feels like a private ritual of luxury and precision — hospitality that feels distinctly Indian, craft that feels global.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    hasVideo: false,
  },
  {
    name: "Priya Sharma",
    role: "Entrepreneur",
    quote:
      "From the moment you walk in, you know you’re somewhere special. My bridal look was absolute perfection.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    rating: 5,
    hasVideo: true,
  },
  {
    name: "Lucas Moreau",
    role: "Architect",
    quote:
      "They understand modern elegance. Clean cuts, refined finishes — consistently outstanding.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    hasVideo: false,
  },
  {
    name: "Neha Iyer",
    role: "Product Designer",
    quote:
      "Rohan corrected years of uneven color in one thoughtful session. My hair has never felt healthier.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
    rating: 5,
    hasVideo: false,
  },
] as const;

export const GALLERY = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80",
    alt: "Precision cut in Lumina atelier",
    category: "hair" as GalleryCategory,
    span: "tall" as const,
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80",
    alt: "Spa ritual and soft styling",
    category: "spa" as GalleryCategory,
    span: "wide" as const,
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&q=80",
    alt: "Dimensional color transformation",
    category: "color" as GalleryCategory,
    span: "normal" as const,
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=900&q=80",
    alt: "Luxury wash station",
    category: "spa" as GalleryCategory,
    span: "normal" as const,
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&q=80",
    alt: "Smooth, luminous finish",
    category: "hair" as GalleryCategory,
    span: "tall" as const,
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=900&q=80",
    alt: "Deep treatment ritual",
    category: "treatment" as GalleryCategory,
    span: "wide" as const,
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=900&q=80",
    alt: "Salon atmosphere and light",
    category: "hair" as GalleryCategory,
    span: "normal" as const,
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",
    alt: "Bridal styling session",
    category: "bridal" as GalleryCategory,
    span: "normal" as const,
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=80",
    alt: "Soft glam bridal waves",
    category: "bridal" as GalleryCategory,
    span: "tall" as const,
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80",
    alt: "Color gloss and shine",
    category: "color" as GalleryCategory,
    span: "normal" as const,
  },
  {
    id: "g11",
    src: "https://images.unsplash.com/photo-1595475884565-27535accd42c?w=900&q=80",
    alt: "Keratin smooth result",
    category: "treatment" as GalleryCategory,
    span: "wide" as const,
  },
  {
    id: "g12",
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&q=80",
    alt: "Editorial blowout finish",
    category: "hair" as GalleryCategory,
    span: "normal" as const,
  },
] as const;

export const PRICING = [
  {
    name: "Standard",
    price: 85,
    description: "Refined everyday grooming for the modern individual.",
    features: [
      "Signature Haircut",
      "Wash & Style",
      "Scalp Consultation",
      "Finishing Products",
      "Style guidance",
    ],
    missing: ["Color services", "VIP suite", "Priority booking"],
    featured: false,
  },
  {
    name: "Premium",
    price: 185,
    description: "Our most requested luxury experience.",
    features: [
      "Precision Cut & Style",
      "Deep Conditioning Spa",
      "Color Touch-up or Gloss",
      "Premium Product Kit",
      "Complimentary Refreshment",
      "Priority booking window",
    ],
    missing: ["VIP private suite"],
    featured: true,
  },
  {
    name: "Luxury",
    price: 350,
    description: "The ultimate Lumina ritual for complete transformation.",
    features: [
      "Full Color Transformation",
      "Keratin or Smoothening",
      "Scalp Therapy Ritual",
      "VIP Private Suite",
      "Aftercare Concierge",
      "Priority Booking",
      "Complimentary product set",
    ],
    missing: [],
    featured: false,
  },
] as const;

export const PRICING_COMPARISON = [
  { feature: "Signature Cut & Style", standard: true, premium: true, luxury: true },
  { feature: "Deep Conditioning Spa", standard: false, premium: true, luxury: true },
  { feature: "Color / Gloss Service", standard: false, premium: true, luxury: true },
  { feature: "Keratin or Smoothening", standard: false, premium: false, luxury: true },
  { feature: "VIP Private Suite", standard: false, premium: false, luxury: true },
  { feature: "Priority Booking", standard: false, premium: true, luxury: true },
  { feature: "Aftercare Concierge", standard: false, premium: false, luxury: true },
  { feature: "Product Kit Included", standard: false, premium: true, luxury: true },
] as const;

export const FAQ = [
  {
    question: "Do I need to book an appointment in advance?",
    answer:
      "We highly recommend booking ahead to secure your preferred stylist and time. Walk-ins are welcome based on availability, but appointments guarantee the full Lumina experience.",
    category: "Booking",
  },
  {
    question: "What products do you use?",
    answer:
      "We exclusively use premium, cruelty-free formulations from leading luxury houses — including Olaplex, Kérastase, Oribe, and custom in-house blends.",
    category: "Products",
  },
  {
    question: "Is Lumina truly unisex?",
    answer:
      "Absolutely. Our space, services, and stylists are designed for everyone. We celebrate individuality across all genders, textures, and styles.",
    category: "About",
  },
  {
    question: "How long does a typical appointment take?",
    answer:
      "A signature cut takes 45–75 minutes. Color and treatments range from 90 minutes to 3.5 hours depending on complexity. We’ll confirm timing when you book.",
    category: "Services",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Please cancel or reschedule at least 24 hours in advance. Late cancellations may incur a 50% fee to respect our stylists’ time.",
    category: "Booking",
  },
  {
    question: "Do you offer bridal packages?",
    answer:
      "Yes. Our bridal atelier includes trials, day-of styling, and optional on-location teams. Inquire via booking for custom packages.",
    category: "Services",
  },
  {
    question: "Where are you located and is there parking?",
    answer:
      "We’re at One International Center on Senapati Bapat Marg, Mumbai. Valet and basement parking are available for guests with confirmed appointments.",
    category: "Location",
  },
  {
    question: "Can I request a specific stylist?",
    answer:
      "Yes — select your preferred stylist when booking. If they’re unavailable, we’ll suggest a close match or offer the next open date.",
    category: "Booking",
  },
] as const;

export const BEFORE_AFTER = {
  /** Single source — before/after differ by grade, not subject */
  src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=85",
  alt: "Lumina hair transformation — before and after grade",
} as const;

export const MARQUEE_WORDS = [
  "CUT",
  "COLOR",
  "CARE",
  "CRAFT",
  "LUXURY",
  "HERITAGE",
  "LIGHT",
  "ARTISTRY",
] as const;
