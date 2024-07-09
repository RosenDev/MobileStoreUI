export interface ProductCategoryModel {
    id: number;
    name: string;
    updated20114101: string;
}

export interface CreateProductCategoryModel {
    name: string;
}

export interface UpdateProductCategoryModel extends CreateProductCategoryModel {
    id: number;
}