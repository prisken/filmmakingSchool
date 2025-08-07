import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Play, Users, BookOpen, Award, Globe } from 'lucide-react';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  {t('home.hero.cta')}
                </Link>
                <button className="inline-flex items-center px-8 py-3 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-colors">
                  <Play className="w-5 h-5 mr-2" />
                  {t('home.hero.watchVideo')}
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-800 rounded-lg p-8">
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-6xl">🎬</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                10,000+
              </div>
              <div className="text-gray-600 dark:text-gray-400">{t('home.stats.students')}</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="w-12 h-12 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                200+
              </div>
              <div className="text-gray-600 dark:text-gray-400">{t('home.stats.courses')}</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="w-12 h-12 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                50+
              </div>
              <div className="text-gray-600 dark:text-gray-400">{t('home.stats.teachers')}</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Globe className="w-12 h-12 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                100+
              </div>
              <div className="text-gray-600 dark:text-gray-400">{t('home.stats.countries')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('home.features.professional')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.features.professional.desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('home.features.practical')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.features.practical.desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('home.features.flexible')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.features.flexible.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('courses.featured')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('courses.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample Course Cards */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-4xl">🎬</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  电影制作基础
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  学习专业的电影制作技能，从剧本创作到后期制作
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-600">¥299</span>
                  <Link
                    to="/courses"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    {t('courses.viewCourse')}
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-4xl">📹</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  摄影技巧进阶
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  掌握高级摄影技巧，提升画面质量和视觉表现力
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-600">¥399</span>
                  <Link
                    to="/courses"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    {t('courses.viewCourse')}
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-4xl">✂️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  后期制作精修
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  学习专业的后期制作技巧，让作品更加完美
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-600">¥499</span>
                  <Link
                    to="/courses"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    {t('courses.viewCourse')}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              {t('courses.viewCourse')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            准备好开始您的电影制作之旅了吗？
          </h2>
          <p className="text-xl mb-8 text-red-100">
            加入我们的学习社区，与全球电影制作人一起成长
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t('nav.register')}
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              {t('courses.viewCourse')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 