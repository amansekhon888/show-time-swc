import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../services/axiosClient";

export interface BookingState {
  bookings: any[];
  currentShowtime: any | null;
  seatLayout: any[];
  loading: boolean;
  error: string | null;
  booked: boolean;
}

const initialState: BookingState = {
  bookings: [],
  currentShowtime: null,
  seatLayout: [],
  loading: false,
  error: null,
  booked: false,
};

export const fetchBookings = createAsyncThunk("booking/fetchBookings", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/bookings");
    return response.data.bookings;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to load bookings");
  }
});

export const fetchShowtimeDetails = createAsyncThunk("booking/fetchShowtimeDetails", async (showtimeId: string, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(`/showtimes/${showtimeId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to load showtime");
  }
});

export const bookSeats = createAsyncThunk(
  "booking/bookSeats",
  async (payload: { showtimeId: string; seats: string[] }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/bookings", payload);
      return response.data.booking;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Booking failed");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingSuccess(state) {
      state.booked = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchShowtimeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowtimeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentShowtime = action.payload.showtime;
        state.seatLayout = action.payload.layout;
      })
      .addCase(fetchShowtimeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(bookSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookSeats.fulfilled, (state) => {
        state.loading = false;
        state.booked = true;
      })
      .addCase(bookSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetBookingSuccess } = bookingSlice.actions;
export default bookingSlice.reducer;
