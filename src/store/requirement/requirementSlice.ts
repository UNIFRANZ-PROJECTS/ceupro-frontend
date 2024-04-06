
import { RequirementModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const requirementSlice = createSlice({
  name: 'requirement',
  initialState: {
    requirements: [] as RequirementModel[],
  },
  reducers: {
    setRequirements: (state, action) => {
        state.requirements = action.payload.categories;
    },
    setAddRequirement: (state, action) => {
        state.requirements = [...state.requirements, action.payload.category];
    },
    setUpdateRequirement: (state, action) => {
        state.requirements = [...state.requirements.map((e) => {
            if (e.id === action.payload.category.id) {
                return {
                    ...action.payload.category
                }
            }
            return e
        })];
    },
    setDeleteRequirement: (state, action) => {
        state.requirements = [...state.requirements.filter(e => e.id != action.payload.id)];
    },
  }
});


// Action creators are generated for each case reducer function
export const { 
  setRequirements,
  setAddRequirement,
  setUpdateRequirement,
  setDeleteRequirement,
 } = requirementSlice.actions;