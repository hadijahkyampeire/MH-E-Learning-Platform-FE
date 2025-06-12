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

import CourseOverview from '../pages/private/student/CourserOverview';
import StudentOverview from '../pages/private/student/StudentOverview';
import StudentProfile from '../pages/private/student/StudentProfile';

import ICourses from '../pages/private/instructor/ICourses';
import Students from '../pages/private/instructor/Students';
import IQuizzes from '../pages/private/instructor/IQuizzes';
import IResources from '../pages/private/instructor/IResources';
import IAssignments from '../pages/private/instructor/IAssignments';
import IOverview from '../pages/private/instructor/IOverview';

import InstructorDashboard from '../pages/dashboards/InstructorDashboard';
import UnAuthorized from '../pages/UnAuthorized';
import ProtectedRoute from './ProtectedRoute';
import AnonymousRoute from './AnonymousRoute';
import Overview from '../pages/private/super-admin/Overview';
import OOverview from '../pages/private/org-admin/Overview';
import AdminCourseDetails from '../pages/private/org-admin/CourseDetails';
import ICourseDetails from '../pages/private/instructor/ICourseDetails';

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
        <ProtectedRoute roles={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      }
    >
      {/* Global pages */}
      <Route index element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<StudentOverview />} />
      <Route path="profile" element={<StudentProfile />} />

      {/* Course detail routes — each course page is routed directly */}
      <Route path="courses/:id/overview" element={<CourseOverview />} />
      <Route path="courses/:id/resources" element={<Resources />} />
      <Route path="courses/:id/assignments" element={<Assignments />} />
      <Route path="courses/:id/quizzes" element={<Quizzes />} />
      <Route path="courses/:id/grades" element={<Grades />} />
    </Route>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute roles={['super_admin']}>
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
        <ProtectedRoute roles={['org_admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<OOverview />} />
      <Route path="users" element={<OrgUsers />} />
      <Route path="courses" element={<Courses />} />
      <Route path="courses/:id" element={<AdminCourseDetails />} />
    </Route>
    <Route
      path="/instructor"
      element={
        <ProtectedRoute roles={['teacher', 'assistant']}>
          <InstructorDashboard />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<IOverview />} />
      <Route path="courses" element={<ICourses />} />
      <Route path="courses/:id" element={<ICourseDetails />}>
        <Route index element={<Navigate to="enrollments" replace />} />
        <Route path="enrollments" element={<Students />} />
        <Route path="assignments" element={<IAssignments />} />
        <Route path="resources" element={<IResources />} />
        <Route path="quizzes" element={<IQuizzes />} />
      </Route>
    </Route>
    <Route path="/unauthorized" element={<UnAuthorized />} />
  </Routes>
);

export default AppRoutes;
