import axios from "axios";
import { baseUrl } from "./baseUrlConfig";
import { ApiResponse, ApiResponseBase } from "./api-response.model";

export interface TokenResponse {
  accessToken: string;
}

export const usersApi = {
  async login(username: string, password: string): Promise<TokenResponse> {
    return (
      await axios.post(`${baseUrl}/identity/login`, {
        email: username,
        password,
      })
    ).data as TokenResponse;
  },
  async getRoles(): Promise<ApiResponse<string[]>> {
    if (!usersApi.isLoggedIn()) return {} as ApiResponse<string[]>;
    return (await axios.get(`${baseUrl}/api/users/roles`, this.getToken()))
      .data as ApiResponse<string[]>;
  },
  async register(email: string, password: string): Promise<TokenResponse> {
    return (
      await axios.post(`${baseUrl}/identity/register`, { email, password })
    ).data as TokenResponse;
  },
  getToken() {
    return {
      headers: {AccessControlAllowOrigin: '*', Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
  },
  isLoggedIn() {
    return !!localStorage.getItem("token");
  },
};
