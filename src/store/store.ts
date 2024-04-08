import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  categorySlice,
  inscriptionSlice,
  parallelSlice,
  permissionSlice,
  projectSlice,
  requirementSlice,
  roleSlice,
  seasonSlice,
  staffSlice,
  stageSlice,
  studentSlice,
  subjectSlice,
  teacherSlice,
  typeProjectSlice,
} from '.';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    staffs: staffSlice.reducer,
    teachers: teacherSlice.reducer,
    students: studentSlice.reducer,
    requirements: requirementSlice.reducer,
    stages: stageSlice.reducer,
    seasons: seasonSlice.reducer,
    inscriptions: inscriptionSlice.reducer,
    permissions: permissionSlice.reducer,
    roles: roleSlice.reducer,
    categories: categorySlice.reducer,
    parallels: parallelSlice.reducer,
    projects: projectSlice.reducer,
    subjects: subjectSlice.reducer,
    typeProjects: typeProjectSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
