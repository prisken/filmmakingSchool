import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import CourseEnrollment from '../../components/Course/CourseEnrollment';
import CourseCreator from '../../components/Course/CourseCreator';
import StudentEnrollmentManager from '../../components/Course/StudentEnrollmentManager';

const TeacherProfile = () => {
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
    specialization: user?.teacherProfile?.specialization || '',
    experience: user?.teacherProfile?.experience || ''
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
    { id: 'students', label: '我的学生', icon: '👥' },
    { id: 'assignments', label: '作业管理', icon: '📝' },
    { id: 'analytics', label: '教学数据', icon: '📊' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          教师个人资料 / Teacher Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          管理您的个人资料和教学课程 / Manage your profile and teaching courses
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
                  <label className="form-label">专业领域 / Specialization</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    disabled={!isEditing}
                    placeholder="例如: 电影导演, 摄影, 编剧"
                  />
                </div>
                <div>
                  <label className="form-label">教学经验 / Experience</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    disabled={!isEditing}
                    placeholder="例如: 10年电影行业经验"
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
                    placeholder="介绍您的教学经验和专业背景..."
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
              <CourseCreator 
                onCourseCreated={() => {
                  // Refresh course data
                  console.log('Course created successfully');
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">电影制作基础</h3>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                    进行中
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  学习电影制作的基本原理和技术
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">学生数</span>
                    <span className="text-gray-900 dark:text-white">45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">评分</span>
                    <span className="text-gray-900 dark:text-white">4.8 ⭐</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">进度</span>
                    <span className="text-gray-900 dark:text-white">75%</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 btn-primary text-sm py-2">编辑 / Edit</button>
                  <button className="flex-1 btn-secondary text-sm py-2">查看 / View</button>
                </div>
                <div className="mt-3">
                  <CourseEnrollment 
                    course={{
                      _id: 'course1',
                      title: '电影制作基础',
                      instructor: user?._id
                    }}
                    onEnrollmentComplete={() => {
                      // Refresh course data
                      console.log('Student enrolled successfully');
                    }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">高级摄影技巧</h3>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                    已完成
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  掌握专业摄影技术和构图原理
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">学生数</span>
                    <span className="text-gray-900 dark:text-white">32</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">评分</span>
                    <span className="text-gray-900 dark:text-white">4.9 ⭐</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">进度</span>
                    <span className="text-gray-900 dark:text-white">100%</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 btn-primary text-sm py-2">编辑 / Edit</button>
                  <button className="flex-1 btn-secondary text-sm py-2">查看 / View</button>
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
                    <span className="text-gray-500 dark:text-gray-400">学生数</span>
                    <span className="text-gray-900 dark:text-white">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">评分</span>
                    <span className="text-gray-900 dark:text-white">-</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">进度</span>
                    <span className="text-gray-900 dark:text-white">25%</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 btn-primary text-sm py-2">编辑 / Edit</button>
                  <button className="flex-1 btn-secondary text-sm py-2">发布 / Publish</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              我的学生 / My Students
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                  电影制作基础 - 学生管理
                </h3>
                <StudentEnrollmentManager 
                  courseId="course1"
                  courseTitle="电影制作基础"
                />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                  高级摄影技巧 - 学生管理
                </h3>
                <StudentEnrollmentManager 
                  courseId="course2"
                  courseTitle="高级摄影技巧"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                作业管理 / Assignment Management
              </h2>
              <button className="btn-primary">
                + 创建作业 / Create Assignment
              </button>
            </div>

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
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>截止日期: 2024-01-15</span>
                  <span>已提交: 12/45</span>
                </div>
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
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>截止日期: 2024-01-10</span>
                  <span>已提交: 32/32</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              教学数据 / Teaching Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">总学生数</h3>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">156</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">+8% 本月</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">活跃课程</h3>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">8</p>
                <p className="text-sm text-green-600 dark:text-green-300">+2 本月</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">平均评分</h3>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">4.8</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-300">+0.2 本月</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">完成率</h3>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">85%</p>
                <p className="text-sm text-purple-600 dark:text-purple-300">+5% 本月</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfile; 