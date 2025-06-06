import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import ResetPassword from '../pages/public/ResetPassword';
import ChangePassword from '../pages/private/ChangePassword';
import AdminDashboard from '../pages/dashboards/AdminDashboard';

import StudentDashboard from '../pages/dashboards/StudentDashboard';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import SuperAdminLogin from '../pages/public/SuperAdminSecurityForm';
import LandingPage from '../pages/public/LandingPage';

// Super Admin Dashboard
import SuperAdminDashboard from '../pages/dashboards/SuperAdminDashboard';
import AllUsers from '../pages/private/super-admin/AllUsers';
import Courses from '../pages/private/super-admin/Courses';
import ManageOrganizations from '../pages/private/super-admin/Organizations';

// Admin pages
import OrgUsers from '../pages/private/org-admin/Users';


import Resources from '../pages/private/student/Resources';
import Assignments from '../pages/private/student/Assignments';
import Quizzes from '../pages/private/student/Quiz';
import Grades from '../pages/private/student/Grades';
import SCourses from '../pages/private/student/Courses';

import ICourses from '../pages/private/instructor/ICourses';
import Students from '../pages/private/instructor/Students';
import IQuizzes from '../pages/private/instructor/IQuizzes';
import IResources from '../pages/private/instructor/IResources';
import IAssignments from '../pages/private/instructor/IAssignments';

import InstructorDashboard from '../pages/dashboards/InstructorDashboard';
import UnAuthorized from '../pages/UnAuthorized';
import ProtectedRoute from './ProtectedRoute';
import AnonymousRoute from './AnonymousRoute';
import Overview from '../pages/private/super-admin/Overview';

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <AnonymousRoute>
          <LandingPage />
        </AnonymousRoute>
      }
    />
    <Route element={<PublicLayout />}>
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/security" element={<SuperAdminLogin />} />
    </Route>
    <Route element={<PrivateLayout />}>
      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
    </Route>
    <Route
      path="/student"
      element={
        <ProtectedRoute roles={[3]}>
          <StudentDashboard />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="courses" replace />} />
      <Route path="courses" element={<SCourses />} />
      <Route path="courses/:courseId/resources" element={<Resources />} />
      <Route path="courses/:courseId/assignments" element={<Assignments />} />
      <Route path="courses/:courseId/quizzes" element={<Quizzes />} />
      <Route path="courses/:courseId/grades" element={<Grades />} />
    </Route>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute roles={[0]}>
          <SuperAdminDashboard />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="overview" replace />} />
      <Route path="organizations" element={<ManageOrganizations />} />
      <Route path="users" element={<AllUsers />} />
      <Route path="courses" element={<Courses />} />
      <Route path="overview" element={<Overview />} />
    </Route>
    <Route
      path="/admin"
      element={
        <ProtectedRoute roles={[1]}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="users" replace />} />
      <Route path="users" element={<OrgUsers />} />
      <Route path="courses" element={<Courses />} />
    </Route>
    <Route
      path="/instructor"
      element={
        <ProtectedRoute roles={[2]}>
          <InstructorDashboard />
        </ProtectedRoute>
      }
    >
      <Route path="courses" element={<ICourses />} />
      <Route path="enroll" element={<Students />} />
      <Route path="assignments" element={<IAssignments />} />
      <Route path="resources" element={<IResources />} />
      <Route path="quizzes" element={<IQuizzes />} />
    </Route>
    <Route path="/unauthorized" element={<UnAuthorized />} />
  </Routes>
);

export default AppRoutes;
