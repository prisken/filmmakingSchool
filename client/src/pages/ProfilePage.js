import React from 'react';
import useAuth from '../hooks/useAuth';
import AdminProfile from './Profile/AdminProfile';
import TeacherProfile from './Profile/TeacherProfile';
import StudentProfile from './Profile/StudentProfile';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ProfilePage = () => {
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
            您需要登录才能访问个人资料 / You need to login to access your profile
          </p>
        </div>
      </div>
    );
  }

  // Render appropriate profile based on user role
  switch (user.role) {
    case 'admin':
      return <AdminProfile />;
    case 'teacher':
      return <TeacherProfile />;
    case 'student':
      return <StudentProfile />;
    default:
      return <StudentProfile />; // Default to student profile
  }
};

export default ProfilePage; 