export interface EtsyProduct {
  id: string;
  title: string;
  image: string;
  priceLabel: string;
  etsyUrl: string;
  description: string;
  details?: string[];
}

export const defaultEtsyProducts: EtsyProduct[] = [];
