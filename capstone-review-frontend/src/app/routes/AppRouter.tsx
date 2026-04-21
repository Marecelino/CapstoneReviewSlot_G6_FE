import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { Suspense } from 'react';
import { useAuthStore } from '@/store/authStore';
import { ROUTES, ROLE_DASHBOARD } from '@/utils/constants';

import { AppLayout } from '@/presentation/components/layout/AppLayout';
import { AuthGuard } from '@/presentation/components/layout/AuthGuard';
import { LoadingOverlay } from '@/presentation/components/feedback/LoadingOverlay';

import LoginPage from '@/presentation/pages/auth/LoginPage';
import RegisterPage from '@/presentation/pages/auth/RegisterPage';
import ManagerDashboardPage from '@/presentation/pages/manager/DashboardPage';
import CampaignListPage from '@/presentation/pages/manager/CampaignListPage';
import CampaignFormPage from '@/presentation/pages/manager/CampaignFormPage';
import LecturerListPage from '@/presentation/pages/manager/LecturerListPage';
import ImportLecturersPage from '@/presentation/pages/manager/ImportLecturersPage';
import SlotListPage from '@/presentation/pages/manager/SlotListPage';
import SlotFormPage from '@/presentation/pages/manager/SlotFormPage';
import AssignmentListPage from '@/presentation/pages/manager/AssignmentListPage';
import AssignmentFormPage from '@/presentation/pages/manager/AssignmentFormPage';
import ManageReviewersPage from '@/presentation/pages/manager/ManageReviewersPage';
import LecturerDashboardPage from '@/presentation/pages/lecturer/DashboardPage';
import RegisterAvailabilityPage from '@/presentation/pages/lecturer/RegisterAvailabilityPage';
import MyAvailabilityPage from '@/presentation/pages/lecturer/MyAvailabilityPage';
import MyReviewSchedulePage from '@/presentation/pages/lecturer/MyReviewSchedulePage';
import StudentDashboardPage from '@/presentation/pages/student/DashboardPage';
import StudentRegistrationPage from '@/presentation/pages/student/RegistrationPage';
import MyRegistrationsPage from '@/presentation/pages/student/MyRegistrationsPage';
import StudentAssignmentPage from '@/presentation/pages/student/AssignmentPage';

function RedirectByRole() {
  const { user } = useAuthStore();
  const target = user?.role ? ROLE_DASHBOARD[user.role] : ROUTES.LOGIN;
  return <Navigate to={target} replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.role) {
    const target = ROLE_DASHBOARD[user.role];
    return <Navigate to={target} replace />;
  }
  return <>{children}</>;
}

function LoadingFallback() {
  return <LoadingOverlay fullPage />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <RedirectByRole /> },

      // Manager routes
      { path: 'admin', element: <ManagerDashboardPage /> },
      { path: 'admin/campaigns', element: <CampaignListPage /> },
      { path: 'admin/campaigns/create', element: <CampaignFormPage /> },
      { path: 'admin/campaigns/:id/edit', element: <CampaignFormPage /> },
      { path: 'admin/slots', element: <SlotListPage /> },
      { path: 'admin/slots/create', element: <SlotFormPage /> },
      { path: 'admin/lecturers', element: <LecturerListPage /> },
      { path: 'admin/lecturers/import', element: <ImportLecturersPage /> },
      { path: 'admin/assignments', element: <AssignmentListPage /> },
      { path: 'admin/assignments/create', element: <AssignmentFormPage /> },
      { path: 'admin/assignments/:id/manage-reviewers', element: <ManageReviewersPage /> },

      // Lecturer routes
      { path: 'lecturer', element: <LecturerDashboardPage /> },
      { path: 'lecturer/availability', element: <RegisterAvailabilityPage /> },
      { path: 'lecturer/my-availability', element: <MyAvailabilityPage /> },
      { path: 'lecturer/my-reviews', element: <MyReviewSchedulePage /> },

      // Student routes
      { path: 'student', element: <StudentDashboardPage /> },
      { path: 'student/registration', element: <StudentRegistrationPage /> },
      { path: 'student/my-registrations', element: <MyRegistrationsPage /> },
      { path: 'student/my-assignments', element: <StudentAssignmentPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
