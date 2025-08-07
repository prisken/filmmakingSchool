import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const LanguageContext = createContext();

// Comprehensive translations
const resources = {
  zh: {
    translation: {
      // Navigation
      'nav.home': '首页',
      'nav.courses': '课程',
      'nav.forum': '论坛',
      'nav.blog': '博客',
      'nav.events': '活动',
      'nav.login': '登录',
      'nav.register': '注册',
      'nav.dashboard': '仪表板',
      'nav.profile': '个人资料',
      'nav.logout': '退出登录',
      'nav.admin': '管理',
      'nav.teacher': '教师面板',
      
      // Common
      'common.loading': '加载中...',
      'common.error': '错误',
      'common.success': '成功',
      'common.cancel': '取消',
      'common.save': '保存',
      'common.edit': '编辑',
      'common.delete': '删除',
      'common.view': '查看',
      'common.search': '搜索',
      'common.filter': '筛选',
      'common.sort': '排序',
      'common.next': '下一步',
      'common.previous': '上一步',
      'common.submit': '提交',
      'common.back': '返回',
      'common.close': '关闭',
      'common.yes': '是',
      'common.no': '否',
      'common.all': '全部',
      'common.none': '无',
      
      // Authentication
      'auth.login': '登录',
      'auth.register': '注册',
      'auth.logout': '退出登录',
      'auth.email': '邮箱',
      'auth.password': '密码',
      'auth.confirmPassword': '确认密码',
      'auth.firstName': '名字',
      'auth.lastName': '姓氏',
      'auth.country': '国家',
      'auth.role': '角色',
      'auth.student': '学生',
      'auth.teacher': '教师',
      'auth.admin': '管理员',
      'auth.forgotPassword': '忘记密码？',
      'auth.rememberMe': '记住我',
      'auth.loginSuccess': '登录成功！',
      'auth.registerSuccess': '注册成功！',
      'auth.logoutSuccess': '已退出登录',
      'auth.invalidCredentials': '邮箱或密码错误',
      'auth.emailExists': '该邮箱已被注册',
      'auth.passwordMismatch': '密码不匹配',
      
      // Home Page
      'home.hero.title': '电影制作学校',
      'home.hero.subtitle': '学习专业的电影制作技能，开启您的电影制作之旅',
      'home.hero.cta': '开始学习',
      'home.hero.watchVideo': '观看介绍视频',
      'home.stats.students': '学生',
      'home.stats.courses': '课程',
      'home.stats.teachers': '导师',
      'home.stats.countries': '国家',
      'home.features.title': '为什么选择我们',
      'home.features.subtitle': '专业的教学团队，丰富的实践经验，灵活的学习方式',
      'home.features.professional': '专业导师',
      'home.features.professional.desc': '来自电影行业的资深专业人士，拥有丰富的实践经验',
      'home.features.practical': '实践导向',
      'home.features.practical.desc': '注重实践操作，通过项目制作提升技能',
      'home.features.flexible': '灵活学习',
      'home.features.flexible.desc': '随时随地学习，按照自己的节奏掌握技能',
      
      // Courses
      'courses.title': '课程',
      'courses.subtitle': '探索我们的专业电影制作课程',
      'courses.enroll': '报名',
      'courses.free': '免费',
      'courses.paid': '付费',
      'courses.viewCourse': '查看课程',
      'courses.learnMore': '了解更多',
      'courses.categories': '课程分类',
      'courses.levels': '难度等级',
      'courses.languages': '语言',
      'courses.price': '价格',
      'courses.duration': '时长',
      'courses.lessons': '课时',
      'courses.instructor': '讲师',
      'courses.rating': '评分',
      'courses.students': '学生数',
      'courses.featured': '精选课程',
      'courses.popular': '热门课程',
      'courses.new': '新课程',
      'courses.all': '全部课程',
      
      // Course Categories
                                          'category.directing': '导演',
                  'category.cinematography': '摄影',
                  'category.editing': '剪辑',
                  'category.screenwriting': '编剧',
                  'category.sound-design': '音效设计',
                  'category.production-design': '美术设计',
                  'category.acting': '表演',
                  'category.documentary': '纪录片',
                  'category.commercial': '广告',
                  'category.music-video': '音乐视频',
                  'category.short-film': '短片',
                  'category.feature-film': '长片',
                  'category.animation': '动画',
                  'category.visual-effects': '视觉特效',
                  'category.color-grading': '调色',
                  'category.distribution': '发行',
      
      // Course Levels
      'level.beginner': '初级',
      'level.intermediate': '中级',
      'level.advanced': '高级',
      'level.all-levels': '所有级别',
      
      // Dashboard
      'dashboard.title': '仪表板',
      'dashboard.welcome': '欢迎回来',
      'dashboard.myCourses': '我的课程',
      'dashboard.progress': '学习进度',
      'dashboard.assignments': '作业',
      'dashboard.discussions': '讨论',
      'dashboard.certificates': '证书',
      'dashboard.analytics': '数据分析',
      'dashboard.settings': '设置',
      
      // Profile
      'profile.title': '个人资料',
      'profile.edit': '编辑资料',
      'profile.save': '保存更改',
      'profile.cancel': '取消',
      'profile.avatar': '头像',
      'profile.bio': '个人简介',
      'profile.phone': '电话',
      'profile.address': '地址',
      'profile.website': '网站',
      'profile.social': '社交媒体',
      'profile.preferences': '偏好设置',
      'profile.notifications': '通知设置',
      'profile.privacy': '隐私设置',
      'profile.security': '安全设置',
      
      // Forum
      'forum.title': '论坛',
      'forum.subtitle': '与其他学习者交流讨论',
      'forum.createPost': '发布帖子',
      'forum.reply': '回复',
      'forum.like': '点赞',
      'forum.share': '分享',
      'forum.report': '举报',
      'forum.categories': '分类',
      'forum.tags': '标签',
      'forum.search': '搜索帖子',
      'forum.popular': '热门',
      'forum.recent': '最新',
      'forum.trending': '趋势',
      
      // Blog
      'blog.title': '博客',
      'blog.subtitle': '电影制作技巧和行业资讯',
      'blog.readMore': '阅读更多',
      'blog.author': '作者',
      'blog.date': '发布日期',
      'blog.category': '分类',
      'blog.tags': '标签',
      'blog.share': '分享文章',
      'blog.comments': '评论',
      'blog.related': '相关文章',
      
      // Events
      'events.title': '活动',
      'events.subtitle': '电影制作相关活动和项目',
      'events.upcoming': '即将到来',
      'events.past': '已结束',
      'events.register': '报名参加',
      'events.details': '活动详情',
      'events.location': '地点',
      'events.date': '日期',
      'events.time': '时间',
      'events.organizer': '组织者',
      'events.capacity': '容量',
      'events.price': '价格',
      
      // Messages
      'message.welcome': '欢迎来到电影制作学校！',
      'message.courseEnrolled': '课程报名成功！',
      'message.courseCompleted': '恭喜完成课程！',
      'message.profileUpdated': '个人资料已更新',
      'message.settingsSaved': '设置已保存',
      'message.errorOccurred': '发生错误，请重试',
      'message.networkError': '网络连接错误',
      'message.unauthorized': '请先登录',
      'message.forbidden': '没有权限访问此页面',
      'message.notFound': '页面未找到',
      
      // Actions
      'action.create': '创建',
      'action.update': '更新',
      'action.delete': '删除',
      'action.upload': '上传',
      'action.download': '下载',
      'action.export': '导出',
      'action.import': '导入',
      'action.publish': '发布',
      'action.unpublish': '取消发布',
      'action.approve': '批准',
      'action.reject': '拒绝',
      'action.block': '屏蔽',
      'action.unblock': '取消屏蔽'
    }
  },
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.courses': 'Courses',
      'nav.forum': 'Forum',
      'nav.blog': 'Blog',
      'nav.events': 'Events',
      'nav.login': 'Login',
      'nav.register': 'Register',
      'nav.dashboard': 'Dashboard',
      'nav.profile': 'Profile',
      'nav.logout': 'Logout',
      'nav.admin': 'Admin',
      'nav.teacher': 'Teacher Panel',
      
      // Common
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'common.cancel': 'Cancel',
      'common.save': 'Save',
      'common.edit': 'Edit',
      'common.delete': 'Delete',
      'common.view': 'View',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.sort': 'Sort',
      'common.next': 'Next',
      'common.previous': 'Previous',
      'common.submit': 'Submit',
      'common.back': 'Back',
      'common.close': 'Close',
      'common.yes': 'Yes',
      'common.no': 'No',
      'common.all': 'All',
      'common.none': 'None',
      
      // Authentication
      'auth.login': 'Login',
      'auth.register': 'Register',
      'auth.logout': 'Logout',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.firstName': 'First Name',
      'auth.lastName': 'Last Name',
      'auth.country': 'Country',
      'auth.role': 'Role',
      'auth.student': 'Student',
      'auth.teacher': 'Teacher',
      'auth.admin': 'Admin',
      'auth.forgotPassword': 'Forgot Password?',
      'auth.rememberMe': 'Remember Me',
      'auth.loginSuccess': 'Login successful!',
      'auth.registerSuccess': 'Registration successful!',
      'auth.logoutSuccess': 'Logged out successfully',
      'auth.invalidCredentials': 'Invalid email or password',
      'auth.emailExists': 'Email already exists',
      'auth.passwordMismatch': 'Passwords do not match',
      
      // Home Page
      'home.hero.title': 'Filmmaker School',
      'home.hero.subtitle': 'Learn professional filmmaking skills and start your filmmaking journey',
      'home.hero.cta': 'Start Learning',
      'home.hero.watchVideo': 'Watch Intro Video',
      'home.stats.students': 'Students',
      'home.stats.courses': 'Courses',
      'home.stats.teachers': 'Teachers',
      'home.stats.countries': 'Countries',
      'home.features.title': 'Why Choose Us',
      'home.features.subtitle': 'Professional teaching team, rich practical experience, flexible learning approach',
      'home.features.professional': 'Professional Instructors',
      'home.features.professional.desc': 'Senior professionals from the film industry with rich practical experience',
      'home.features.practical': 'Practice-Oriented',
      'home.features.practical.desc': 'Focus on practical operations, improve skills through project production',
      'home.features.flexible': 'Flexible Learning',
      'home.features.flexible.desc': 'Learn anytime, anywhere, master skills at your own pace',
      
      // Courses
      'courses.title': 'Courses',
      'courses.subtitle': 'Explore our professional filmmaking courses',
      'courses.enroll': 'Enroll',
      'courses.free': 'Free',
      'courses.paid': 'Paid',
      'courses.viewCourse': 'View Course',
      'courses.learnMore': 'Learn More',
      'courses.categories': 'Categories',
      'courses.levels': 'Levels',
      'courses.languages': 'Languages',
      'courses.price': 'Price',
      'courses.duration': 'Duration',
      'courses.lessons': 'Lessons',
      'courses.instructor': 'Instructor',
      'courses.rating': 'Rating',
      'courses.students': 'Students',
      'courses.featured': 'Featured Courses',
      'courses.popular': 'Popular Courses',
      'courses.new': 'New Courses',
      'courses.all': 'All Courses',
      
      // Course Categories
                                          'category.directing': 'Directing',
                  'category.cinematography': 'Cinematography',
                  'category.editing': 'Editing',
                  'category.screenwriting': 'Screenwriting',
                  'category.sound-design': 'Sound Design',
                  'category.production-design': 'Production Design',
                  'category.acting': 'Acting',
                  'category.documentary': 'Documentary',
                  'category.commercial': 'Commercial',
                  'category.music-video': 'Music Video',
                  'category.short-film': 'Short Film',
                  'category.feature-film': 'Feature Film',
                  'category.animation': 'Animation',
                  'category.visual-effects': 'Visual Effects',
                  'category.color-grading': 'Color Grading',
                  'category.distribution': 'Distribution',
      
      // Course Levels
      'level.beginner': 'Beginner',
      'level.intermediate': 'Intermediate',
      'level.advanced': 'Advanced',
      'level.all-levels': 'All Levels',
      
      // Dashboard
      'dashboard.title': 'Dashboard',
      'dashboard.welcome': 'Welcome back',
      'dashboard.myCourses': 'My Courses',
      'dashboard.progress': 'Progress',
      'dashboard.assignments': 'Assignments',
      'dashboard.discussions': 'Discussions',
      'dashboard.certificates': 'Certificates',
      'dashboard.analytics': 'Analytics',
      'dashboard.settings': 'Settings',
      
      // Profile
      'profile.title': 'Profile',
      'profile.edit': 'Edit Profile',
      'profile.save': 'Save Changes',
      'profile.cancel': 'Cancel',
      'profile.avatar': 'Avatar',
      'profile.bio': 'Bio',
      'profile.phone': 'Phone',
      'profile.address': 'Address',
      'profile.website': 'Website',
      'profile.social': 'Social Media',
      'profile.preferences': 'Preferences',
      'profile.notifications': 'Notifications',
      'profile.privacy': 'Privacy',
      'profile.security': 'Security',
      
      // Forum
      'forum.title': 'Forum',
      'forum.subtitle': 'Discuss and connect with other learners',
      'forum.createPost': 'Create Post',
      'forum.reply': 'Reply',
      'forum.like': 'Like',
      'forum.share': 'Share',
      'forum.report': 'Report',
      'forum.categories': 'Categories',
      'forum.tags': 'Tags',
      'forum.search': 'Search Posts',
      'forum.popular': 'Popular',
      'forum.recent': 'Recent',
      'forum.trending': 'Trending',
      
      // Blog
      'blog.title': 'Blog',
      'blog.subtitle': 'Filmmaking tips and industry insights',
      'blog.readMore': 'Read More',
      'blog.author': 'Author',
      'blog.date': 'Published Date',
      'blog.category': 'Category',
      'blog.tags': 'Tags',
      'blog.share': 'Share Article',
      'blog.comments': 'Comments',
      'blog.related': 'Related Articles',
      
      // Events
      'events.title': 'Events',
      'events.subtitle': 'Filmmaking events and projects',
      'events.upcoming': 'Upcoming',
      'events.past': 'Past',
      'events.register': 'Register',
      'events.details': 'Event Details',
      'events.location': 'Location',
      'events.date': 'Date',
      'events.time': 'Time',
      'events.organizer': 'Organizer',
      'events.capacity': 'Capacity',
      'events.price': 'Price',
      
      // Messages
      'message.welcome': 'Welcome to Filmmaker School!',
      'message.courseEnrolled': 'Successfully enrolled in course!',
      'message.courseCompleted': 'Congratulations on completing the course!',
      'message.profileUpdated': 'Profile updated successfully',
      'message.settingsSaved': 'Settings saved successfully',
      'message.errorOccurred': 'An error occurred, please try again',
      'message.networkError': 'Network connection error',
      'message.unauthorized': 'Please login first',
      'message.forbidden': 'You do not have permission to access this page',
      'message.notFound': 'Page not found',
      
      // Actions
      'action.create': 'Create',
      'action.update': 'Update',
      'action.delete': 'Delete',
      'action.upload': 'Upload',
      'action.download': 'Download',
      'action.export': 'Export',
      'action.import': 'Import',
      'action.publish': 'Publish',
      'action.unpublish': 'Unpublish',
      'action.approve': 'Approve',
      'action.reject': 'Reject',
      'action.block': 'Block',
      'action.unblock': 'Unblock'
    }
  }
};

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'zh',
  interpolation: { escapeValue: false },
  react: {
    useSuspense: false
  }
});

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('language') || 'zh'
  );

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t: i18n.t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext; 