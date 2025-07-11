import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import type { JSX } from 'react';
import { roleToPath } from '../types';

const AnonymousRoute = ({ children }: { children: JSX.Element }) => {
  const { token, user } = useAppSelector((state) => state.auth);

  console.log('AnonymousRoute - auth state:', { token, user });

  if (token && user) {
    const redirectPath = roleToPath[user.role];
    console.log('AnonymousRoute - redirecting to:', redirectPath);
    return <Navigate to={redirectPath ?? '/unauthorized'} />;
  }

  console.log('AnonymousRoute - rendering children');
  return children;
};

export default AnonymousRoute;
