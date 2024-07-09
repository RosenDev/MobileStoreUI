import axios from "axios";
import {
  CreateOrderModel,
  OrderModel,
  OrderStatus,
  UpdateOrderModel,
} from "../models/order.model";
import { baseUrl } from "./baseUrlConfig";
import { PagedResponse } from "../models/paged-response.model";
import { ApiResponse, ApiResponseBase } from "./api-response.model";
import { usersApi } from "./users.api";

export const ordersAPI = {
  async getOrders(
    page: number,
    size: number
  ): Promise<PagedResponse<OrderModel>> {
    if (!usersApi.isLoggedIn()) return {} as PagedResponse<OrderModel>;
    return (
      await axios.get(
        `${baseUrl}/api/orders?page=${page}&size=${size}`,
        usersApi.getToken()
      )
    ).data as PagedResponse<OrderModel>;
  },
  async getOrdersByCustomerId(
    customerId: number
  ): Promise<ApiResponse<OrderModel[]>> {
    if (!usersApi.isLoggedIn()) return {} as ApiResponse<OrderModel[]>;
    return (
      await axios.get(
        `${baseUrl}/api/orders/byCustomerId/${customerId}`,
        usersApi.getToken()
      )
    ).data as ApiResponse<OrderModel[]>;
  },
  async updateOrder(
    payload: UpdateOrderModel
  ): Promise<ApiResponse<OrderModel>> {
    if (!usersApi.isLoggedIn()) return {} as ApiResponse<OrderModel>;
    return (
      await axios.put(`${baseUrl}/api/orders`, payload, usersApi.getToken())
    ).data as ApiResponse<OrderModel>;
  },
  async updateOrderStatus(
    id: number,
    orderStatus: OrderStatus
  ): Promise<ApiResponseBase> {
    if (!usersApi.isLoggedIn()) return {} as ApiResponseBase;
    return (
      await axios.put(
        `${baseUrl}/api/orders/status/${id}`,
        { status: orderStatus },
        usersApi.getToken()
      )
    ).data as ApiResponseBase;
  },
  async createOrder(payload: CreateOrderModel): Promise<ApiResponse<number>> {
    if (!usersApi.isLoggedIn()) return {} as ApiResponse<number>;
    return (
      await axios.post(`${baseUrl}/api/orders`, payload, usersApi.getToken())
    ).data as ApiResponse<number>;
  },
  async getOrder(id: number): Promise<ApiResponse<OrderModel>> {
    if (!usersApi.isLoggedIn()) return {} as ApiResponse<OrderModel>;
    return (await axios.get(`${baseUrl}/api/orders/${id}`, usersApi.getToken()))
      .data as ApiResponse<OrderModel>;
  },
};
