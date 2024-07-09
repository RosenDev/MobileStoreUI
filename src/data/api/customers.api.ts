import axios from "axios";
import { baseUrl } from "./baseUrlConfig";
import { usersApi } from "./users.api";
import { ApiResponse } from "./api-response.model";
import {
  CreateCustomerModel,
  CustomerModel,
  UpdateCustomerModel,
} from "../models/customer.model";

export const customersAPI = {
  async updateCustomer(
    payload: UpdateCustomerModel
  ): Promise<ApiResponse<CustomerModel>> {
    if(!usersApi.isLoggedIn()) return {} as ApiResponse<CustomerModel>;
    return (await axios.put(
      `${baseUrl}/api/customers`,
      payload,
      usersApi.getToken()
    )).data as ApiResponse<CustomerModel>;
  },
  async createCustomer(
    payload: CreateCustomerModel
  ): Promise<ApiResponse<number>> {
    if(!usersApi.isLoggedIn()) return {} as ApiResponse<number>;
    return (await axios.post(
      `${baseUrl}/api/customers`,
      payload,
      usersApi.getToken()
    )).data as ApiResponse<number>;
  },
  async getCustomer(): Promise<ApiResponse<CustomerModel>> {
    if(!usersApi.isLoggedIn()) return {} as ApiResponse<CustomerModel>;
    return (await axios.get(
      `${baseUrl}/api/customers`,
      usersApi.getToken()
    )).data as ApiResponse<CustomerModel>;
  },
  async deleteCustomer(): Promise<ApiResponse<number>> {
if(!usersApi.isLoggedIn()) return {} as ApiResponse<number>;
    return (await axios.delete(
      `${baseUrl}/api/customers`,
      usersApi.getToken()
    )).data as ApiResponse<number>;
  },
};
