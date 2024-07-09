import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PagedResponse } from "../models/paged-response.model";
import {
  CreateProductCategoryModel,
  ProductCategoryModel,
  UpdateProductCategoryModel,
} from "../models/product-category.model";
import { productCategoriesAPI } from "../api/product-categories.api";
import { usersApi } from "../api/users.api";

export const fetchProductCategories = createAsyncThunk(
  "productCategories/getAll",
  async (details: { page: number; size: number }, thunkAPI) => {
    const response = await productCategoriesAPI.getProductCategories(
      details.page,
      details.size
    );
    return response;
  }
);

export const fetchProductCategory = createAsyncThunk(
  "productCategories/getById",
  async (details: { id: number }, thunkAPI) => {
    const response = await productCategoriesAPI.getProductCategory(details.id);
    return response;
  }
);

export const updateProductCategory = createAsyncThunk(
  "productCategories/update",
  async (details: { updateModel: UpdateProductCategoryModel }, thunkAPI) => {
    const response = await productCategoriesAPI.updateProductCategory(
      details.updateModel
    );
    return response;
  }
);

export const createProductCategory = createAsyncThunk(
  "productCategories/create",
  async (details: { createModel: CreateProductCategoryModel }, thunkAPI) => {
    const response = await productCategoriesAPI.createProductCategory(
      details.createModel
    );
    return response;
  }
);

export const deleteProductCategory = createAsyncThunk(
  "productCategories/delete",
  async (details: { id: number }, thunkAPI) => {
    const response = await productCategoriesAPI.deleteProductCategory(
      details.id
    );
    return response;
  }
);

export interface ProductCategoriesState {
  createdProductCategoryId: number;
  productCategories: PagedResponse<ProductCategoryModel>;
  productCategoryUpdateModel: UpdateProductCategoryModel;
  error: string;
}

export const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState: {
    value: {
      createdProductCategoryId: 0,
      productCategories: {
        isSuccess: true,
        error: "",
        statusCode: 200,
        result: [],
        page: 0,
        size: 0,
        total: 0,
      } as PagedResponse<ProductCategoryModel>,
      productCategoryUpdateModel: {
        id: 0,
        name: "",
      } as UpdateProductCategoryModel,
      error: "",
    } as ProductCategoriesState,
  },
  reducers: {
    setCategoryName: (state, action: PayloadAction<string>) => {
      state.value.productCategoryUpdateModel.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductCategories.fulfilled, (state, action) => {
      if(!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.productCategories = action.payload;
    });
    builder.addCase(fetchProductCategory.fulfilled, (state, action) => {
      if(!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.productCategoryUpdateModel = action.payload.result;

    });
    builder.addCase(createProductCategory.fulfilled, (state, action) => {
      if(!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.createdProductCategoryId = action.payload.result;
    });
    builder.addCase(updateProductCategory.fulfilled, (state, action) => {
      if(!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      const result = action.payload.result;
      state.value.productCategoryUpdateModel = result;
    });
    builder.addCase(deleteProductCategory.fulfilled, (state, action) => {
      if(!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
    });
  },
});

export const { setCategoryName } = productCategoriesSlice.actions;

export default productCategoriesSlice.reducer;
