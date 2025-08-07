import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          管理员仪表板 / Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          管理电影制作学校的各个方面 / Manage all aspects of the filmmaking school
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">总用户数</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <span className="text-2xl">📚</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">活跃课程</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">45</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">本月收入</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">¥89,420</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
              <span className="text-2xl">🎬</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">待审核项目</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            快速操作 / Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              to="/admin/users"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg mr-3">👥</span>
              <span className="text-gray-900 dark:text-white">管理用户 / Manage Users</span>
            </Link>
            <Link
              to="/admin/courses"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg mr-3">📚</span>
              <span className="text-gray-900 dark:text-white">管理课程 / Manage Courses</span>
            </Link>
            <Link
              to="/admin/teachers"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg mr-3">👨‍🏫</span>
              <span className="text-gray-900 dark:text-white">管理教师 / Manage Teachers</span>
            </Link>
            <Link
              to="/admin/reports"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg mr-3">📊</span>
              <span className="text-gray-900 dark:text-white">查看报告 / View Reports</span>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            系统状态 / System Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-gray-900 dark:text-white">服务器状态</span>
              <span className="text-green-600 dark:text-green-400">✅ 正常</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-gray-900 dark:text-white">数据库连接</span>
              <span className="text-green-600 dark:text-green-400">✅ 正常</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-gray-900 dark:text-white">存储空间</span>
              <span className="text-yellow-600 dark:text-yellow-400">⚠️ 75%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-gray-900 dark:text-white">支付系统</span>
              <span className="text-green-600 dark:text-green-400">✅ 正常</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          最近活动 / Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-lg mr-3">👤</span>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white">新用户注册: 张三</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">2分钟前</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-lg mr-3">📚</span>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white">新课程发布: 电影制作基础</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">15分钟前</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-lg mr-3">💰</span>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white">新订单: 高级课程套餐</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">1小时前</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 