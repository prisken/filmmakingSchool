import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import useAuth from '../../hooks/useAuth';

const RegisterPage = () => {
  const { t } = useLanguage();
  const { register, user, loading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    role: 'student'
  });

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user && !loading) {
      window.location.href = '/dashboard';
    }
  }, [user, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">加载中... / Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('auth.register')}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="form-label">
                {t('auth.firstName')}
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="input-field"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="form-label">
                {t('auth.lastName')}
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="input-field"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                {t('auth.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="form-label">
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input-field"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="country" className="form-label">
                {t('auth.country')}
              </label>
              <input
                id="country"
                name="country"
                type="text"
                required
                className="input-field"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="role" className="form-label">
                {t('auth.role')}
              </label>
              <select
                id="role"
                name="role"
                className="input-field"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="student">{t('auth.student')}</option>
                <option value="teacher">{t('auth.teacher')}</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full">
            {t('auth.register')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage; 