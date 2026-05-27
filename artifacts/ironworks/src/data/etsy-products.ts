export interface EtsyProduct {
  id: string;
  title: string;
  image: string;
  priceLabel: string;
  etsyUrl: string;
}

export const etsyProducts: EtsyProduct[] = [
  {
    id: "p1",
    title: "Hand-Forged Candle Holder",
    image: "/images/product-candle.png",
    priceLabel: "$45.00",
    etsyUrl: "#"
  },
  {
    id: "p2",
    title: "Heavy Iron Coat Hook",
    image: "/images/product-hook.png",
    priceLabel: "$25.00",
    etsyUrl: "#"
  },
  {
    id: "p3",
    title: "Bespoke Fire Poker",
    image: "/images/product-poker.png",
    priceLabel: "$85.00",
    etsyUrl: "#"
  },
  {
    id: "p4",
    title: "Modern Plant Stand",
    image: "/images/product-plant-stand.png",
    priceLabel: "$120.00",
    etsyUrl: "#"
  },
  {
    id: "p5",
    title: "Raw Steel Bottle Opener",
    image: "/images/product-opener.png",
    priceLabel: "$30.00",
    etsyUrl: "#"
  },
  {
    id: "p6",
    title: "Forged Shelf Bracket",
    image: "/images/product-bracket.png",
    priceLabel: "$55.00",
    etsyUrl: "#"
  }
];
