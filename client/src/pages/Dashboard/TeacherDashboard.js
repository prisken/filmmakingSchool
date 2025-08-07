import React from 'react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          教师仪表板 / Teacher Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          管理您的课程和学生 / Manage your courses and students
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <span className="text-2xl">📚</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">我的课程</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">总学生数</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">平均评分</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">4.8</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
              <span className="text-2xl">💬</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">待回复</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">5</p>
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
              to="/teacher/courses/create"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg mr-3">➕</span>
              <span className="text-gray-900 dark:text-white">创建新课程 / Create New Course</span>
            </Link>
            <Link
              to="/teacher/courses"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg mr-3">📚</span>
              <span className="text-gray-900 dark:text-white">管理我的课程 / Manage My Courses</span>
            </Link>
            <Link
              to="/teacher/students"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg mr-3">👥</span>
              <span className="text-gray-900 dark:text-white">查看学生 / View Students</span>
            </Link>
            <Link
              to="/teacher/assignments"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg mr-3">📝</span>
              <span className="text-gray-900 dark:text-white">作业管理 / Assignment Management</span>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            课程概览 / Course Overview
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900 dark:text-white">电影制作基础</span>
                <span className="text-sm text-blue-600 dark:text-blue-400">进行中</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>45 学生</span>
                <span>进度: 75%</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900 dark:text-white">高级摄影技巧</span>
                <span className="text-sm text-green-600 dark:text-green-400">已完成</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>32 学生</span>
                <span>进度: 100%</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900 dark:text-white">剧本写作</span>
                <span className="text-sm text-yellow-600 dark:text-yellow-400">即将开始</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>28 学生</span>
                <span>开始: 下周</span>
              </div>
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
            <span className="text-lg mr-3">📝</span>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white">新作业提交: 李四 - 电影制作基础</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">10分钟前</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-lg mr-3">👤</span>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white">新学生注册: 王五</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">1小时前</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-lg mr-3">⭐</span>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white">新评价: 高级摄影技巧 - 5星</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">2小时前</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 