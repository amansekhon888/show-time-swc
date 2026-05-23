import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import movieReducer from "./movieSlice";
import bookingReducer from "./bookingSlice";
import ownerReducer from "./ownerSlice";
import supportReducer from "./supportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    bookings: bookingReducer,
    owner: ownerReducer,
    support: supportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
