import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "../services/axiosClient";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "owner" | "admin";
}

export interface AuthState {
  token: string | null;
  user: UserProfile | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const persistedToken = localStorage.getItem("showtime-auth-token");
const persistedUser = localStorage.getItem("showtime-auth-user");

const initialState: AuthState = {
  token: persistedToken,
  user: persistedUser ? JSON.parse(persistedUser) : null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (details: { fullName: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/register", details);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("showtime-auth-token");
      localStorage.removeItem("showtime-auth-user");
    },
    setAuth(state, action: PayloadAction<{ token: string; user: UserProfile }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("showtime-auth-token", action.payload.token);
      localStorage.setItem("showtime-auth-user", JSON.stringify(action.payload.user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("showtime-auth-token", action.payload.token);
        localStorage.setItem("showtime-auth-user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("showtime-auth-token", action.payload.token);
        localStorage.setItem("showtime-auth-user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
