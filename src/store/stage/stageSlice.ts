
import { StageModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const stageSlice = createSlice({
  name: 'stage',
  initialState: {
    stages: [] as StageModel[],
  },
  reducers: {
    setStages: (state, action) => {
        state.stages = action.payload.categories;
    },
    setAddStage: (state, action) => {
        state.stages = [...state.stages, action.payload.category];
    },
    setUpdateStage: (state, action) => {
        state.stages = [...state.stages.map((e) => {
            if (e.id === action.payload.category.id) {
                return {
                    ...action.payload.category
                }
            }
            return e
        })];
    },
    setDeleteStage: (state, action) => {
        state.stages = [...state.stages.filter(e => e.id != action.payload.id)];
    },
  }
});


// Action creators are generated for each case reducer function
export const { 
  setStages,
  setAddStage,
  setUpdateStage,
  setDeleteStage,
 } = stageSlice.actions;