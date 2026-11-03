export type ProductCategory = 
  | 'produce'      // 1. Fruits & Vegetables
  | 'dairy'        // 2. Dairy, Bread & Eggs
  | 'staples'      // 3. Atta, Rice & Pulses
  | 'munchies'     // 4. Snacks & Namkeen
  | 'sweet'        // 5. Chocolates & Sweets
  | 'drinks'       // 6. Cold Drinks & Juices
  | 'breakfast'    // 7. Tea, Coffee & Breakfast
  | 'instant'      // 8. Instant Food & Ready-to-Eat
  | 'frozen'       // 9. Frozen Food & Ice Cream
  | 'personal'     // 10. Personal Care & Beauty
  | 'bath'         // 11. Bath & Body Care
  | 'household'    // 12. Home Cleaning & Laundry
  | 'kitchen'      // 13. Kitchen & Household Essentials
  | 'baby'         // 14. Baby Care
  | 'health'       // 15. Health & Hygiene Essentials
  | 'pet'          // 16. Pet Care
  | 'festive'      // 17. Pooja & Festive Essentials
  | 'stationery';  // 18. Stationery & Office Supplies

export interface CategoryInfo {
  id: ProductCategory;
  label: string;
  image: string;
  bannerColor: string;
  itemCount?: number;
  tagline?: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  weight: string;
  tag?: string;
  badgeType?: 'bestseller' | 'popular' | 'new' | 'festive' | 'saver' | 'organic';
  deliveryTime: string;
  rating: number;
  reviewCount: number;
  description: string;
  accentColor: string;
  imageUrl: string;
  altText: string;
  isVeg?: boolean;
  emoji?: string;
}



export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Campaign {
  id: string;
  type: 'ATL' | 'BTL' | 'Digital' | 'Promotional';
  title: string;
  subtitle: string;
  concept: string;
  targetAudience: string;
  channels: string[];
  kpi: string;
  metrics: { label: string; value: string }[];
  tagline: string;
}

export interface Persona {
  id: string;
  name: string;
  title: string;
  age: number;
  occupation: string;
  location: string;
  avatarSeed: string;
  avatarColor: string;
  quote: string;
  orderTrigger: string;
  painPoints: string[];
  preferredCategories: string[];
  avgBasketSize: string;
  frequency: string;
  digitalHabits: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'delivery' | 'quality' | 'academic' | 'orders';
}
