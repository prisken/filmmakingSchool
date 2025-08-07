import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

const StudentEnrollmentManager = ({ courseId, courseTitle }) => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (courseId) {
      fetchEnrollments();
    }
  }, [courseId]);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/enrollments`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEnrollments(data.enrollments || []);
      } else {
        setMessage('无法获取注册信息 / Unable to fetch enrollments');
      }
    } catch (error) {
      setMessage('网络错误 / Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const updateEnrollmentStatus = async (enrollmentId, status) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/enrollments/${enrollmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        setMessage('状态更新成功 / Status updated successfully');
        fetchEnrollments(); // Refresh the list
      } else {
        setMessage('更新失败 / Update failed');
      }
    } catch (error) {
      setMessage('网络错误 / Network error');
    }
  };

  const canManageEnrollments = () => {
    // Admin can manage all enrollments
    if (user.role === 'admin') return true;
    
    // Teacher can only manage enrollments in their own courses
    // This would need to be checked against the course instructor
    if (user.role === 'teacher') return true;
    
    return false;
  };

  if (!canManageEnrollments()) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">加载中... / Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          学生注册管理 / Student Enrollment Management
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          课程: {courseTitle}
        </span>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          message.includes('成功') || message.includes('successfully')
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {message}
        </div>
      )}

      {enrollments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            暂无学生注册此课程 / No students enrolled in this course
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  学生 / Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  注册类型 / Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  注册时间 / Enrolled At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  状态 / Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  进度 / Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  操作 / Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {enrollments.map((enrollment) => (
                <tr key={enrollment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            {enrollment.student?.firstName?.charAt(0) || 'S'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {enrollment.student?.firstName} {enrollment.student?.lastName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {enrollment.student?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      enrollment.enrollmentType === 'free'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {enrollment.enrollmentType === 'free' ? '免费 / Free' : '付费 / Paid'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      enrollment.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : enrollment.status === 'suspended'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {enrollment.status === 'active' ? '活跃 / Active' : 
                       enrollment.status === 'suspended' ? '暂停 / Suspended' : 
                       '完成 / Completed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${enrollment.progress || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {enrollment.progress || 0}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="space-y-1">
                      <select
                        value={enrollment.status}
                        onChange={(e) => updateEnrollmentStatus(enrollment._id, e.target.value)}
                        className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="active">活跃 / Active</option>
                        <option value="suspended">暂停 / Suspended</option>
                        <option value="completed">完成 / Completed</option>
                      </select>
                      <button className="block w-full text-xs text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        查看详情 / View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentEnrollmentManager; 