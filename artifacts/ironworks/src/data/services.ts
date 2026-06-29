export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroImage: string;
  summary: string;
  details: string[];
  examples: string[];
};

export const services: ServicePage[] = [
  {
    slug: 'custom-ironwork-utah',
    title: 'Custom Ironwork in Utah',
    shortTitle: 'Custom Ironwork',
    metaTitle: 'Custom Ironwork in Utah | D&S Iron Works',
    metaDescription: 'Custom ironwork in Utah by D&S Iron Works: forged railings, fire pits, signs, furniture, metal art, and blacksmith commissions by Dallan Goff.',
    eyebrow: 'Built by Hand',
    heroImage: '/images/iron-table.jpg',
    summary: 'D&S Iron Works creates custom ironwork for homes, cabins, ranches, and one-of-a-kind spaces across Utah.',
    details: [
      'Direct project planning with Dallan Goff',
      'Hand-forged and plasma-cut steel details',
      'Custom work for indoor, outdoor, decorative, and functional pieces',
    ],
    examples: ['Fire pits', 'Forged railings', 'Custom signs', 'Tables and furniture', 'Metal wall art'],
  },
  {
    slug: 'custom-fire-pits',
    title: 'Custom Fire Pits',
    shortTitle: 'Fire Pits',
    metaTitle: 'Custom Fire Pits | Hand-Forged Metal Fire Pits in Utah',
    metaDescription: 'Custom steel fire pits by D&S Iron Works, including plasma-cut designs, ranch themes, outdoor gathering pieces, and hand-finished metalwork.',
    eyebrow: 'Outdoor Ironwork',
    heroImage: '/images/fire-pit-real.jpg',
    summary: 'Custom fire pits are built for outdoor gathering spaces with durable steel, clean cutouts, and details that fit the owner.',
    details: [
      'Personalized cutout designs and themes',
      'Heavy steel construction for outdoor use',
      'Designed for patios, ranches, cabins, and gathering areas',
    ],
    examples: ['Ranch fire pits', 'Family-name fire pits', 'Wildlife cutouts', 'Cabin fire features'],
  },
  {
    slug: 'pre-built-fire-pits-rocket-stoves',
    title: 'Pre-Built Fire Pits & Iron Rocket Stoves',
    shortTitle: 'Pre-Made Items',
    metaTitle: 'Pre-Built Fire Pits, Iron Rocket Stoves & XL | D&S Iron Works',
    metaDescription: 'Pre-built steel fire pits, Iron Rocket Stove, and Iron Rocket XL by D&S Iron Works, including ready-made outdoor fire features and camp cooking stoves.',
    eyebrow: 'Ready-Made Steel',
    heroImage: '/images/premade-fire-pit-cabin.jpg',
    summary: 'D&S Iron Works builds small runs of ready-made fire pits, Iron Rocket Stoves, and Iron Rocket XL stoves for customers who want shop-built steel without starting from a blank custom design.',
    details: [
      'Ready-made and small-batch builds available as inventory allows',
      'Pre-built steel fire pits with outdoor-ready construction',
      'Iron Rocket and Iron Rocket XL stoves with wood-fed fireboxes and cooking surfaces',
    ],
    examples: ['Pre-built fire pits', 'Iron Rocket Stove', 'Iron Rocket XL', 'Camp cooking stoves', 'Outdoor gathering pieces'],
  },
  {
    slug: 'forged-railings',
    title: 'Forged Railings',
    shortTitle: 'Railings',
    metaTitle: 'Forged Railings | Custom Metal Stair and Hand Railings',
    metaDescription: 'Custom forged railings, stair rails, balcony guards, and handrails by D&S Iron Works with hand-shaped metal details.',
    eyebrow: 'Architectural Iron',
    heroImage: '/images/portfolio-railing.png',
    summary: 'Forged railings bring strength and craft into stairways, entries, balconies, and interior spaces.',
    details: [
      'Custom railing layouts for interior and exterior projects',
      'Hand-forged details matched to the space',
      'Designed for long-term use and a strong visual presence',
    ],
    examples: ['Stair railings', 'Balcony guards', 'Interior handrails', 'Entry railings'],
  },
  {
    slug: 'custom-metal-signs',
    title: 'Custom Metal Signs',
    shortTitle: 'Metal Signs',
    metaTitle: 'Custom Metal Signs | Ranch, Address, and Personalized Steel Signs',
    metaDescription: 'Custom metal signs from D&S Iron Works, including personalized ranch signs, address plaques, wall art, and plasma-cut steel designs.',
    eyebrow: 'Personalized Steel',
    heroImage: '/images/custom-sign-bealer.jpg',
    summary: 'Custom metal signs turn names, brands, ranch marks, and family ideas into durable steel pieces.',
    details: [
      'Personalized names, ranch themes, and address designs',
      'Plasma-cut steel with hand-finished character',
      'Indoor and outdoor sign options',
    ],
    examples: ['Ranch signs', 'Address signs', 'Family-name signs', 'Wall art signs'],
  },
  {
    slug: 'forged-metal-art',
    title: 'Forged Metal Art',
    shortTitle: 'Metal Art',
    metaTitle: 'Forged Metal Art | Custom Sculptural Ironwork by D&S Iron Works',
    metaDescription: 'Forged metal art, tree sculptures, candelabras, wall pieces, hooks, bells, and decorative ironwork by D&S Iron Works in Utah.',
    eyebrow: 'Sculptural Iron',
    heroImage: '/images/tree-of-life.jpg',
    summary: 'Forged metal art gives a room, entry, cabin, or ranch a handmade piece with weight, texture, and story.',
    details: [
      'One-of-a-kind sculptural and decorative work',
      'Forged leaves, trees, hooks, bells, candelabras, and wall pieces',
      'Designed from a sketch, reference photo, idea, or theme',
    ],
    examples: ['Tree of Life sculptures', 'Candelabras', 'Decorative hooks', 'Forged bells', 'Wall art'],
  },
  {
    slug: 'blacksmith-commissions',
    title: 'Blacksmith Commissions',
    shortTitle: 'Commissions',
    metaTitle: 'Blacksmith Commissions | Custom Hand-Forged Metalwork',
    metaDescription: 'Start a custom blacksmith commission with Dallan Goff at D&S Iron Works for hand-forged art, furniture, fire pits, signs, railings, and gifts.',
    eyebrow: 'Start a Piece',
    heroImage: '/images/hammering-maple-leaf-poster.jpg',
    summary: 'Commission work starts with a direct conversation about the idea, the space, the use, and the look of the finished piece.',
    details: [
      'Bring a sketch, photo, measurements, or rough idea',
      'Direct communication with Dallan from concept to build',
      'Useful for gifts, home projects, ranch work, and statement pieces',
    ],
    examples: ['Custom gifts', 'Forged furniture', 'Metal art', 'Fireplace tools', 'Functional ironwork'],
  },
];

export const getService = (slug: string | undefined) => services.find((service) => service.slug === slug);
