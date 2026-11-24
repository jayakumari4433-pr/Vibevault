export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  blurb?: string;
  subcategories: Subcategory[];
}

export interface CatalogProduct {
  id: string;
  name: string;
  price: number; // INR
  categoryId: string;
  subcategoryId?: string;
  image?: string;
  blurb?: string;
  active: boolean;
}

export interface Catalog {
  categories: Category[];
  products: CatalogProduct[];
}
