export interface EtsyProduct {
  id: string;
  title: string;
  image: string;
  priceLabel: string;
  etsyUrl: string;
  description: string;
  details?: string[];
}

export const etsyProducts: EtsyProduct[] = [
  {
    id: "p1",
    title: "Hand-Forged Candle Holder",
    image: "/images/product-candle.png",
    priceLabel: "$45.00",
    etsyUrl: "https://www.etsy.com/shop/dandsironworks",
    description: "Each candle holder is hand-hammered from solid iron bar stock and finished with a raw beeswax coating to prevent rust. No two are exactly alike — that's the point.",
    details: ["Solid iron bar stock", "Hand-hammered finish", "Beeswax rust protection", "Fits standard taper candles"]
  },
  {
    id: "p2",
    title: "Heavy Iron Coat Hook",
    image: "/images/product-hook.png",
    priceLabel: "$25.00",
    etsyUrl: "https://www.etsy.com/shop/dandsironworks",
    description: "Wall-mount coat hook forged from 1/2\" round stock. The scrolled tip is hand-formed over the anvil horn. Heavy enough to hold a soaking wet canvas jacket.",
    details: ["1/2\" round iron stock", "Hand-scrolled tip", "Wall-mount hardware included", "Oil and wax finish"]
  },
  {
    id: "p3",
    title: "Bespoke Fire Poker",
    image: "/images/product-poker.png",
    priceLabel: "$85.00",
    etsyUrl: "https://www.etsy.com/shop/dandsironworks",
    description: "A serious fire poker for a serious fireplace. Twisted handle, tapered point, and a hanging loop — all worked hot from a single length of iron. Substantial weight and balance.",
    details: ["Full 30\" length", "Twisted grip section", "Tapered hardened tip", "Hanging loop included"]
  },
  {
    id: "p4",
    title: "Modern Plant Stand",
    image: "/images/product-plant-stand.png",
    priceLabel: "$120.00",
    etsyUrl: "https://www.etsy.com/shop/dandsironworks",
    description: "Clean geometric plant stand in flat steel bar. The angles are cut and welded, then ground smooth and given a matte black powder coat. Fits pots up to 10\" diameter.",
    details: ["Flat steel bar construction", "Matte black powder coat", "10\" diameter pot maximum", "Non-scratch rubber feet"]
  },
  {
    id: "p5",
    title: "Raw Steel Bottle Opener",
    image: "/images/product-opener.png",
    priceLabel: "$30.00",
    etsyUrl: "https://www.etsy.com/shop/dandsironworks",
    description: "Thick-gauge wall-mount bottle opener. Hammered texture, raw oiled steel finish. The kind of thing that will still be in your kitchen in 50 years.",
    details: ["3/16\" thick steel plate", "Hammered texture", "Raw oiled finish", "Wall mount with hardware"]
  },
  {
    id: "p6",
    title: "Forged Shelf Bracket",
    image: "/images/product-bracket.png",
    priceLabel: "$55.00",
    etsyUrl: "https://www.etsy.com/shop/dandsironworks",
    description: "Heavy-duty shelf bracket hand-forged with a scrolled toe and tapered arms. Sold in pairs. Rated for serious load — these aren't decorative.",
    details: ["Sold as a pair", "Scrolled decorative toe", "Rated 200+ lbs per pair", "Lag bolt hardware included"]
  }
];
