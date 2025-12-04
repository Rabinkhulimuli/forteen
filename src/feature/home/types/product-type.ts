// types.ts
export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
}