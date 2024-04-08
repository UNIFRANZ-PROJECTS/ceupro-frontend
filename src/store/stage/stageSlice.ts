import { TypeProjectModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const stageSlice = createSlice({
  name: 'stage',
  initialState: {
    stages: [] as TypeProjectModel[],
  },
  reducers: {
    setStages: (state, action) => {
      state.stages = action.payload.stages;
    },
    setAddStage: (state, action) => {
      state.stages = [...state.stages, action.payload.stage];
    },
    setUpdateStage: (state, action) => {
      state.stages = [
        ...state.stages.map((e) => {
          if (e.id === action.payload.stage.id) {
            return {
              ...action.payload.stage,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteStage: (state, action) => {
      state.stages = [...state.stages.filter((e) => e.id != action.payload.id)];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStages, setAddStage, setUpdateStage, setDeleteStage } =
  stageSlice.actions;
