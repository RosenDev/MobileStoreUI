import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../api/users.api";

export const fetchToken = createAsyncThunk(
  "users/fetchToken",
  async (details: { username: string; password: string }, thunkAPI) => {
    const response = await usersApi.login(details.username, details.password);
    return response;
  }
);

export const fetchRoles = createAsyncThunk(
  "users/fetchRoles",
  async (details: {}, thunkAPI) => {
    const response = await usersApi.getRoles();
    return response;
  }
);

export const register = createAsyncThunk(
  "users/register",
  async (details: { email: string; password: string }, thunkAPI) => {
    await usersApi.register(details.email, details.password);
  }
);

export interface UserState {
  userRoles: string[];
}

export const userSlice = createSlice({
  name: "users",
  initialState: {
    value: {
      userRoles: [],
    } as UserState,
  },
  reducers: {
    logout: () => {
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.accessToken);
    });
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.value.userRoles = action.payload.result;
      sessionStorage.setItem(
        "roles",
        action.payload.result ? JSON.stringify(action.payload.result) : "[]"
      );
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
