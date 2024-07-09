import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paymentsApi } from "../api/payments.api";
import { usersApi } from "../api/users.api";

export const fetchPaymentToken = createAsyncThunk(
  "users/fetchPaymentToken",
  async (details: { orderId: number }, thunkAPI) => {
    const response = await paymentsApi.getPaymentToken(details.orderId);
    return response;
  }
);

export interface PaymentState {
  token: string;
}

export const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    value: {
      token: "",
    } as PaymentState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPaymentToken.fulfilled, (state, action) => {
      if(!usersApi.isLoggedIn()) return;
      state.value.token = action.payload.result;
    });
  },
});

export default paymentSlice.reducer;
