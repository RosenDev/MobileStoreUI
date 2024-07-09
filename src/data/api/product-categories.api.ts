import axios from "axios";
import { PagedResponse } from "../models/paged-response.model";
import { baseUrl } from "./baseUrlConfig";
import { usersApi } from "./users.api";
import { ApiResponse } from "./api-response.model";
import {
  CreateProductCategoryModel,
  ProductCategoryModel,
  UpdateProductCategoryModel,
} from "../models/product-category.model";

export const productCategoriesAPI = {
  async getProductCategories(
    page: number,
    size: number
  ): Promise<PagedResponse<ProductCategoryModel>> {
    return (await axios.get(
      `${baseUrl}/api/productcategories?page=${page}&size=${size}`,
      usersApi.getToken()
    )).data as PagedResponse<ProductCategoryModel>;
  },
  async updateProductCategory(
    payload: UpdateProductCategoryModel
  ): Promise<ApiResponse<ProductCategoryModel>> {
    return (await axios.put(
      `${baseUrl}/api/productcategories`,
      payload,
      usersApi.getToken()
    )).data as ApiResponse<ProductCategoryModel>;
  },
  async createProductCategory(
    payload: CreateProductCategoryModel
  ): Promise<ApiResponse<number>> {
    return (await axios.post(
      `${baseUrl}/api/productcategories`,
      payload,
      usersApi.getToken()
    )).data as ApiResponse<number>;
  },
  async getProductCategory(
    id: number
  ): Promise<ApiResponse<ProductCategoryModel>> {
    return (await axios.get(
      `${baseUrl}/api/productcategories/${id}`,
      usersApi.getToken()
    )).data as ApiResponse<ProductCategoryModel>;
  },
  async deleteProductCategory(id: number): Promise<ApiResponse<number>> {
    return (await axios.delete(
      `${baseUrl}/api/productcategories/${id}`,
      usersApi.getToken()
    )).data as ApiResponse<number>;
  },
};
