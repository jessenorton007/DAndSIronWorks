export type PreMadeItem = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  alt: string;
  priceLabel: string;
  gallery: { src: string; alt: string }[];
  video?: {
    src: string;
    poster: string;
    label: string;
  };
  videos?: {
    src: string;
    poster: string;
    title: string;
    description: string;
    aspect: 'wide' | 'portrait';
  }[];
  features: string[];
  availability: string;
};

export const preMadeItems: PreMadeItem[] = [
  {
    id: 'pre-built-fire-pits',
    title: 'Pre-Built Fire Pits',
    eyebrow: 'Ready for Camp',
    description:
      'Heavy steel fire pits with cut wildlife details, outdoor-ready construction, and the same D&S shop finish as custom work.',
    image: '/images/portable-fire-pit-walkaround-poster.jpg',
    alt: 'Portable steel fire pit with deer cutout panels',
    priceLabel: 'Quote before payment',
    gallery: [
      {
        src: '/images/premade-fire-pit-camp.jpg',
        alt: 'Pre-built steel fire pit with flame and deer cutout panels',
      },
      {
        src: '/images/premade-fire-pit-cabin.jpg',
        alt: 'Pre-built fire pit burning beside a camp tent',
      },
    ],
    video: {
      src: '/images/premade-fire-pit-showcase.mp4',
      poster: '/images/premade-fire-pit-video-poster.jpg',
      label: 'Pre-built fire pit showcase video',
    },
    videos: [
      {
        src: '/images/portable-fire-pit-walkaround.mp4',
        poster: '/images/portable-fire-pit-walkaround-poster.jpg',
        title: 'Portable Fire Pit Walkaround',
        description: 'A closer look at the finished deer-panel fire pit body, base, and steel proportions.',
        aspect: 'wide',
      },
      {
        src: '/images/portable-fire-pit-assembly.mp4',
        poster: '/images/portable-fire-pit-assembly-poster.jpg',
        title: 'Pack-Flat Assembly',
        description: 'Panel layout and setup view showing how the portable fire pit comes together.',
        aspect: 'portrait',
      },
    ],
    features: ['Pack-flat panels', 'Wildlife cut details', 'Portable outdoor setup'],
    availability: 'Ask what is ready now or reserve the next batch.',
  },
  {
    id: 'pre-built-rocket-stoves',
    title: 'Pre-Built Rocket Stoves',
    eyebrow: 'Cook + Heat',
    description:
      'Compact wood-fed rocket stoves with flat-top cooking space, griddle options, and efficient firebox heat for camp cooking.',
    image: '/images/premade-rocket-stove-griddle.jpg',
    alt: 'Pre-built rocket stove with griddle cooking food outdoors',
    priceLabel: 'Quote before payment',
    gallery: [
      {
        src: '/images/premade-rocket-stove-griddle.jpg',
        alt: 'Rocket stove griddle cooking meat and potatoes',
      },
      {
        src: '/images/premade-rocket-stove-cooking.jpg',
        alt: 'Rocket stove burning wood below a flat cooking top',
      },
      {
        src: '/images/premade-rocket-stove-branded-side.jpg',
        alt: 'D and S Iron Works rocket stove side plate and firebox detail',
      },
      {
        src: '/images/premade-rocket-stove-firebox.jpg',
        alt: 'Close view of pre-built rocket stove firebox and chimney',
      },
      {
        src: '/images/premade-rocket-stove-logo-detail.jpg',
        alt: 'Branded D and S Iron Works rocket stove side detail',
      },
    ],
    features: ['Wood-fed firebox', 'Flat-top cooking surface', 'Portable outdoor setup'],
    availability: 'Built in small runs. Call or text for current availability.',
  },
];
