import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-red-500 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          页面未找到 / Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          抱歉，您访问的页面不存在。
        </p>
        <Link to="/" className="btn-primary">
          返回首页 / Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 