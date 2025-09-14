import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const DashboardRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const userResponse = await authAPI.getMe();
        const userRole = userResponse.data.role;

        // Redirect based on role
        switch (userRole) {
          case 'student':
            navigate('/student/dashboard');
            break;
          case 'teacher':
            navigate('/teacher/dashboard');
            break;
          case 'parent':
            navigate('/parent/dashboard');
            break;
          case 'admin':
            navigate('/admin');
            break;
          default:
            navigate('/student/dashboard');
        }
      } catch (error) {
        // If there's an error (e.g., invalid token), redirect to login
        navigate('/login');
      }
    };

    redirectToDashboard();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardRedirect;
