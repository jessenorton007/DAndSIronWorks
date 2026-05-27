import spiralPendantTree from '@assets/image_1779911795544.png';
import copperNailEarrings from '@assets/image_1779911827950.png';
import horseHoofPick from '@assets/image_1779911852727.png';
import copperHeartEarrings from '@assets/image_1779911975872.png';
import eaglePendant from '@assets/image_1779912002321.png';
import dinnerBell from '@assets/image_1779912036477.png';
import crossCopperWire from '@assets/image_1779912061951.png';
import horseshoeHeartPendant from '@assets/image_1779912089004.png';
import spiralPendantDrift from '@assets/image_1779912145966.png';
import largeCelticCross from '@assets/image_1779912185439.png';
import rusticCopperCross from '@assets/image_1779912372888.png';
import leafPendant from '@assets/image_1779912465467.png';
import ironHeartPendant from '@assets/image_1779912497159.png';

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

export const defaultEtsyProducts: EtsyProduct[] = [
  {
    id: 'spiral-pendant-tree',
    title: 'Hand Forged Iron Spiral Pendant, Viking Celtic Necklace',
    image: spiralPendantTree,
    priceLabel: '$31.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: 'A hand-hammered iron spiral — a timeless symbol carried on a cord. Raw texture, ancient form.',
    badge: 'In 20+ carts',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Handmade by D&S Iron Works',
    ],
  },
  {
    id: 'copper-nail-earrings',
    title: 'Copper Horseshoe Nail Heart Earrings, Western Jewelry',
    image: copperNailEarrings,
    priceLabel: '$20.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: 'Repurposed horseshoe nails reshaped into copper drop earrings. Western heritage meets wearable craft.',
    badge: 'Only 10 left',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Handmade by D&S Iron Works',
    ],
  },
  {
    id: 'horse-hoof-pick',
    title: 'Hand Forged Horse Head Hoof Pick, Recycled Horseshoe Tack',
    image: horseHoofPick,
    priceLabel: '$35.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: 'A functional hoof pick with a hand-forged horse head handle — crafted from recycled horseshoe steel.',
    badge: 'Low in stock',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Materials: Steel, Iron, Nail',
      'Handmade by D&S Iron Works',
    ],
  },
  {
    id: 'copper-heart-earrings',
    title: 'Handmade Copper Horseshoe Nail Heart Earrings, Western Jewelry',
    image: copperHeartEarrings,
    priceLabel: '$25.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: 'Hand-bent copper horseshoe nails formed into open hearts. Simple, warm, and entirely handmade.',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Handmade by D&S Iron Works',
    ],
  },
  {
    id: 'eagle-pendant',
    title: 'Hand-Forged Eagle Pendant Necklace',
    image: eaglePendant,
    priceLabel: '$51.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: 'A bold geometric eagle struck from iron — embodying strength, honor, and courage. Choose your cord color.',
    badge: 'In 9 carts',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Cord color options available',
      'Handmade by D&S Iron Works',
    ],
  },
  {
    id: 'dinner-bell',
    title: 'Hand Forged Dinner Bell',
    image: dinnerBell,
    priceLabel: '$105.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: 'An heirloom-quality iron dinner bell, hand-forged to ring across the yard and last generations.',
    badge: 'Only 6 left',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Materials: Iron, forged',
      'Approx. 13" × 13"',
      'Handmade by D&S Iron Works',
    ],
  },
  {
    id: 'cross-copper-wire',
    title: 'Horseshoe Nail Celtic Cross Pendant, Copper Wire Wrapped',
    image: crossCopperWire,
    priceLabel: '$47.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: 'A horseshoe nail Celtic cross wound with copper wire — faith and craft merged into one piece.',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Materials: Copper, Steel',
      'Pendant: 1" W × 2.5" H',
      'Necklace length: 28"',
      'Handmade by D&S Iron Works',
    ],
  },
  {
    id: 'horseshoe-heart-pendant',
    title: 'Handmade Horseshoe Nail Heart Pendant, Western Necklace',
    image: horseshoeHeartPendant,
    priceLabel: '$15.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: 'A heart shaped from a single horseshoe nail. Wearable Western art at an accessible price.',
    badge: 'Low in stock',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Handmade by D&S Iron Works',
    ],
  },
  {
    id: 'spiral-pendant-drift',
    title: 'Hand-Forged Iron Spiral Pendant — Strength & Resilience',
    image: spiralPendantDrift,
    priceLabel: '$31.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: "A symbol of life's journey hand-hammered in iron. Heavy, grounded, and built to last.",
    badge: 'In 19 carts',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Handmade by D&S Iron Works',
    ],
  },
  {
    id: 'large-celtic-cross',
    title: 'Large Celtic Cross Pendant, Handmade with Religious Significance',
    image: largeCelticCross,
    priceLabel: '$58.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: 'A large, statement Celtic cross wound with wire — powerful presence, deep meaning. Necklace color options available.',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Materials: Copper, Steel',
      'Necklace color options available',
      'Handmade by D&S Iron Works',
    ],
  },
  {
    id: 'rustic-copper-cross',
    title: 'Handmade Horseshoe Nail Celtic Cross Pendant, Rustic Copper Wire',
    image: rusticCopperCross,
    priceLabel: '$58.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: 'Hand-hammered nail cross wrapped in rustic copper wire. Recycled steel with sustainable character.',
    badge: 'In 5 carts',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Materials: Copper, Steel',
      'Recycled & upcycled metal',
      'Handmade by D&S Iron Works',
    ],
  },
  {
    id: 'leaf-pendant',
    title: 'Hand Forged Iron Leaf Pendant',
    image: leafPendant,
    priceLabel: '$31.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: 'A delicate iron leaf with hammered veining — nature rendered in forge-work on a leather cord.',
    badge: 'Only 6 left',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Handmade by D&S Iron Works',
    ],
  },
  {
    id: 'iron-heart-pendant',
    title: 'Hand Forged Iron Heart Pendant, Viking Celtic Necklace',
    image: ironHeartPendant,
    priceLabel: '$31.00',
    etsyUrl: 'https://www.etsy.com/shop/dandsironworks',
    description: 'A flowing Viking-style heart forged from iron bar — bold, asymmetric, and unmistakably handmade.',
    details: [
      'Ships from Utah',
      'Returns & exchanges accepted',
      'Handmade by D&S Iron Works',
    ],
  },
];
