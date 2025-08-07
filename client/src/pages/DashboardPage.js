import React from 'react';
import useAuth from '../hooks/useAuth';
import AdminDashboard from './Dashboard/AdminDashboard';
import TeacherDashboard from './Dashboard/TeacherDashboard';
import StudentDashboard from './Dashboard/StudentDashboard';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const DashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            请先登录 / Please Login First
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            您需要登录才能访问仪表板 / You need to login to access the dashboard
          </p>
        </div>
      </div>
    );
  }

  // Render appropriate dashboard based on user role
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      return <StudentDashboard />; // Default to student dashboard
  }
};

export default DashboardPage; 