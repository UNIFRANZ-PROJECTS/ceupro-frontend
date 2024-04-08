
import { RequirementModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const requirementSlice = createSlice({
  name: 'requirement',
  initialState: {
    requirements: [] as RequirementModel[],
  },
  reducers: {
    setRequirements: (state, action) => {
        state.requirements = action.payload.requirements;
    },
    setAddRequirement: (state, action) => {
        state.requirements = [...state.requirements, action.payload.requirement];
    },
    setUpdateRequirement: (state, action) => {
        state.requirements = [...state.requirements.map((e) => {
            if (e.id === action.payload.requirement.id) {
                return {
                    ...action.payload.requirement
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