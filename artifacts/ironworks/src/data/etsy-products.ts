export interface EtsyProduct {
  id: string;
  title: string;
  image: string;
  priceLabel: string;
  etsyUrl: string;
  description: string;
  badge?: string;
  details?: string[];
}

// Etsy listing URLs — replace each etsyUrl with the exact listing URL from your
// Etsy shop manager (etsy.com/your/shops/dandsironworks/tools/listings).
// Until then, each URL searches within the D&S Iron Works shop for that item.
export const defaultEtsyProducts: EtsyProduct[] = [
  {
    id: 'spiral-pendant-tree',
    title: 'Hand Forged Iron Spiral Pendant, Viking Celtic Necklace',
    image: '/products/spiral-pendant-tree.jpg',
    priceLabel: '$31.00',
    etsyUrl: 'https://www.etsy.com/listing/627508461/iron-spiral-pendant-blacksmith-pendent',
    description: 'A hand-hammered iron spiral — a timeless symbol carried on a cord. Raw texture, ancient form.',
    badge: 'In 20+ carts',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Handmade by D&S Iron Works'],
  },
  {
    id: 'copper-nail-earrings',
    title: 'Copper Horseshoe Nail Heart Earrings, Western Jewelry',
    image: '/products/copper-nail-earrings.jpg',
    priceLabel: '$20.00',
    etsyUrl: 'https://www.etsy.com/listing/650206861/copper-horseshoe-nail-heart-earrings',
    description: 'Repurposed horseshoe nails reshaped into copper drop earrings. Western heritage meets wearable craft.',
    badge: 'Only 10 left',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Handmade by D&S Iron Works'],
  },
  {
    id: 'horse-hoof-pick',
    title: 'Hand Forged Horse Head Hoof Pick, Recycled Horseshoe Tack',
    image: '/products/horse-hoof-pick.jpg',
    priceLabel: '$35.00',
    etsyUrl: 'https://www.etsy.com/listing/1821788700/hand-forged-horse-head-hoof-pick',
    description: 'A functional hoof pick with a hand-forged horse head handle — crafted from recycled horseshoe steel.',
    badge: 'Low in stock',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Materials: Steel, Iron, Nail', 'Handmade by D&S Iron Works'],
  },
  {
    id: 'copper-heart-earrings',
    title: 'Handmade Copper Horseshoe Nail Heart Earrings, Western Jewelry',
    image: '/products/copper-heart-earrings.jpg',
    priceLabel: '$28.00',
    etsyUrl: 'https://www.etsy.com/listing/655540098/horseshoe-nail-earrings',
    description: 'Hand-bent copper horseshoe nails formed into open hearts. Simple, warm, and entirely handmade.',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Handmade by D&S Iron Works'],
  },
  {
    id: 'eagle-pendant',
    title: 'Hand-Forged Eagle Pendant Necklace',
    image: '/products/eagle-pendant.jpg',
    priceLabel: '$51.00',
    etsyUrl: 'https://www.etsy.com/listing/4434853010/hand-forged-eagle-pendant-necklace',
    description: 'A bold geometric eagle struck from iron — embodying strength, honor, and courage. Choose your cord color.',
    badge: 'In 9 carts',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Cord color options available', 'Handmade by D&S Iron Works'],
  },
  {
    id: 'dinner-bell',
    title: 'Hand Forged Dinner Bell',
    image: '/products/dinner-bell.jpg',
    priceLabel: '$105.00',
    etsyUrl: 'https://www.etsy.com/listing/1004904260/hand-forged-dinner-bell',
    description: 'An heirloom-quality iron dinner bell, hand-forged to ring across the yard and last generations.',
    badge: 'Only 6 left',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Materials: Iron, forged', 'Approx. 13" × 13"', 'Handmade by D&S Iron Works'],
  },
  {
    id: 'cross-copper-wire',
    title: 'Horseshoe Nail Celtic Cross Pendant, Copper Wire Wrapped',
    image: '/products/cross-copper-wire.jpg',
    priceLabel: '$47.00',
    etsyUrl: 'https://www.etsy.com/listing/636937321/horseshoe-nail-celtic-cross-pendant',
    description: 'A horseshoe nail Celtic cross wound with copper wire — faith and craft merged into one piece.',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Materials: Copper, Steel', 'Pendant: 1" W × 2.5" H', 'Necklace length: 28"', 'Handmade by D&S Iron Works'],
  },
  {
    id: 'horseshoe-heart-pendant',
    title: 'Handmade Horseshoe Nail Heart Pendant, Western Necklace',
    image: '/products/horseshoe-heart-pendant.jpg',
    priceLabel: '$15.00',
    etsyUrl: 'https://www.etsy.com/listing/618040108/handmade-horseshoe-nail-heart-pendant',
    description: 'A heart shaped from a single horseshoe nail. Wearable Western art at an accessible price.',
    badge: 'Low in stock',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Handmade by D&S Iron Works'],
  },
  {
    id: 'spiral-pendant-drift',
    title: 'Hand-Forged Iron Spiral Pendant — Strength & Resilience',
    image: '/products/spiral-pendant-drift.jpg',
    priceLabel: '$31.00',
    etsyUrl: 'https://www.etsy.com/listing/4495599182/iron-spiral-pendant',
    description: "A symbol of life's journey hand-hammered in iron. Heavy, grounded, and built to last.",
    badge: 'In 19 carts',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Handmade by D&S Iron Works'],
  },
  {
    id: 'large-celtic-cross',
    title: 'Large Celtic Cross Pendant, Handmade with Religious Significance',
    image: '/products/large-celtic-cross.jpg',
    priceLabel: '$58.00',
    etsyUrl: 'https://www.etsy.com/listing/1819455542/handmade-horseshoe-nail-celtic-cross',
    description: 'A large, statement Celtic cross wound with wire — powerful presence, deep meaning.',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Materials: Copper, Steel', 'Necklace color options available', 'Handmade by D&S Iron Works'],
  },
  {
    id: 'rustic-copper-cross',
    title: 'Handmade Horseshoe Nail Celtic Cross Pendant, Rustic Copper Wire',
    image: '/products/rustic-copper-cross.jpg',
    priceLabel: '$58.00',
    etsyUrl: 'https://www.etsy.com/listing/4301105309/horseshoe-nail-cross-pendant-rustic',
    description: 'Hand-hammered nail cross wrapped in rustic copper wire. Recycled steel with sustainable character.',
    badge: 'In 5 carts',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Materials: Copper, Steel', 'Recycled & upcycled metal', 'Handmade by D&S Iron Works'],
  },
  {
    id: 'leaf-pendant',
    title: 'Hand Forged Iron Leaf Pendant',
    image: '/products/leaf-pendant.jpg',
    priceLabel: '$31.00',
    etsyUrl: 'https://www.etsy.com/listing/725546331/hand-forged-iron-leaf-pendant',
    description: 'A delicate iron leaf with hammered veining — nature rendered in forge-work on a leather cord.',
    badge: 'Only 6 left',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Handmade by D&S Iron Works'],
  },
  {
    id: 'iron-heart-pendant',
    title: 'Hand Forged Iron Heart Pendant, Viking Celtic Necklace',
    image: '/products/iron-heart-pendant.jpg',
    priceLabel: '$31.00',
    etsyUrl: 'https://www.etsy.com/listing/613599966/iron-heart-pendant-blacksmith-pendent',
    description: 'A flowing Viking-style heart forged from iron bar — bold, asymmetric, and unmistakably handmade.',
    details: ['Ships from Utah', 'Returns & exchanges accepted', 'Handmade by D&S Iron Works'],
  },
];
