import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  seasonSlice,
} from '.';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    seasons: seasonSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})