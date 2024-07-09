import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";
import { useDispatch, useSelector } from "react-redux";
import productsReducer from "./reducers/products.reducer";
import productCategoriesReducer from "./reducers/product-categories.reducer";
import ordersReducer from "./reducers/orders.reducer";
import customersReducer from "./reducers/customers.reducer";
import paymentReducer from "./reducers/payment.reducer";

const store = configureStore({
  reducer: {
    users: userReducer,
    products: productsReducer,
    productCategories: productCategoriesReducer,
    orders: ordersReducer,
    customers: customersReducer,
    payments: paymentReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
