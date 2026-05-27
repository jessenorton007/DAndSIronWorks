export interface PremiumProduct {
  id: string;
  title: string;
  image: string;
  priceLabel: string;
  description: string;
}

export const premiumProducts: PremiumProduct[] = [
  {
    id: "pr1",
    title: "Massive Custom Fire Pit",
    image: "/images/premium-firepit.png",
    priceLabel: "$1,200.00",
    description: "Hand-forged from 1/4\" thick heavy steel plate. Built to last generations."
  },
  {
    id: "pr2",
    title: "Architectural Wall Panel",
    image: "/images/premium-panel.png",
    priceLabel: "$3,500.00",
    description: "Bespoke welded steel and forged iron abstract wall piece. Perfect for large modern spaces."
  },
  {
    id: "pr3",
    title: "Steel Fireplace Surround",
    image: "/images/premium-fireplace.png",
    priceLabel: "$2,800.00",
    description: "Heavy hot-rolled steel fireplace surround with custom riveted details and a raw oiled finish."
  }
];
