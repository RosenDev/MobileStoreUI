import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PagedResponse } from "../models/paged-response.model";
import {
  CreateOrderModel,
  OrderModel,
  OrderStatus,
  UpdateOrderModel,
} from "../models/order.model";
import { ordersAPI } from "../api/orders.api";
import { usersApi } from "../api/users.api";

export const fetchOrders = createAsyncThunk(
  "orders/getAll",
  async (details: { page: number; size: number }, thunkAPI) => {
    const response = await ordersAPI.getOrders(details.page, details.size);
    return response;
  }
);

export const fetchCustomerOrders = createAsyncThunk(
  "orders/getByCustomerId",
  async (details: { customerId: number }, thunkAPI) => {
    const response = await ordersAPI.getOrdersByCustomerId(details.customerId);
    return response;
  }
);

export const fetchOrder = createAsyncThunk(
  "orders/getById",
  async (details: { id: number }, thunkAPI) => {
    const response = await ordersAPI.getOrder(details.id);
    return response;
  }
);

export const updateOrder = createAsyncThunk(
  "orders/update",
  async (details: { updateModel: UpdateOrderModel }, thunkAPI) => {
    const response = await ordersAPI.updateOrder(details.updateModel);
    return response;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async (details: { id: number; status: OrderStatus }, thunkAPI) => {
    const response = await ordersAPI.updateOrderStatus(
      details.id,
      details.status
    );
    return response;
  }
);

export const createOrder = createAsyncThunk(
  "orders/create",
  async (details: { createModel: CreateOrderModel }, thunkAPI) => {
    const response = await ordersAPI.createOrder(details.createModel);
    return response;
  }
);

export interface OrdersState {
  createdOrderId: number;
  orderDetail: OrderModel;
  orders: PagedResponse<OrderModel>;
  customerOrders: OrderModel[];
  error: string;
}

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    value: {
      createdOrderId: 0,
      orders: {result: []} as any as PagedResponse<OrderModel>,
      customerOrders: [] as OrderModel[],
      orderDetail: {
        status: 1,
        products: [],
        actionsId: 0,
        id: 0,
        customerPhone: '',
        customerAddress: '',
        customerName: '',
        econtOfficeCode: '',
        price: 0,
        quantity: 0,
        orderDate: "",
        updated20114101: "",
      } as OrderModel,
      error: "",
    } as OrdersState,
  },
  reducers: {
    setStatus: (state, action: PayloadAction<OrderStatus>) => {
      state.value.orderDetail.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.orders = action.payload;
      state.value.orders.result.forEach((x) => (x.actionsId = x.id));
    });
    builder.addCase(fetchCustomerOrders.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.orders.result = action.payload.result;
      state.value.orders.result.forEach((x) => (x.actionsId = x.id));
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.orderDetail = action.payload.result;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.createdOrderId = action.payload.result;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      const result = action.payload.result;
      state.value.orderDetail = result;
    });
  },
});

export const { setStatus } = orderSlice.actions;

export default orderSlice.reducer;
