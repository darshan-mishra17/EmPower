import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'teacher' | 'parent' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const location = useLocation();
  
  // Check if user is authenticated
  const token = localStorage.getItem('token');
  const userDataString = localStorage.getItem('user');
  
  if (!token || !userDataString) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  try {
    const userData = JSON.parse(userDataString);
    
    // Check if the user has the required role
    if (requiredRole && userData.role !== requiredRole) {
      // Redirect to appropriate dashboard based on user's actual role
      const redirectPath = getDashboardPath(userData.role);
      return <Navigate to={redirectPath} replace />;
    }
    
    return <>{children}</>;
  } catch (error) {
    // If user data is corrupted, clear storage and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

const getDashboardPath = (role: string): string => {
  switch (role) {
    case 'student':
      return '/student/dashboard';
    case 'teacher':
      return '/teacher/dashboard';
    case 'parent':
      return '/parent/dashboard';
    case 'admin':
      return '/admin';
    default:
      return '/login';
  }
};

export default ProtectedRoute;
