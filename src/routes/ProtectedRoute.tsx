import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import type { JSX } from 'react';

const ProtectedRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles?: number[];
}) => {
  const { token, user } = useAppSelector((state) => state.auth);
  console.log('ProtectedRoute check', {
    token,
    user,
    role: user?.role,
    roles,
    isAllowed: roles?.includes(user?.role),
  });

  if (!token || !user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role))
    return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
