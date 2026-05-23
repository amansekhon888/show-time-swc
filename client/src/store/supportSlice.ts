import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../services/axiosClient";

export interface SupportState {
  tickets: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SupportState = {
  tickets: [],
  loading: false,
  error: null,
};

export const fetchSupportTickets = createAsyncThunk("support/fetchSupportTickets", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/support");
    return response.data.tickets;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to load support tickets");
  }
});

export const createSupportTicket = createAsyncThunk(
  "support/createSupportTicket",
  async (payload: { title: string; message: string; toRole: "owner" | "admin" }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/support", payload);
      return response.data.ticket;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to open support ticket");
    }
  }
);

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupportTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchSupportTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSupportTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSupportTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.push(action.payload);
      })
      .addCase(createSupportTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default supportSlice.reducer;
