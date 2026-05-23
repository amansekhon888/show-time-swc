import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../services/axiosClient";

export interface OwnerState {
  auditoriumData: any;
  showtimes: any[];
  loading: boolean;
  error: string | null;
}

const initialState: OwnerState = {
  auditoriumData: null,
  showtimes: [],
  loading: false,
  error: null,
};

export const fetchOwnerData = createAsyncThunk("owner/fetchOwnerData", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/owner/auditoriums");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to load owner data");
  }
});

export const createShowtime = createAsyncThunk(
  "owner/createShowtime",
  async (payload: { auditoriumId: string; movieId: string; startTime: string; price: number }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/owner/showtimes", payload);
      return response.data.showtime;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create showtime");
    }
  }
);

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerData.fulfilled, (state, action) => {
        state.loading = false;
        state.auditoriumData = action.payload;
        state.showtimes = action.payload.showtimes;
      })
      .addCase(fetchOwnerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createShowtime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShowtime.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimes.push(action.payload);
      })
      .addCase(createShowtime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ownerSlice.reducer;
