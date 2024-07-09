import { ProductCategoryModel } from "./product-category.model";

export interface ProductModel {
  id: number;
  name: string;
  description: string;
  quantity: number;
  inStock: boolean;
  price: number;
  updated20114101: string;
  categories: ProductCategoryModel[];
}

export interface CreateProductModel {
  name: string;
  description: string;
  quantity: number;
  price: number;
  categoryIds: number[];
}

export interface UpdateProductModel extends CreateProductModel {
  id: number;
}
