import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../services/axiosClient";

export interface MovieSearchState {
  movies: any[];
  results: any[];
  theatres: any[];
  auditoriums: any[];
  showtimes: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieSearchState = {
  movies: [],
  results: [],
  theatres: [],
  auditoriums: [],
  showtimes: [],
  loading: false,
  error: null,
};

export const fetchCatalog = createAsyncThunk("movies/fetchCatalog", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/movies");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to load movies");
  }
});

export const searchShowtimes = createAsyncThunk("movies/searchShowtimes", async (params: { search?: string; location?: string; theatre?: string; time?: string }, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/search", { params });
    return response.data.results;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Search failed");
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.theatres = action.payload.theatres;
        state.auditoriums = action.payload.auditoriums;
        state.showtimes = action.payload.showtimes;
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchShowtimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchShowtimes.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchShowtimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default movieSlice.reducer;
