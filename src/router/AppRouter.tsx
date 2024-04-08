import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/hooks';
import { Layout } from '@/views/layout';
/* Rutas */
import { AuthPage } from '@/views/auth/AuthPage';
import { DashboardView } from '@/views/pages/dashboard';
import { ReportView } from '@/views/pages/report';
import { SeasonView } from '@/views/pages/season';
import { RequirementView } from '@/views/pages/requirement';
import { TeacherView } from '@/views/pages/teacher';
import { StudentView } from '@/views/pages/student';
import { InscriptionView } from '@/views/pages/inscription';
import { PermissionView } from '@/views/pages/permission';
import { RoleView } from '@/views/pages/role';
import { ParallelView } from '@/views/pages/parallel';
import { ProjectView } from '@/views/pages/project';
import { StaffView } from '@/views/pages/staff';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    (status === 'not-authenticated') ?
      <AuthPage />
      :
      <Layout>
        <Routes>
          <Route path='/dashboardView' element={<DashboardView />} />
          <Route path='/seasonView' element={<SeasonView />} />
          <Route path='/requirementView' element={<RequirementView />} />
          <Route path='/inscriptionView' element={<InscriptionView />} />
          <Route path='/roleView' element={<RoleView />} />
          <Route path='/permissionView' element={<PermissionView />} />
          <Route path='/parallelView' element={<ParallelView />} />
          <Route path='/projectView' element={<ProjectView />} />
          <Route path='/staffView' element={<StaffView />} />
          <Route path='/teacherView' element={<TeacherView />} />
          <Route path='/studentView' element={<StudentView />} />
          
          <Route path='/ReportView' element={<ReportView />} />

          {/*  */}
          <Route path="/*" element={<Navigate to={"/dashboardView"} />} />
        </Routes>
      </Layout>
  )
}
