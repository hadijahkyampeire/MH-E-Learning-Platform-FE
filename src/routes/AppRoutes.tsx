import { Routes, Route } from 'react-router-dom'
import Login from '../pages/public/Login'
import ResetPassword from '../pages/public/ResetPassword'
import ChangePassword from '../pages/private/ChangePassword'
import AdminDashboard from '../pages/dashboards/AdminDashboard'
import TeacherDashboard from '../pages/dashboards/TeacherDashboard'
import StudentDashboard from '../pages/dashboards/StudentDashboard'
import CoursePage from '../pages/private/CoursePage'

// Layouts
import PublicLayout from '../layouts/PublicLayout'
import PrivateLayout from '../layouts/PrivateLayout'
import SuperAdminLogin from '../pages/public/SuperAdminLogin'

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path='/super-admin' element={<SuperAdminLogin />}/>
    </Route>
    <Route element={<PrivateLayout />}>
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/course/:courseId" element={<CoursePage />} />
    </Route>
  </Routes>
)

export default AppRoutes
