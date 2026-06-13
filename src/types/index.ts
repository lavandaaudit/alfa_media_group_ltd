export interface PricingTier {
  min: number;
  discount: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  tiers: PricingTier[];
  image: string;
}

export interface SelectedItem {
  productId: string;
  quantity: number;
}
