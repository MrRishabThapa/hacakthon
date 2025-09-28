import { configureStore, createSlice } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

import bookingSlice from "./slices/bookingSlice";
import huntSlice from "./slices/huntSlice";
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "light" as "light" | "dark",
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice.reducer,
    booking: bookingSlice,
    hunt: huntSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
