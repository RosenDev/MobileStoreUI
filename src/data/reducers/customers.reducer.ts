import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PagedResponse } from "../models/paged-response.model";
import { customersAPI } from "../api/customers.api";
import {
  CreateCustomerModel,
  CustomerModel,
  UpdateCustomerModel,
} from "../models/customer.model";
import { usersApi } from "../api/users.api";

export const fetchCustomer = createAsyncThunk(
  "customers",
  async (details: {}, thunkAPI) => {
    const response = await customersAPI.getCustomer();
    return response;
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async (details: { updateModel: UpdateCustomerModel }, thunkAPI) => {
    const response = await customersAPI.updateCustomer(details.updateModel);
    return response;
  }
);

export const createCustomer = createAsyncThunk(
  "customers/create",
  async (details: { createModel: CreateCustomerModel }, thunkAPI) => {
    const response = await customersAPI.createCustomer(details.createModel);
    return response;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (details: {}, thunkAPI) => {
    const response = await customersAPI.deleteCustomer();
    return response;
  }
);

export interface CustomersState {
  createdCustomerId: number;
  customerUpdateModel: UpdateCustomerModel;
  customerModel: CustomerModel;
  customers: PagedResponse<CustomerModel>;
  error: string;
}

export const customerSlice = createSlice({
  name: "customers",
  initialState: {
    value: {
      createdCustomerId: 0,
      customerUpdateModel: {
        id: 0,
        firstName: "",
        lastName: "",
        address1Line: "",
        address2Line: "",
        phoneNumber: "",
        city: "",
        postCode: "",
        econtOfficeCode: "",
      } as UpdateCustomerModel,
      customerModel: {
        id: 0,
        firstName: "",
        lastName: "",
        address1Line: "",
        address2Line: "",
        phoneNumber: "",
        city: "",
        postCode: "",
        econtOfficeCode: "",
      } as CustomerModel,
      error: "",
    } as CustomersState,
  },
  reducers: {
    setCustomerFirstName: (state, action: PayloadAction<string>) => {
      state.value.customerUpdateModel.firstName = action.payload;
    },
    setCustomerLastName: (state, action: PayloadAction<string>) => {
      state.value.customerUpdateModel.lastName = action.payload;
    },
    setCustomerAddressLine1: (state, action: PayloadAction<string>) => {
      state.value.customerUpdateModel.address1Line = action.payload;
    },
    setCustomerAddressLine2: (state, action: PayloadAction<string>) => {
      state.value.customerUpdateModel.address2Line = action.payload;
    },
    setCustomerCity: (state, action: PayloadAction<string>) => {
      state.value.customerUpdateModel.city = action.payload;
    },
    setCustomerPostCode: (state, action: PayloadAction<string>) => {
      state.value.customerUpdateModel.postCode = action.payload;
    },
    setCustomerEcontOfficeCode: (state, action: PayloadAction<string>) => {
      state.value.customerUpdateModel.econtOfficeCode = action.payload;
    },
    setCustomerPhoneNumber: (state, action: PayloadAction<string>) => {
      state.value.customerUpdateModel.phoneNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomer.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.customerModel = action.payload.result;
      state.value.customerUpdateModel = action.payload.result;

    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.createdCustomerId = action.payload.result;
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.customerModel = action.payload.result;
    });
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
    });
  },
});

export const {
  setCustomerAddressLine1,
  setCustomerAddressLine2,
  setCustomerCity,
  setCustomerEcontOfficeCode,
  setCustomerFirstName,
  setCustomerLastName,
  setCustomerPostCode,
  setCustomerPhoneNumber,
} = customerSlice.actions;

export default customerSlice.reducer;
