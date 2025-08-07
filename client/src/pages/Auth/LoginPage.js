import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showTestCredentials, setShowTestCredentials] = useState(false);

  const testCredentials = [
    {
      role: 'Admin',
      email: 'admin@filmmakerschool.com',
      password: 'admin123',
      description: 'Full access to all features'
    },
    {
      role: 'Teacher',
      email: 'teacher@filmmakerschool.com',
      password: 'teacher123',
      description: 'Can create and manage courses'
    },
    {
      role: 'Student',
      email: 'student@filmmakerschool.com',
      password: 'student123',
      description: 'Can enroll in courses and access learning materials'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const fillTestCredentials = (email, password) => {
    setFormData({ email, password });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            登录 / Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            欢迎回到电影制作学校 / Welcome back to Filmmaker School
          </p>
        </div>

        {/* Test Credentials Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
              🧪 测试账号 / Test Accounts
            </h3>
            <button
              type="button"
              onClick={() => setShowTestCredentials(!showTestCredentials)}
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              {showTestCredentials ? '隐藏 / Hide' : '显示 / Show'}
            </button>
          </div>
          
          {showTestCredentials && (
            <div className="space-y-3">
              {testCredentials.map((cred, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-700 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {cred.role}
                    </span>
                    <button
                      type="button"
                      onClick={() => fillTestCredentials(cred.email, cred.password)}
                      className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      填充 / Fill
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {cred.description}
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Email:</span>
                      <div className="flex items-center space-x-1">
                        <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">
                          {cred.email}
                        </code>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(cred.email)}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          复制
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Password:</span>
                      <div className="flex items-center space-x-1">
                        <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">
                          {cred.password}
                        </code>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(cred.password)}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          复制
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">
                邮箱 / Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="输入您的邮箱地址 / Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="form-label">
                密码 / Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input-field"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="输入您的密码 / Enter your password"
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary w-full">
            登录 / Login
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              还没有账号？ / Don't have an account?{' '}
              <a href="/register" className="text-red-600 dark:text-red-400 hover:underline">
                立即注册 / Register now
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 