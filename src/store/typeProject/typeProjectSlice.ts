import { TypeProjectModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const typeProjectSlice = createSlice({
  name: 'typeProject',
  initialState: {
    typeProjects: [] as TypeProjectModel[],
  },
  reducers: {
    setTypeProjects: (state, action) => {
      state.typeProjects = action.payload.typeProjects;
    },
    setAddTypeProject: (state, action) => {
      state.typeProjects = [...state.typeProjects, action.payload.typeProject];
    },
    setUpdateTypeProject: (state, action) => {
      state.typeProjects = [
        ...state.typeProjects.map((e) => {
          if (e.id === action.payload.typeProject.id) {
            return {
              ...action.payload.typeProject,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteTypeProject: (state, action) => {
      state.typeProjects = [
        ...state.typeProjects.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTypeProjects,
  setAddTypeProject,
  setUpdateTypeProject,
  setDeleteTypeProject,
} = typeProjectSlice.actions;
