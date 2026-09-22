export type PageId = 'accueil' | 'produits' | 'services' | 'apropos' | 'contact';

export type ProductCategory = 
  | 'tous'
  | 'smartphones'
  | 'ecouteurs'
  | 'chargeurs'
  | 'powerbanks'
  | 'protections'
  | 'supports';

export interface Product {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Tecno' | 'Xiaomi' | 'Anker' | 'Oraimo';
  category: ProductCategory;
  mainCategory: 'telephones' | 'accessoires';
  price: number; // in FCFA
  originalPrice?: number;
  discountPercentage?: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  inStock: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  specs: string[];
  description: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  highlight: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  productInterest: string;
  message: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  comment: string;
  rating: number;
  date: string;
  productBought: string;
}
