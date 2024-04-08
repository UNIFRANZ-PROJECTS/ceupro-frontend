import { ParallelModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const parallelSlice = createSlice({
  name: 'parallel',
  initialState: {
    parallels: [] as ParallelModel[],
  },
  reducers: {
    setParallels: (state, action) => {
      state.parallels = action.payload.parallels;
    },
    setAddParallel: (state, action) => {
      state.parallels = [...state.parallels, action.payload.parallel];
    },
    setUpdateParallel: (state, action) => {
      state.parallels = [
        ...state.parallels.map((e) => {
          if (e.id === action.payload.parallel.id) {
            return {
              ...action.payload.parallel,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteParallel: (state, action) => {
      state.parallels = [
        ...state.parallels.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setParallels,
  setAddParallel,
  setUpdateParallel,
  setDeleteParallel,
} = parallelSlice.actions;
