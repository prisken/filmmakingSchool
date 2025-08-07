const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Course = require('../models/Course');
const Blog = require('../models/Blog');
const Event = require('../models/Event');
const Forum = require('../models/Forum');

const router = express.Router();

// @route   POST /api/setup/populate
// @desc    Populate database with sample data (development only)
router.post('/populate', async (req, res) => {
  try {
    // Only allow in development or with a secret key
    if (process.env.NODE_ENV === 'production' && req.headers['x-setup-key'] !== process.env.SETUP_SECRET_KEY) {
      return res.status(403).json({ message: 'Not allowed in production' });
    }

    console.log('🚀 Starting database population...');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Blog.deleteMany({});
    await Event.deleteMany({});
    await Forum.deleteMany({});

    console.log('🗑️ Cleared existing data');

    // Create test users
    const adminPassword = await bcrypt.hash('admin123', 12);
    const teacherPassword = await bcrypt.hash('teacher123', 12);
    const studentPassword = await bcrypt.hash('student123', 12);

    const testUsers = [
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@filmmakerschool.com',
        password: adminPassword,
        role: 'admin',
        status: 'active',
        country: 'China',
        city: 'Beijing',
        preferredLanguage: 'zh',
        experienceLevel: 'professional',
        interests: ['directing', 'cinematography', 'editing'],
        bio: 'System administrator with full access to all features.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Teacher',
        lastName: 'User',
        email: 'teacher@filmmakerschool.com',
        password: teacherPassword,
        role: 'teacher',
        status: 'active',
        country: 'China',
        city: 'Shanghai',
        preferredLanguage: 'zh',
        experienceLevel: 'professional',
        interests: ['directing', 'screenwriting', 'feature-film'],
        bio: 'Experienced filmmaking instructor with expertise in directing and screenwriting.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Student',
        lastName: 'User',
        email: 'student@filmmakerschool.com',
        password: studentPassword,
        role: 'student',
        status: 'active',
        country: 'China',
        city: 'Guangzhou',
        preferredLanguage: 'zh',
        experienceLevel: 'beginner',
        interests: ['cinematography', 'editing', 'short-film'],
        bio: 'Passionate student learning filmmaking fundamentals.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      }
    ];

    const createdUsers = await User.insertMany(testUsers);
    const adminUser = createdUsers.find(u => u.role === 'admin');
    const teacherUser = createdUsers.find(u => u.role === 'teacher');
    const studentUser = createdUsers.find(u => u.role === 'student');

    console.log('✅ Created test users');

    // Create sample courses
    const sampleCourses = [
      {
        title: "电影制作基础入门",
        subtitle: "从零开始学习电影制作",
        description: "适合初学者的电影制作基础课程，涵盖摄影、剪辑和故事讲述的基本技能。",
        longDescription: "在这个全面的入门课程中，您将学习电影制作的核心概念和实践技能。",
        category: "directing",
        level: "beginner",
        thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop",
        price: 199,
        originalPrice: 299,
        currency: "CNY",
        isFree: false,
        status: "published",
        publishedAt: new Date(),
        prerequisites: ["对电影制作有兴趣", "基本的电脑操作能力"],
        learningOutcomes: [
          "了解电影制作基本流程",
          "掌握基础摄影技巧",
          "学会简单剪辑操作",
          "理解故事结构设计",
          "掌握团队协作方法"
        ],
        requirements: ["电脑", "智能手机", "剪辑软件"],
        tags: ["电影制作", "入门", "基础", "摄影", "剪辑"],
        features: {
          certificate: true,
          lifetimeAccess: true,
          downloadableContent: true,
          liveSessions: false,
          oneOnOneSupport: false,
          mobileAccess: true,
          offlineDownload: false,
          exerciseFiles: true,
          closedCaptions: true,
          multipleLanguages: false
        },
        forumEnabled: true,
        slug: "filmmaking-basics-intro",
        totalDuration: 300,
        totalLessons: 5,
        estimatedTime: "5h",
        version: "1.0",
        difficulty: "beginner",
        instructor: teacherUser._id
      },
      {
        title: "免费剪辑入门",
        subtitle: "使用免费软件学习视频剪辑",
        description: "使用免费软件学习视频剪辑的基础技能，适合预算有限的初学者。",
        longDescription: "这个免费课程将教您使用免费软件进行视频剪辑，让您无需投资昂贵的软件就能开始学习。",
        category: "editing",
        level: "beginner",
        thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=450&fit=crop",
        price: 0,
        originalPrice: 0,
        currency: "CNY",
        isFree: true,
        status: "published",
        publishedAt: new Date(),
        prerequisites: ["基本的电脑操作能力"],
        learningOutcomes: [
          "掌握免费剪辑软件",
          "学会基础剪辑操作",
          "应用转场效果",
          "处理音频",
          "正确导出视频"
        ],
        requirements: ["电脑", "免费剪辑软件"],
        tags: ["剪辑", "免费", "入门", "软件"],
        features: {
          certificate: true,
          lifetimeAccess: true,
          downloadableContent: true,
          liveSessions: false,
          oneOnOneSupport: false,
          mobileAccess: true,
          offlineDownload: false,
          exerciseFiles: true,
          closedCaptions: true,
          multipleLanguages: false
        },
        forumEnabled: true,
        slug: "free-editing-basics",
        totalDuration: 240,
        totalLessons: 4,
        estimatedTime: "4h",
        version: "1.0",
        difficulty: "beginner",
        instructor: teacherUser._id
      }
    ];

    await Course.insertMany(sampleCourses);
    console.log('✅ Created sample courses');

    // Create sample blog posts
    const sampleBlogPosts = [
      {
        title: "电影制作基础：从零开始的导演之路",
        subtitle: "为初学者提供完整的电影制作学习路径",
        content: "电影制作是一门综合艺术，涉及多个领域的知识和技能。对于初学者来说，可能会感到困惑和不知所措。本指南将为您提供一个清晰的学习路径。",
        excerpt: "为初学者提供完整的电影制作学习路径，从基础知识到实践技能，帮助您快速入门电影制作。",
        featuredImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop",
        author: adminUser._id,
        status: "published",
        publishedAt: new Date(),
        category: "filmmaking-basics",
        tags: ["电影制作", "入门", "指南", "初学者"],
        language: "en",
        readingTime: 8,
        views: 1250,
        likes: 89,
        slug: "filmmaking-beginners-guide"
      },
      {
        title: "摄影技巧：如何创造电影感的画面",
        subtitle: "分享专业摄影师的实用技巧",
        content: "摄影是电影制作中最重要的技能之一。无论您是初学者还是有经验的摄影师，这些技巧都能帮助您提升作品质量。",
        excerpt: "分享专业摄影师的实用技巧，帮助您提升作品质量，让您的电影制作更加专业。",
        featuredImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop",
        author: adminUser._id,
        status: "published",
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        category: "cinematography",
        tags: ["摄影", "技巧", "构图", "光线", "专业"],
        language: "en",
        readingTime: 6,
        views: 890,
        likes: 67,
        slug: "professional-photography-tips"
      }
    ];

    await Blog.insertMany(sampleBlogPosts);
    console.log('✅ Created sample blog posts');

    // Create sample events
    const sampleEvents = [
      {
        title: "电影制作基础工作坊",
        description: "为期两天的电影制作基础工作坊，适合初学者参加。学习基本的拍摄技巧、剪辑方法和故事讲述。",
        type: "workshop",
        category: "directing",
        language: "en",
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
        timezone: "Asia/Shanghai",
        location: {
          type: "online",
          onlinePlatform: "Zoom",
          meetingUrl: "https://zoom.us/j/123456789"
        },
        banner: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
        organizer: adminUser._id,
        pricing: {
          earlyBird: { price: 299, currency: "CNY", availableUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
          regular: { price: 399, currency: "CNY" },
          isFree: false
        },
        capacity: { total: 50, reserved: 5 },
        registrationDeadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        status: "published",
        publishedAt: new Date(),
        slug: "filmmaking-basics-workshop",
        whatYouWillLearn: [
          "基本的拍摄技巧",
          "剪辑软件使用",
          "故事结构设计",
          "团队协作方法"
        ],
        featured: true,
        featuredOrder: 1
      }
    ];

    await Event.insertMany(sampleEvents);
    console.log('✅ Created sample events');

    // Create sample forum posts
    const sampleForumPosts = [
      {
        title: "欢迎来到电影制作学校论坛！",
        content: "欢迎所有对电影制作感兴趣的朋友！这里是大家交流学习、分享经验的地方。请遵守论坛规则，保持友善的交流氛围。",
        type: "announcement",
        category: "general",
        author: adminUser._id,
        status: "active",
        publishedAt: new Date(),
        tags: ["欢迎", "介绍", "规则"],
        likes: [teacherUser._id, studentUser._id],
        slug: "welcome-to-filmmaking-forum"
      },
      {
        title: "新手导演如何开始第一个短片项目？",
        content: "我是一名新手导演，想要拍摄我的第一个短片。请问有经验的朋友们：1. 如何选择合适的剧本？2. 需要准备哪些设备？3. 团队组建有什么建议？",
        author: studentUser._id,
        category: "directing",
        type: "question",
        tags: ["新手", "短片", "导演", "项目"],
        likes: [adminUser._id],
        slug: "new-director-first-short-film"
      }
    ];

    await Forum.insertMany(sampleForumPosts);
    console.log('✅ Created sample forum posts');

    console.log('🎉 Database population completed successfully!');

    res.json({
      message: 'Database populated successfully',
      summary: {
        users: createdUsers.length,
        courses: sampleCourses.length,
        blogPosts: sampleBlogPosts.length,
        events: sampleEvents.length,
        forumPosts: sampleForumPosts.length
      },
      credentials: {
        admin: 'admin@filmmakerschool.com / admin123',
        teacher: 'teacher@filmmakerschool.com / teacher123',
        student: 'student@filmmakerschool.com / student123'
      }
    });

  } catch (error) {
    console.error('❌ Database population error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 