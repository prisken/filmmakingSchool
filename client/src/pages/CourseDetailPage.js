import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle, 
  Play,
  Download,
  MessageCircle,
  Share2,
  Heart,
  Award,
  Globe,
  Calendar,
  User,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import toast from 'react-hot-toast';

const CourseDetailPage = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedLessons, setExpandedLessons] = useState(new Set());

  // Fetch course details
  const { data: responseData, isLoading, error } = useQuery(
    ['course', slug],
    async () => {
      const response = await axios.get(`/api/courses/${slug}`);
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  // Extract course from response
  const course = responseData?.course;

  // Fetch course lessons
  const { data: lessonsResponse } = useQuery(
    ['course-lessons', slug],
    async () => {
      const response = await axios.get(`/api/courses/${slug}/lessons`);
      return response.data;
    },
    {
      enabled: !!course,
      staleTime: 5 * 60 * 1000,
    }
  );

  // Extract lessons from response
  const lessons = lessonsResponse?.lessons || [];

  // Enrollment mutation
  const enrollMutation = useMutation(
    async () => {
      const response = await axios.post(`/api/courses/${slug}/enroll`);
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success(t('message.courseEnrolled'));
        queryClient.invalidateQueries(['course', slug]);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || t('message.errorOccurred'));
      },
    }
  );

  // Toggle lesson expansion
  const toggleLesson = (lessonId) => {
    const newExpanded = new Set(expandedLessons);
    if (newExpanded.has(lessonId)) {
      newExpanded.delete(lessonId);
    } else {
      newExpanded.add(lessonId);
    }
    setExpandedLessons(newExpanded);
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

  // Check if user is enrolled
  const isEnrolled = course?.enrolledStudents?.some(
    enrollment => enrollment.student === user?._id
  );

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
              课程未找到或加载失败
            </p>
            <Link
              to="/courses"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              返回课程列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Course Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="inline-block bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm px-3 py-1 rounded-full">
                  {t(`category.${course.category}`)}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {course.subtitle}
              </p>
              
              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  <span>{course.averageRating?.toFixed(1) || '0'} ({course.totalRatings || 0})</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{course.enrolledStudents?.length || 0} 学生</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{formatDuration(course.totalDuration || 0)}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>{course.totalLessons || 0} 课时</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>{t(`level.${course.level}`)}</span>
                </div>
              </div>

              {/* Instructor */}
              {course.instructor && (
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">讲师</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {course.instructor.firstName} {course.instructor.lastName}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
                {/* Course Image */}
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 overflow-hidden">
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
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-red-600">
                      {formatPrice(course.price, course.currency)}
                    </span>
                    {course.originalPrice && course.originalPrice > course.price && (
                      <span className="ml-3 text-lg text-gray-500 line-through">
                        {formatPrice(course.originalPrice, course.currency)}
                      </span>
                    )}
                  </div>
                  {course.isFree && (
                    <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-2 py-1 rounded mt-2">
                      {t('courses.free')}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {isEnrolled ? (
                    <Link
                      to={`/courses/${slug}/learn`}
                      className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      继续学习
                    </Link>
                  ) : (
                    <button
                      onClick={() => enrollMutation.mutate()}
                      disabled={enrollMutation.isLoading || !user}
                      className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {enrollMutation.isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          {user ? '立即报名' : '登录后报名'}
                        </>
                      )}
                    </button>
                  )}
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Heart className="w-4 h-4 mr-2" />
                      收藏
                    </button>
                    <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Share2 className="w-4 h-4 mr-2" />
                      分享
                    </button>
                  </div>
                </div>

                {/* Course Features */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">课程特色</h4>
                  <ul className="space-y-2">
                    {course.features?.certificate && (
                      <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Award className="w-4 h-4 mr-2 text-green-500" />
                        完成证书
                      </li>
                    )}
                    {course.features?.lifetimeAccess && (
                      <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2 text-green-500" />
                        终身访问
                      </li>
                    )}
                    {course.features?.downloadableContent && (
                      <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Download className="w-4 h-4 mr-2 text-green-500" />
                        可下载内容
                      </li>
                    )}
                    {course.features?.liveSessions && (
                      <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                        直播答疑
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: '课程概览' },
              { id: 'curriculum', label: '课程大纲' },
              { id: 'reviews', label: '学员评价' },
              { id: 'instructor', label: '讲师介绍' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    课程描述
                  </h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {course.longDescription || course.description}
                    </p>
                  </div>
                </div>

                {/* Learning Outcomes */}
                {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      学习目标
                    </h3>
                    <ul className="space-y-2">
                      {course.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Prerequisites */}
                {course.prerequisites && course.prerequisites.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      前置要求
                    </h3>
                    <ul className="space-y-2">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-400">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {course.requirements && course.requirements.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      技术要求
                    </h3>
                    <ul className="space-y-2">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-400">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  课程大纲
                </h3>
                {lessons && lessons.length > 0 ? (
                  <div className="space-y-2">
                    {lessons.map((lesson, index) => (
                      <div key={lesson._id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button
                          onClick={() => toggleLesson(lesson._id)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {lesson.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {formatDuration(lesson.duration || 0)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {lesson.isFree && (
                              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                                {t('courses.free')}
                              </span>
                            )}
                            {expandedLessons.has(lesson._id) ? (
                              <ChevronUp className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            )}
                          </div>
                        </button>
                        
                        {expandedLessons.has(lesson._id) && (
                          <div className="px-4 pb-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {lesson.description}
                            </p>
                            {lesson.resources && lesson.resources.length > 0 && (
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                  课程资源:
                                </h5>
                                {lesson.resources.map((resource, resIndex) => (
                                  <div key={resIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                    <Download className="w-4 h-4 mr-2" />
                                    <span>{resource.title}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    课程大纲正在准备中...
                  </p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  学员评价
                </h3>
                {course.ratings && course.ratings.length > 0 ? (
                  <div className="space-y-6">
                    {course.ratings.map((rating, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {rating.student?.firstName} {rating.student?.lastName}
                              </p>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < rating.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(rating.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {rating.review && (
                          <p className="text-gray-600 dark:text-gray-400">
                            {rating.review}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    暂无评价，成为第一个评价的人！
                  </p>
                )}
              </div>
            )}

            {activeTab === 'instructor' && course.instructor && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  讲师介绍
                </h3>
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-10 h-10 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {course.instructor.firstName} {course.instructor.lastName}
                    </h4>
                    {course.instructor.teacherProfile?.specialization && (
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        专业领域: {course.instructor.teacherProfile.specialization}
                      </p>
                    )}
                    {course.instructor.teacherProfile?.experience && (
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        经验: {course.instructor.teacherProfile.experience}
                      </p>
                    )}
                    {course.instructor.teacherProfile?.bio && (
                      <p className="text-gray-600 dark:text-gray-400">
                        {course.instructor.teacherProfile.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                课程信息
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">课程时长</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDuration(course.totalDuration || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">课时数量</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {course.totalLessons || 0} 课时
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">难度等级</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {t(`level.${course.level}`)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">授课语言</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {course.language === 'zh' ? '中文' : course.language === 'en' ? 'English' : '中英文'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">学员数量</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {course.enrolledStudents?.length || 0} 人
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">更新时间</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage; 