import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Settings,
  BarChart3,
  Shield,
  DollarSign,
  Activity
} from 'lucide-react';

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
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
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
              <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
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
              <Activity className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">待审核项目</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Management Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          内容管理 / Content Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/courses"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">课程管理</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Courses</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              创建、编辑和管理课程内容 / Create, edit and manage course content
            </p>
          </Link>

          <Link
            to="/blog"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">博客管理</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Blog</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              管理博客文章和SEO内容 / Manage blog posts and SEO content
            </p>
          </Link>

          <Link
            to="/forum"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">论坛管理</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Forum</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              管理论坛帖子和社区讨论 / Manage forum posts and community discussions
            </p>
          </Link>

          <Link
            to="/events"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors">
                <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">活动管理</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Events</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              管理活动和研讨会 / Manage events and workshops
            </p>
          </Link>
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
              <Users className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-white">管理用户 / Manage Users</span>
            </Link>
            <Link
              to="/admin/teachers"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Shield className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-white">管理教师 / Manage Teachers</span>
            </Link>
            <Link
              to="/admin/reports"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <BarChart3 className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-white">查看报告 / View Reports</span>
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Settings className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-white">系统设置 / System Settings</span>
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
            <Users className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white">新用户注册: 张三</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">2分钟前</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <BookOpen className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white">新课程发布: 电影制作基础</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">15分钟前</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <DollarSign className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
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