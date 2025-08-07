import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const CourseCreator = ({ onCourseCreated }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: 'filmmaking',
    level: 'beginner',
    duration: '',
    language: 'zh',
    status: 'draft'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          instructor: user._id,
          slug: formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('课程创建成功！/ Course created successfully!');
        setFormData({
          title: '',
          description: '',
          price: 0,
          category: 'filmmaking',
          level: 'beginner',
          duration: '',
          language: 'zh',
          status: 'draft'
        });
        setIsOpen(false);
        if (onCourseCreated) {
          onCourseCreated();
        }
      } else {
        setMessage(data.message || '创建失败，请重试 / Creation failed, please try again');
      }
    } catch (error) {
      setMessage('网络错误，请重试 / Network error, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.role !== 'teacher' && user?.role !== 'admin') {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary"
      >
        + 创建新课程 / Create New Course
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                创建新课程 / Create New Course
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="form-label">课程标题 / Course Title</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="输入课程标题 / Enter course title"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="form-label">课程描述 / Course Description</label>
                  <textarea
                    className="input-field"
                    rows="4"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="描述课程内容和学习目标 / Describe course content and learning objectives"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">价格 / Price (¥)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="form-label">课程时长 / Duration</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="例如: 10小时 / e.g. 10 hours"
                  />
                </div>

                <div>
                  <label className="form-label">分类 / Category</label>
                  <select
                    className="input-field"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="filmmaking">电影制作 / Filmmaking</option>
                    <option value="photography">摄影 / Photography</option>
                    <option value="screenwriting">剧本写作 / Screenwriting</option>
                    <option value="editing">后期制作 / Video Editing</option>
                    <option value="sound">音效设计 / Sound Design</option>
                    <option value="acting">表演 / Acting</option>
                    <option value="producing">制片 / Producing</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">难度等级 / Level</label>
                  <select
                    className="input-field"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  >
                    <option value="beginner">初学者 / Beginner</option>
                    <option value="intermediate">中级 / Intermediate</option>
                    <option value="advanced">高级 / Advanced</option>
                    <option value="professional">专业 / Professional</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">语言 / Language</label>
                  <select
                    className="input-field"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  >
                    <option value="zh">中文 / Chinese</option>
                    <option value="en">英文 / English</option>
                    <option value="both">双语 / Bilingual</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">状态 / Status</label>
                  <select
                    className="input-field"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="draft">草稿 / Draft</option>
                    <option value="published">已发布 / Published</option>
                    <option value="archived">已归档 / Archived</option>
                  </select>
                </div>
              </div>

              {message && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${
                  message.includes('成功') || message.includes('successfully')
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {message}
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  取消 / Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? '创建中... / Creating...' : '创建课程 / Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCreator; 