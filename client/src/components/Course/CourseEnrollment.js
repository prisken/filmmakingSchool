import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const CourseEnrollment = ({ course, onEnrollmentComplete }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [enrollmentType, setEnrollmentType] = useState('free');
  const [studentEmail, setStudentEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEnrollment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          courseId: course._id,
          studentEmail,
          enrollmentType,
          enrolledBy: user._id,
          enrolledByRole: user.role
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('学生已成功注册课程！/ Student successfully enrolled!');
        setStudentEmail('');
        setIsOpen(false);
        if (onEnrollmentComplete) {
          onEnrollmentComplete();
        }
      } else {
        setMessage(data.message || '注册失败，请重试 / Enrollment failed, please try again');
      }
    } catch (error) {
      setMessage('网络错误，请重试 / Network error, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const canEnrollStudents = () => {
    // Admin can enroll students in any course
    if (user.role === 'admin') return true;
    
    // Teacher can only enroll students in their own courses
    if (user.role === 'teacher' && course.instructor === user._id) return true;
    
    return false;
  };

  if (!canEnrollStudents()) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary"
      >
        {user.role === 'admin' ? '注册学生 / Enroll Student' : '注册学生到我的课程 / Enroll Student'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                注册学生 / Enroll Student
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEnrollment}>
              <div className="space-y-4">
                <div>
                  <label className="form-label">学生邮箱 / Student Email</label>
                  <input
                    type="email"
                    className="input-field"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="输入学生邮箱地址 / Enter student email"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">注册类型 / Enrollment Type</label>
                  <select
                    className="input-field"
                    value={enrollmentType}
                    onChange={(e) => setEnrollmentType(e.target.value)}
                  >
                    <option value="free">免费 / Free</option>
                    <option value="paid">付费 / Paid</option>
                  </select>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    课程信息 / Course Information
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>课程名称 / Course:</strong> {course.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>注册类型 / Type:</strong> {enrollmentType === 'free' ? '免费 / Free' : '付费 / Paid'}
                  </p>
                  {enrollmentType === 'paid' && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>价格 / Price:</strong> ¥{course.price}
                    </p>
                  )}
                </div>

                {message && (
                  <div className={`p-3 rounded-lg text-sm ${
                    message.includes('成功') || message.includes('successfully')
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {message}
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 btn-secondary"
                    disabled={isLoading}
                  >
                    取消 / Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? '注册中... / Enrolling...' : '确认注册 / Confirm Enrollment'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseEnrollment; 