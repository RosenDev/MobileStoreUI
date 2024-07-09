import axios from "axios";
import { PagedResponse } from "../models/paged-response.model";
import {
  CreateProductModel,
  ProductModel,
  UpdateProductModel,
} from "../models/product.model";
import { baseUrl } from "./baseUrlConfig";
import { usersApi } from "./users.api";
import { ApiResponse } from "./api-response.model";

export const productsAPI = {
  async getProducts(
    page: number,
    size: number
  ): Promise<PagedResponse<ProductModel>> {
    if(!usersApi.isLoggedIn()) return {} as PagedResponse<ProductModel>;
    return (await axios.get(
      `${baseUrl}/api/products?page=${page}&size=${size}`,
      usersApi.getToken()
    )).data as PagedResponse<ProductModel>;
  },
  async updateProduct(
    payload: UpdateProductModel
  ): Promise<ApiResponse<ProductModel>> {
    if(!usersApi.isLoggedIn()) return {} as ApiResponse<ProductModel>;
    return (await axios.put(
      `${baseUrl}/api/products`,
      payload,
      usersApi.getToken()
    )).data as ApiResponse<ProductModel>;
  },
  async createProduct(
    payload: CreateProductModel
  ): Promise<ApiResponse<number>> {
    if(!usersApi.isLoggedIn()) return {} as ApiResponse<number>;
    return (await axios.post(
      `${baseUrl}/api/products`,
      payload,
      usersApi.getToken()
    )).data as ApiResponse<number>;
  },
  async getProduct(id: number): Promise<ApiResponse<ProductModel>> {
    if(!usersApi.isLoggedIn()) return {} as ApiResponse<ProductModel>;
    return (await axios.get(
      `${baseUrl}/api/products/${id}`,
      usersApi.getToken()
    )).data as ApiResponse<ProductModel>;
  },

  async deleteProduct(id: number): Promise<ApiResponse<number>> {
    if(!usersApi.isLoggedIn()) return {} as ApiResponse<number>;
    return (await axios.delete(
      `${baseUrl}/api/products/${id}`,
      usersApi.getToken()
    )).data as ApiResponse<number>;
  },
};
