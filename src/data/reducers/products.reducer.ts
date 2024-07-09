import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateProductModel,
  ProductModel,
  UpdateProductModel,
} from "../models/product.model";
import { productsAPI } from "../api/products.api";
import { PagedResponse } from "../models/paged-response.model";
import { usersApi } from "../api/users.api";

export const fetchProducts = createAsyncThunk(
  "products/getAll",
  async (details: { page: number; size: number }, thunkAPI) => {
    const response = await productsAPI.getProducts(details.page, details.size);
    return response;
  }
);

export const fetchProduct = createAsyncThunk(
  "products/getById",
  async (details: { id: number }, thunkAPI) => {
    const response = await productsAPI.getProduct(details.id);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (details: { updateModel: UpdateProductModel }, thunkAPI) => {
    const response = await productsAPI.updateProduct(details.updateModel);
    return response;
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (details: { createModel: CreateProductModel }, thunkAPI) => {
    const response = await productsAPI.createProduct(details.createModel);
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (details: { id: number }, thunkAPI) => {
    const response = await productsAPI.deleteProduct(details.id);
    return response;
  }
);

export interface ProductsState {
  createdProductId: number;
  productDetail: ProductModel;
  productUpdateModel: UpdateProductModel;
  products: PagedResponse<ProductModel>;
  error: string;
}

export const productSlice = createSlice({
  name: "products",
  initialState: {
    value: {
      createdProductId: 0,
      products: {} as PagedResponse<ProductModel>,
      productDetail: {} as ProductModel,
      productUpdateModel: {
        name: "",
        description: "",
        base64Image: "",
        id: 0,
        price: 0,
        quantity: 0,
        categoryIds: [],
      } as UpdateProductModel,
      error: "",
    } as ProductsState,
  },
  reducers: {
    setProductName: (state, action: PayloadAction<string>) => {
      state.value.productUpdateModel.name = action.payload;
    },
    setProductCategoryIds: (state, action: PayloadAction<number[]>) => {
      state.value.productUpdateModel.categoryIds = action.payload;
    },
    setProductDescription: (state, action: PayloadAction<string>) => {
      state.value.productUpdateModel.description = action.payload;
    },
    setProductQuantity: (state, action: PayloadAction<number>) => {
      state.value.productUpdateModel.quantity = action.payload;
    },
    setProductPrice: (state, action: PayloadAction<number>) => {
      state.value.productUpdateModel.price = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.products = action.payload;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.productDetail = action.payload.result;
      state.value.productUpdateModel = {
        categoryIds: action.payload.result.categories.map((x) => x.id),
        ...action.payload.result,
      };
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      state.value.createdProductId = action.payload.result;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
      const result = action.payload.result;
      state.value.productDetail = result;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      if (!usersApi.isLoggedIn()) return;
      if (!action.payload.isSuccess) {
        state.value.error = action.payload.error!;
        return;
      }
    });
  },
});

export const {
  setProductName,
  setProductCategoryIds,
  setProductDescription,
  setProductPrice,
  setProductQuantity,
} = productSlice.actions;
export default productSlice.reducer;
