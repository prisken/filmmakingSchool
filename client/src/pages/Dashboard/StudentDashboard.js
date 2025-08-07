import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          学生仪表板 / Student Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          跟踪您的学习进度和课程 / Track your learning progress and courses
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <span className="text-2xl">📚</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">已注册课程</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">已完成课程</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">学习时长</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">42h</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">待完成作业</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            当前课程 / Current Courses
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">电影制作基础</h4>
                <span className="text-sm text-blue-600 dark:text-blue-400">进行中</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                学习电影制作的基本原理和技术
              </p>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>进度</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <Link
                to="/courses/filmmaking-basics"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                继续学习 →
              </Link>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">高级摄影技巧</h4>
                <span className="text-sm text-green-600 dark:text-green-400">已完成</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                掌握专业摄影技术和构图原理
              </p>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>进度</span>
                  <span>100%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <Link
                to="/courses/advanced-photography"
                className="text-sm text-green-600 dark:text-green-400 hover:underline"
              >
                查看证书 →
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            推荐课程 / Recommended Courses
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">剧本写作</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                学习如何创作引人入胜的剧本
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">¥299</span>
                <Link
                  to="/courses/screenwriting"
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  立即报名
                </Link>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">音效设计</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                掌握电影音效制作和混音技术
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">¥399</span>
                <Link
                  to="/courses/sound-design"
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  立即报名
                </Link>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">后期制作</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                学习视频剪辑和后期制作技巧
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">¥499</span>
                <Link
                  to="/courses/post-production"
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  立即报名
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            最近活动 / Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-lg mr-3">📝</span>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">提交作业: 电影制作基础 - 第3章</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">2小时前</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-lg mr-3">✅</span>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">完成课程: 高级摄影技巧</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">1天前</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-lg mr-3">⭐</span>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">获得评价: 电影制作基础 - 4星</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">2天前</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            快速操作 / Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              to="/courses"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg mr-3">🔍</span>
              <span className="text-gray-900 dark:text-white">浏览课程 / Browse Courses</span>
            </Link>
            <Link
              to="/assignments"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg mr-3">📝</span>
              <span className="text-gray-900 dark:text-white">查看作业 / View Assignments</span>
            </Link>
            <Link
              to="/certificates"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg mr-3">🏆</span>
              <span className="text-gray-900 dark:text-white">我的证书 / My Certificates</span>
            </Link>
            <Link
              to="/forum"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg mr-3">💬</span>
              <span className="text-gray-900 dark:text-white">参与讨论 / Join Discussions</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 