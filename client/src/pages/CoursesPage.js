import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../config/api';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  BookOpen,
  ChevronDown,
  X
} from 'lucide-react';

const CoursesPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Fetch courses from API
  const { data: responseData, isLoading, error } = useQuery(
    ['courses'],
    async () => {
      const response = await api.get('/api/courses');
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  // Extract courses from response
  const courses = responseData?.courses || [];

  // Filter and sort courses
  const filteredCourses = React.useMemo(() => {
    if (!courses) return [];

    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      const matchesLevel = !selectedLevel || course.level === selectedLevel;
      const matchesLanguage = !selectedLanguage || course.language === selectedLanguage;
      const matchesPrice = priceRange === 'all' || 
                          (priceRange === 'free' && course.isFree) ||
                          (priceRange === 'paid' && !course.isFree);

      return matchesSearch && matchesCategory && matchesLevel && matchesLanguage && matchesPrice;
    });

    // Sort courses
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.enrolledStudents.length - a.enrolledStudents.length);
        break;
      default:
        break;
    }

    return filtered;
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedLanguage, priceRange, sortBy]);

  // Course categories
  const categories = [
    { value: 'directing', label: t('category.directing') },
    { value: 'cinematography', label: t('category.cinematography') },
    { value: 'editing', label: t('category.editing') },
    { value: 'screenwriting', label: t('category.screenwriting') },
    { value: 'sound-design', label: t('category.sound-design') },
    { value: 'production-design', label: t('category.production-design') },
    { value: 'acting', label: t('category.acting') },
    { value: 'documentary', label: t('category.documentary') },
    { value: 'commercial', label: t('category.commercial') },
    { value: 'music-video', label: t('category.music-video') },
    { value: 'short-film', label: t('category.short-film') },
    { value: 'feature-film', label: t('category.feature-film') },
    { value: 'animation', label: t('category.animation') },
    { value: 'visual-effects', label: t('category.visual-effects') },
    { value: 'color-grading', label: t('category.color-grading') },
    { value: 'distribution', label: t('category.distribution') }
  ];

  // Course levels
  const levels = [
    { value: 'beginner', label: t('level.beginner') },
    { value: 'intermediate', label: t('level.intermediate') },
    { value: 'advanced', label: t('level.advanced') },
    { value: 'all-levels', label: t('level.all-levels') }
  ];

  // Languages
  const languages = [
    { value: 'zh', label: '中文' },
    { value: 'en', label: 'English' },
    { value: 'both', label: '中英文' }
  ];

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLevel('');
    setSelectedLanguage('');
    setPriceRange('all');
    setSortBy('newest');
  };

  // Format price
  const formatPrice = (price, currency = 'CNY') => {
    if (price === 0) return t('courses.free');
    return `${currency === 'CNY' ? '¥' : '$'}${price}`;
  };

  // Format duration
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('common.error')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('message.networkError')}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              重试
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('courses.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('courses.subtitle')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="newest">最新发布</option>
                <option value="oldest">最早发布</option>
                <option value="price-low">价格从低到高</option>
                <option value="price-high">价格从高到低</option>
                <option value="rating">评分最高</option>
                <option value="popular">最受欢迎</option>
              </select>
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">{t('courses.categories')}</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">{t('courses.levels')}</option>
                {levels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">{t('courses.languages')}</option>
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">{t('courses.price')}</option>
                <option value="free">{t('courses.free')}</option>
                <option value="paid">{t('courses.paid')}</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4 mr-2" />
              清除筛选
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            找到 {filteredCourses.length} 门课程
          </p>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCourses.map((course) => (
              <div key={course._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Course Image */}
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                  {course.thumbnail ? (
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 text-4xl">🎬</span>
                    </div>
                  )}
                  {course.isFree && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                      {t('courses.free')}
                    </div>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-2">
                    <span className="inline-block bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full">
                      {categories.find(c => c.value === course.category)?.label || course.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{formatDuration(course.totalDuration || 0)}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>{course.totalLessons || 0} 课时</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{course.enrolledStudents?.length || 0} 学生</span>
                    </div>
                  </div>

                  {/* Rating */}
                  {course.averageRating > 0 && (
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(course.averageRating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {course.averageRating.toFixed(1)} ({course.totalRatings || 0})
                      </span>
                    </div>
                  )}

                  {/* Price and Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-red-600">
                        {formatPrice(course.price, course.currency)}
                      </span>
                      {course.originalPrice && course.originalPrice > course.price && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {formatPrice(course.originalPrice, course.currency)}
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/courses/${course.slug}`}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium text-center"
                    >
                      {t('courses.viewCourse')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              没有找到相关课程
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              请尝试调整搜索条件或筛选器
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              清除所有筛选
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage; 