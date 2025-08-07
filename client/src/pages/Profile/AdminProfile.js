import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import CourseEnrollment from '../../components/Course/CourseEnrollment';

const AdminProfile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    city: user?.city || '',
    country: user?.country || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  const tabs = [
    { id: 'profile', label: '个人资料', icon: '👤' },
    { id: 'system', label: '系统管理', icon: '⚙️' },
    { id: 'users', label: '用户管理', icon: '👥' },
    { id: 'courses', label: '课程管理', icon: '📚' },
    { id: 'analytics', label: '数据分析', icon: '📊' },
    { id: 'settings', label: '系统设置', icon: '🔧' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          管理员个人资料 / Admin Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          管理系统和个人设置 / Manage system and personal settings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {activeTab === 'profile' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                个人资料 / Personal Profile
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-primary"
              >
                {isEditing ? '取消 / Cancel' : '编辑 / Edit'}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">名字 / First Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="form-label">姓氏 / Last Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="form-label">邮箱 / Email</label>
                  <input
                    type="email"
                    className="input-field"
                    value={formData.email}
                    disabled
                  />
                </div>
                <div>
                  <label className="form-label">电话 / Phone</label>
                  <input
                    type="tel"
                    className="input-field"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="form-label">城市 / City</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="form-label">国家 / Country</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">个人简介 / Bio</label>
                  <textarea
                    className="input-field"
                    rows="4"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    取消 / Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    保存 / Save
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              系统管理 / System Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">服务器状态</h3>
                <p className="text-green-600 dark:text-green-400 text-sm">✅ 正常运行</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">CPU: 23% | 内存: 45%</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">数据库</h3>
                <p className="text-green-600 dark:text-green-400 text-sm">✅ 连接正常</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">查询: 1.2k/分钟</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">存储空间</h3>
                <p className="text-yellow-600 dark:text-yellow-400 text-sm">⚠️ 75% 已使用</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">剩余: 125GB</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              用户管理 / User Management
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      用户 / User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      角色 / Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      状态 / Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      最后登录 / Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      操作 / Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                            <span className="text-red-600 dark:text-red-400 font-medium">A</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            Admin User
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            admin@filmmakerschool.com
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        Admin
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      刚刚 / Just now
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 mr-3">
                        编辑 / Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        暂停 / Suspend
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              课程管理 / Course Management
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">电影制作基础</h3>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                    已发布
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  学习电影制作的基本原理和技术
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">讲师</span>
                    <span className="text-gray-900 dark:text-white">张老师</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">学生数</span>
                    <span className="text-gray-900 dark:text-white">45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">价格</span>
                    <span className="text-gray-900 dark:text-white">¥299</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <CourseEnrollment 
                    course={{
                      _id: 'course1',
                      title: '电影制作基础',
                      instructor: 'instructor1'
                    }}
                    onEnrollmentComplete={() => {
                      console.log('Student enrolled successfully');
                    }}
                  />
                  <div className="flex space-x-2">
                    <button className="flex-1 btn-secondary text-sm py-2">查看详情</button>
                    <button className="flex-1 btn-secondary text-sm py-2">管理学生</button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">高级摄影技巧</h3>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                    已发布
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  掌握专业摄影技术和构图原理
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">讲师</span>
                    <span className="text-gray-900 dark:text-white">李老师</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">学生数</span>
                    <span className="text-gray-900 dark:text-white">32</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">价格</span>
                    <span className="text-gray-900 dark:text-white">¥399</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <CourseEnrollment 
                    course={{
                      _id: 'course2',
                      title: '高级摄影技巧',
                      instructor: 'instructor2'
                    }}
                    onEnrollmentComplete={() => {
                      console.log('Student enrolled successfully');
                    }}
                  />
                  <div className="flex space-x-2">
                    <button className="flex-1 btn-secondary text-sm py-2">查看详情</button>
                    <button className="flex-1 btn-secondary text-sm py-2">管理学生</button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">剧本写作</h3>
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                    草稿
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  学习如何创作引人入胜的剧本
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">讲师</span>
                    <span className="text-gray-900 dark:text-white">王老师</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">学生数</span>
                    <span className="text-gray-900 dark:text-white">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">价格</span>
                    <span className="text-gray-900 dark:text-white">¥199</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <CourseEnrollment 
                    course={{
                      _id: 'course3',
                      title: '剧本写作',
                      instructor: 'instructor3'
                    }}
                    onEnrollmentComplete={() => {
                      console.log('Student enrolled successfully');
                    }}
                  />
                  <div className="flex space-x-2">
                    <button className="flex-1 btn-secondary text-sm py-2">查看详情</button>
                    <button className="flex-1 btn-secondary text-sm py-2">管理学生</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              数据分析 / Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">总用户数</h3>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">1,234</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">+12% 本月</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">活跃课程</h3>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">45</p>
                <p className="text-sm text-green-600 dark:text-green-300">+5% 本月</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">月收入</h3>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">¥89,420</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-300">+8% 本月</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">完成率</h3>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">78%</p>
                <p className="text-sm text-purple-600 dark:text-purple-300">+3% 本月</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              系统设置 / System Settings
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">维护模式</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">暂时关闭网站进行维护</p>
                </div>
                <button className="btn-secondary">启用 / Enable</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">自动备份</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">每日自动备份数据库</p>
                </div>
                <button className="btn-primary">配置 / Configure</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">邮件通知</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">系统事件邮件通知</p>
                </div>
                <button className="btn-primary">设置 / Settings</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile; 