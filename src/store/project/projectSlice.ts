import { ProjectModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [] as ProjectModel[],
  },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload.projects;
    },
    setAddProject: (state, action) => {
      state.projects = [...state.projects, action.payload.project];
    },
    setUpdateProject: (state, action) => {
      state.projects = [
        ...state.projects.map((e) => {
          if (e.id === action.payload.project.id) {
            return {
              ...action.payload.project,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteProject: (state, action) => {
      state.projects = [
        ...state.projects.filter((e) => e.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProjects,
  setAddProject,
  setUpdateProject,
  setDeleteProject,
} = projectSlice.actions;
