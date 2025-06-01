import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import type { JSX } from 'react';

const AnonymousRoute = ({ children }: { children: JSX.Element }) => {
  const { token, user } = useAppSelector((state) => state.auth);

  if (token && user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AnonymousRoute;
