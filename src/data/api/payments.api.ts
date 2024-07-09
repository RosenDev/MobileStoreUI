import axios from "axios";
import { baseUrl } from "./baseUrlConfig";
import { ApiResponse } from "./api-response.model";
import { usersApi } from "./users.api";

export const paymentsApi = {
  async getPaymentToken(orderId: number): Promise<ApiResponse<string>> {
    if(!usersApi.isLoggedIn()) return {} as ApiResponse<string>;
    return (
      await axios.get(
        `${baseUrl}/api/payments/getToken/${orderId}`,
        usersApi.getToken()
      )
    ).data as ApiResponse<string>;
  },
};
