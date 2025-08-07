import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const StudentProfile = () => {
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
    country: user?.country || '',
    level: user?.studentProfile?.level || 'beginner',
    interests: user?.studentProfile?.interests || [],
    goals: user?.studentProfile?.goals || ''
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
    { id: 'courses', label: '我的课程', icon: '📚' },
    { id: 'assignments', label: '我的作业', icon: '📝' },
    { id: 'certificates', label: '我的证书', icon: '🏆' },
    { id: 'progress', label: '学习进度', icon: '📊' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          学生个人资料 / Student Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          管理您的个人资料和学习进度 / Manage your profile and learning progress
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
                  <label className="form-label">学习水平 / Level</label>
                  <select
                    className="input-field"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    disabled={!isEditing}
                  >
                    <option value="beginner">初学者 / Beginner</option>
                    <option value="intermediate">中级 / Intermediate</option>
                    <option value="advanced">高级 / Advanced</option>
                    <option value="professional">专业 / Professional</option>
                  </select>
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
                  <label className="form-label">学习目标 / Learning Goals</label>
                  <textarea
                    className="input-field"
                    rows="3"
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    disabled={!isEditing}
                    placeholder="描述您的学习目标和期望..."
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
                    placeholder="介绍您的背景和学习兴趣..."
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

        {activeTab === 'courses' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                我的课程 / My Courses
              </h2>
              <button className="btn-primary">
                浏览更多课程 / Browse More Courses
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">电影制作基础</h3>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                    进行中
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  学习电影制作的基本原理和技术
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">进度</span>
                    <span className="text-gray-900 dark:text-white">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 btn-primary text-sm py-2">继续学习</button>
                  <button className="flex-1 btn-secondary text-sm py-2">查看详情</button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">高级摄影技巧</h3>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                    已完成
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  掌握专业摄影技术和构图原理
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">进度</span>
                    <span className="text-gray-900 dark:text-white">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 btn-primary text-sm py-2">查看证书</button>
                  <button className="flex-1 btn-secondary text-sm py-2">重新学习</button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">剧本写作</h3>
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                    即将开始
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  学习如何创作引人入胜的剧本
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">开始时间</span>
                    <span className="text-gray-900 dark:text-white">下周</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 btn-primary text-sm py-2">准备学习</button>
                  <button className="flex-1 btn-secondary text-sm py-2">课程详情</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              我的作业 / My Assignments
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">电影制作基础 - 第3章作业</h3>
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                    进行中
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  提交一个3分钟的电影短片，展示基本的拍摄技巧
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>截止日期: 2024-01-15</span>
                  <span>剩余时间: 3天</span>
                </div>
                <button className="btn-primary text-sm">提交作业</button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">高级摄影技巧 - 构图练习</h3>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                    已完成
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  拍摄10张照片，展示不同的构图技巧
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>提交时间: 2024-01-08</span>
                  <span>评分: 95/100</span>
                </div>
                <button className="btn-secondary text-sm">查看反馈</button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">剧本写作 - 角色设计</h3>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 rounded-full">
                    未开始
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  设计一个主要角色，包括背景故事和性格特征
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>开始时间: 2024-01-20</span>
                  <span>预计用时: 2小时</span>
                </div>
                <button className="btn-secondary text-sm" disabled>等待开始</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              我的证书 / My Certificates
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">高级摄影技巧</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  完成日期: 2024-01-10
                </p>
                <div className="space-y-2">
                  <button className="w-full btn-primary text-sm py-2">查看证书</button>
                  <button className="w-full btn-secondary text-sm py-2">下载PDF</button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">电影制作基础</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  预计完成: 2024-01-25
                </p>
                <div className="space-y-2">
                  <button className="w-full btn-secondary text-sm py-2" disabled>进行中</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              学习进度 / Learning Progress
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">总学习时长</h3>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">42h</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">+8h 本周</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">已完成课程</h3>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">2</p>
                <p className="text-sm text-green-600 dark:text-green-300">+1 本月</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">平均成绩</h3>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">92%</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-300">+3% 本月</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">连续学习</h3>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">15天</p>
                <p className="text-sm text-purple-600 dark:text-purple-300">新记录!</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">学习轨迹 / Learning Path</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white">完成高级摄影技巧课程</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2024-01-10</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 text-sm">75%</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white">电影制作基础课程进行中</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">预计完成: 2024-01-25</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">-</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 dark:text-gray-400">剧本写作课程</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">即将开始</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile; 