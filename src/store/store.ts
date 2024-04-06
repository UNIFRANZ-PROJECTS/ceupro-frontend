import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  requirementSlice,
  seasonSlice,
  stageSlice,
} from '.';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    requirements: requirementSlice.reducer,
    stages: stageSlice.reducer,
    seasons: seasonSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})