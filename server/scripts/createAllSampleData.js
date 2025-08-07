const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Course = require('../models/Course');
const Blog = require('../models/Blog');
const Event = require('../models/Event');
const Forum = require('../models/Forum');
const bcrypt = require('bcryptjs');

const createAllSampleData = async () => {
  try {
    console.log('🚀 Starting sample data creation...\n');

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/filmmaker-school';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB\n');

    // Step 1: Create test users
    console.log('📝 Step 1: Creating test users...');
    await createTestUsers();
    console.log('✅ Test users created\n');

    // Step 2: Create sample courses
    console.log('📝 Step 2: Creating sample courses...');
    await createSampleCourses();
    console.log('✅ Sample courses created\n');

    // Step 3: Create sample blog posts
    console.log('📝 Step 3: Creating sample blog posts...');
    await createSampleBlogPosts();
    console.log('✅ Sample blog posts created\n');

    // Step 4: Create sample events
    console.log('📝 Step 4: Creating sample events...');
    await createSampleEvents();
    console.log('✅ Sample events created\n');

    // Step 5: Create sample forum posts
    console.log('📝 Step 5: Creating sample forum posts...');
    await createSampleForumPosts();
    console.log('✅ Sample forum posts created\n');

    console.log('🎉 All sample data created successfully!');
    console.log('\n📋 Summary:');
    console.log('   - 3 test users (Admin, Teacher, Student)');
    console.log('   - 4 sample courses (3 published, 1 draft, 1 free)');
    console.log('   - 4 sample blog posts (2 published, 1 draft, 1 English)');
    console.log('   - 4 sample events (2 published, 1 draft, 1 registration-open)');
    console.log('   - 6 sample forum posts (various types and categories)');
    
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin: admin@filmmakerschool.com / admin123');
    console.log('   Teacher: teacher@filmmakerschool.com / teacher123');
    console.log('   Student: student@filmmakerschool.com / student123');

    console.log('\n🎯 You can now test the admin management system!');

  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
};

// Individual creation functions
const createTestUsers = async () => {
  try {
    // Clear existing test users
    await User.deleteMany({
      email: {
        $in: [
          'admin@filmmakerschool.com',
          'teacher@filmmakerschool.com',
          'student@filmmakerschool.com'
        ]
      }
    });
    console.log('🗑️ Cleared existing test users');

    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 12);
    const teacherPassword = await bcrypt.hash('teacher123', 12);
    const studentPassword = await bcrypt.hash('student123', 12);

    // Create test users
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

    // Insert users
    const createdUsers = await User.insertMany(testUsers);
    console.log('✅ Created test users:');
    
    createdUsers.forEach(user => {
      console.log(`   - ${user.role}: ${user.email} (${user.firstName} ${user.lastName})`);
    });

  } catch (error) {
    console.error('❌ Error creating test users:', error);
    throw error;
  }
};

const createSampleCourses = async () => {
  try {
    // Get teacher user
    const teacherUser = await User.findOne({ email: 'teacher@filmmakerschool.com' });
    if (!teacherUser) {
      console.log('❌ Teacher user not found. Please run createTestUsers first.');
      return;
    }

    // Clear existing sample courses
    await Course.deleteMany({ instructor: teacherUser._id });
    console.log('🗑️ Cleared existing sample courses');

    // Create sample courses
    const sampleCourses = [
      {
        title: "电影制作基础入门",
        subtitle: "从零开始学习电影制作",
        description: "适合初学者的电影制作基础课程，涵盖摄影、剪辑和故事讲述的基本技能。",
        longDescription: `在这个全面的入门课程中，您将学习电影制作的核心概念和实践技能。

## 课程内容
- 电影制作流程概述
- 基础摄影技巧
- 简单剪辑操作
- 故事结构设计
- 团队协作方法

## 适合人群
- 电影制作初学者
- 对影视行业感兴趣的学生
- 想要提升创作技能的个人

## 学习成果
完成课程后，您将能够：
- 独立完成简单的短片制作
- 掌握基本的拍摄和剪辑技巧
- 理解电影制作的工作流程
- 为进阶学习打下坚实基础`,
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
        title: "高级摄影技巧",
        subtitle: "掌握专业级摄影技术",
        description: "深入学习电影摄影的高级技巧，包括构图、光影控制和镜头语言。",
        longDescription: `这个高级课程专为有一定基础的学员设计，深入探讨电影摄影的艺术和技术。

## 高级技巧
- 复杂构图设计
- 专业光影控制
- 镜头语言运用
- 色彩理论应用
- 运动摄影技巧

## 实践项目
- 短片摄影项目
- 光影实验
- 构图练习
- 色彩调色`,
        category: "cinematography",
        level: "advanced",
        thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=450&fit=crop",
        price: 599,
        originalPrice: 799,
        currency: "CNY",
        isFree: false,
        status: "published",
        publishedAt: new Date(),
        prerequisites: ["基础摄影知识", "熟悉摄影设备", "有短片制作经验"],
        learningOutcomes: [
          "掌握高级构图技巧",
          "精通光影控制",
          "运用专业镜头语言",
          "理解色彩理论",
          "掌握运动摄影"
        ],
        requirements: ["专业摄影设备", "剪辑软件", "调色软件"],
        tags: ["摄影", "高级", "构图", "光影", "专业"],
        features: {
          certificate: true,
          lifetimeAccess: true,
          downloadableContent: true,
          liveSessions: true,
          oneOnOneSupport: true,
          mobileAccess: true,
          offlineDownload: true,
          exerciseFiles: true,
          closedCaptions: true,
          multipleLanguages: false
        },
        forumEnabled: true,
        slug: "advanced-cinematography",
        totalDuration: 600,
        totalLessons: 8,
        estimatedTime: "10h",
        version: "1.0",
        difficulty: "advanced",
        instructor: teacherUser._id
      },
      {
        title: "免费剪辑入门",
        subtitle: "使用免费软件学习视频剪辑",
        description: "使用免费软件学习视频剪辑的基础技能，适合预算有限的初学者。",
        longDescription: `这个免费课程将教您使用免费软件进行视频剪辑，让您无需投资昂贵的软件就能开始学习。

## 免费软件介绍
- DaVinci Resolve (免费版)
- OpenShot
- Shotcut
- 其他免费替代品

## 学习内容
- 基础剪辑操作
- 转场效果应用
- 音频处理
- 导出设置`,
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
      },
      {
        title: "编剧大师课",
        subtitle: "学习专业编剧技巧",
        description: "由资深编剧主讲的专业编剧课程，涵盖故事结构、角色发展和剧本写作。",
        longDescription: `这个大师课将带您深入了解编剧的艺术，从故事构思到最终剧本的完整创作过程。

## 课程模块
- 故事结构设计
- 角色发展技巧
- 对话写作艺术
- 剧本格式规范
- 市场分析

## 实践练习
- 短剧本创作
- 角色设计练习
- 对话写作训练`,
        category: "screenwriting",
        level: "intermediate",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
        price: 399,
        originalPrice: 499,
        currency: "CNY",
        isFree: false,
        status: "draft",
        publishedAt: null,
        prerequisites: ["基础写作能力", "对故事创作有兴趣"],
        learningOutcomes: [
          "掌握故事结构设计",
          "学会角色发展技巧",
          "精通对话写作",
          "了解剧本格式",
          "掌握市场分析"
        ],
        requirements: ["电脑", "文字处理软件"],
        tags: ["编剧", "故事", "角色", "剧本"],
        features: {
          certificate: true,
          lifetimeAccess: true,
          downloadableContent: true,
          liveSessions: true,
          oneOnOneSupport: false,
          mobileAccess: true,
          offlineDownload: false,
          exerciseFiles: true,
          closedCaptions: true,
          multipleLanguages: false
        },
        forumEnabled: true,
        slug: "screenwriting-masterclass",
        totalDuration: 480,
        totalLessons: 6,
        estimatedTime: "8h",
        version: "1.0",
        difficulty: "intermediate",
        instructor: teacherUser._id
      }
    ];

    // Insert courses
    const createdCourses = await Course.insertMany(sampleCourses);
    console.log('✅ Created sample courses:');
    
    createdCourses.forEach(course => {
      console.log(`   - ${course.status}: ${course.title} (${course.level}, ${course.isFree ? 'Free' : course.currency + ' ' + course.price})`);
    });

  } catch (error) {
    console.error('❌ Error creating sample courses:', error);
    throw error;
  }
};

const createSampleBlogPosts = async () => {
  try {
    // Get admin user
    const adminUser = await User.findOne({ email: 'admin@filmmakerschool.com' });
    if (!adminUser) {
      console.log('❌ Admin user not found. Please run createTestUsers first.');
      return;
    }

    // Clear existing sample blog posts
    await Blog.deleteMany({ author: adminUser._id });
    console.log('🗑️ Cleared existing sample blog posts');

    // Create sample blog posts
    const sampleBlogPosts = [
      {
        title: "电影制作入门指南：从零开始",
        subtitle: "为初学者提供完整的电影制作学习路径",
        content: `# 电影制作入门指南：从零开始

电影制作是一门综合艺术，涉及多个领域的知识和技能。对于初学者来说，可能会感到困惑和不知所措。本指南将为您提供一个清晰的学习路径。

## 学习路径

### 第一阶段：基础知识
- 了解电影制作的基本流程
- 学习摄影基础理论
- 掌握基本剪辑概念

### 第二阶段：实践技能
- 拍摄简单短片
- 学习剪辑软件
- 练习故事讲述

### 第三阶段：进阶技巧
- 深入学习摄影技巧
- 掌握高级剪辑方法
- 学习音效和配乐

## 推荐资源
- 在线课程平台
- 专业书籍
- 实践项目

记住，电影制作需要大量的实践和耐心。不要害怕犯错，每一次尝试都是学习的机会。`,
        excerpt: "为初学者提供完整的电影制作学习路径，从基础知识到实践技能，帮助您快速入门电影制作。",
        featuredImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop",
        author: adminUser._id,
        status: "published",
        publishedAt: new Date(),
        category: "tutorial",
        tags: ["电影制作", "入门", "指南", "初学者"],
        language: "zh",
        readingTime: 8,
        views: 1250,
        likes: 89,
        slug: "filmmaking-beginners-guide"
      },
      {
        title: "5个提升摄影技巧的实用方法",
        subtitle: "简单有效的技巧，让您的作品更专业",
        content: `# 5个提升摄影技巧的实用方法

摄影是电影制作中最重要的技能之一。无论您是初学者还是有经验的摄影师，这些技巧都能帮助您提升作品质量。

## 1. 构图原则
- 三分法则
- 对称构图
- 引导线运用

## 2. 光线控制
- 自然光利用
- 人工光源设置
- 光影对比

## 3. 镜头选择
- 广角镜头
- 标准镜头
- 长焦镜头

## 4. 色彩搭配
- 色彩理论
- 调色技巧
- 氛围营造

## 5. 运动控制
- 手持稳定
- 运动跟踪
- 动态构图

这些技巧需要大量练习才能掌握。建议从简单的项目开始，逐步提升难度。`,
        excerpt: "分享5个实用的摄影技巧，帮助您提升作品质量，让您的电影制作更加专业。",
        featuredImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop",
        author: adminUser._id,
        status: "published",
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        category: "tips",
        tags: ["摄影", "技巧", "构图", "光线", "专业"],
        language: "zh",
        readingTime: 6,
        views: 890,
        likes: 67,
        slug: "5-photography-tips"
      },
      {
        title: "电影制作行业发展趋势分析",
        subtitle: "2024年电影制作技术和发展方向",
        content: `# 电影制作行业发展趋势分析

随着技术的不断进步，电影制作行业正在经历前所未有的变革。让我们来看看2024年的主要发展趋势。

## 技术趋势
- 虚拟制作技术
- AI辅助制作
- 8K超高清技术
- 实时渲染

## 市场变化
- 流媒体平台崛起
- 短视频内容增长
- 独立制作机会增加
- 全球化制作趋势

## 技能需求
- 数字技术掌握
- 跨平台制作能力
- 创新思维
- 团队协作

## 未来展望
电影制作行业将继续向数字化、智能化方向发展。掌握新技术将成为从业者的核心竞争力。`,
        excerpt: "分析2024年电影制作行业的发展趋势，包括技术革新、市场变化和技能需求。",
        featuredImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=400&fit=crop",
        author: adminUser._id,
        status: "draft",
        publishedAt: null,
        category: "industry",
        tags: ["行业", "趋势", "技术", "发展", "2024"],
        language: "zh",
        readingTime: 10,
        views: 0,
        likes: 0,
        slug: "filmmaking-industry-trends-2024"
      },
      {
        title: "Essential Filmmaking Equipment for Beginners",
        subtitle: "A comprehensive guide to essential equipment for new filmmakers",
        content: `# Essential Filmmaking Equipment for Beginners

Starting your filmmaking journey can be overwhelming, especially when it comes to choosing the right equipment. This guide will help you understand what you really need to get started.

## Camera Equipment
- DSLR or Mirrorless Camera
- Tripod
- Memory Cards
- Extra Batteries

## Audio Equipment
- External Microphone
- Audio Recorder
- Headphones
- Wind Shield

## Lighting Equipment
- LED Lights
- Reflectors
- Diffusers
- Light Stands

## Editing Equipment
- Computer with Editing Software
- External Hard Drive
- Monitor Calibration Tool

## Budget Considerations
Start with the essentials and upgrade as you grow. Quality over quantity is key in filmmaking.`,
        excerpt: "A comprehensive guide to essential filmmaking equipment for beginners, helping you make informed decisions about your gear.",
        featuredImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=400&fit=crop",
        author: adminUser._id,
        status: "published",
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        category: "equipment",
        tags: ["equipment", "beginners", "camera", "audio", "lighting"],
        language: "en",
        readingTime: 7,
        views: 567,
        likes: 34,
        slug: "essential-filmmaking-equipment"
      }
    ];

    // Insert blog posts
    const createdBlogPosts = await Blog.insertMany(sampleBlogPosts);
    console.log('✅ Created sample blog posts:');
    
    createdBlogPosts.forEach(post => {
      console.log(`   - ${post.status}: ${post.title} (${post.language}, ${post.readingTime}min read)`);
    });

  } catch (error) {
    console.error('❌ Error creating sample blog posts:', error);
    throw error;
  }
};

const createSampleEvents = async () => {
  try {
    // Get admin user
    const adminUser = await User.findOne({ email: 'admin@filmmakerschool.com' });
    if (!adminUser) {
      console.log('❌ Admin user not found. Please run createTestUsers first.');
      return;
    }

    // Clear existing sample events
    await Event.deleteMany({ organizer: adminUser._id });
    console.log('🗑️ Cleared existing sample events');

    // Create sample events
    const sampleEvents = [
      {
        title: "电影制作工作坊：从创意到成片",
        description: "为期两天的密集工作坊，学习完整的电影制作流程。",
        longDescription: `这个工作坊将带您体验完整的电影制作流程，从创意构思到最终成片。

## 工作坊内容
- 故事构思和剧本创作
- 分镜头脚本设计
- 现场拍摄技巧
- 后期制作流程
- 作品展示和点评

## 适合人群
- 电影制作初学者
- 想要提升技能的学生
- 对电影制作感兴趣的个人

## 工作坊安排
- 第一天：理论学习和前期准备
- 第二天：现场拍摄和后期制作

## 设备要求
- 智能手机或相机
- 笔记本电脑
- 剪辑软件（免费版即可）

## 成果展示
工作坊结束后，每位参与者将完成一部3-5分钟的短片作品。`,
        type: "workshop",
        category: "filmmaking",
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
        location: {
          type: "physical",
          address: "北京市朝阳区电影学院路123号",
          city: "北京",
          country: "中国",
          coordinates: {
            latitude: 39.9042,
            longitude: 116.4074
          }
        },
        capacity: 20,
        currentRegistrations: 8,
        price: 299,
        currency: "CNY",
        status: "published",
        publishedAt: new Date(),
        organizer: adminUser._id,
        bannerUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop",
        tags: ["工作坊", "电影制作", "实践", "北京"],
        slug: "filmmaking-workshop-beijing"
      },
      {
        title: "短片电影节：学生作品展映",
        description: "展示学生优秀短片作品，促进交流和学习。",
        longDescription: `一年一度的短片电影节，展示来自全国各地学生的优秀作品。

## 电影节亮点
- 100+部学生短片作品
- 专业评委点评
- 奖项颁发仪式
- 行业交流论坛
- 作品展映活动

## 参与方式
- 作品提交：2024年3月1日截止
- 初选结果：2024年3月15日公布
- 决赛展映：2024年4月1日-3日

## 奖项设置
- 最佳短片奖
- 最佳导演奖
- 最佳摄影奖
- 最佳剪辑奖
- 观众选择奖

## 评委阵容
- 知名导演
- 资深摄影师
- 专业剪辑师
- 行业专家`,
        type: "festival",
        category: "showcase",
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        endDate: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000), // 32 days from now
        location: {
          type: "physical",
          address: "上海市浦东新区电影节大道456号",
          city: "上海",
          country: "中国",
          coordinates: {
            latitude: 31.2304,
            longitude: 121.4737
          }
        },
        capacity: 500,
        currentRegistrations: 156,
        price: 0,
        currency: "CNY",
        status: "published",
        publishedAt: new Date(),
        organizer: adminUser._id,
        bannerUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop",
        tags: ["电影节", "短片", "学生", "展映", "上海"],
        slug: "student-short-film-festival"
      },
      {
        title: "在线电影制作讲座：数字时代的新机遇",
        description: "探讨数字技术如何改变电影制作行业。",
        longDescription: `数字技术正在深刻改变电影制作行业。这个在线讲座将探讨新技术带来的机遇和挑战。

## 讲座主题
- 虚拟制作技术
- AI在电影制作中的应用
- 云制作平台
- 数字发行新模式

## 主讲嘉宾
- 技术专家
- 行业领袖
- 成功案例分享

## 互动环节
- 在线问答
- 技术演示
- 经验分享`,
        type: "lecture",
        category: "technology",
        startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 3 days from now + 2 hours
        location: {
          type: "online",
          platform: "Zoom",
          meetingUrl: "https://zoom.us/j/123456789",
          meetingId: "123456789",
          password: "filmmaking2024"
        },
        capacity: 200,
        currentRegistrations: 45,
        price: 0,
        currency: "CNY",
        status: "draft",
        publishedAt: null,
        organizer: adminUser._id,
        bannerUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=400&fit=crop",
        tags: ["在线讲座", "数字技术", "虚拟制作", "AI"],
        slug: "digital-filmmaking-lecture"
      },
      {
        title: "电影制作人 networking 聚会",
        description: "与同行交流，建立人脉，分享经验。",
        longDescription: `定期举办的电影制作人聚会，为行业从业者提供交流平台。

## 聚会内容
- 自我介绍环节
- 项目分享
- 经验交流
- 合作机会探讨
- 自由交流时间

## 参与人群
- 独立电影制作人
- 学生导演
- 摄影师
- 剪辑师
- 制片人

## 聚会特色
- 轻松的氛围
- 开放的话题
- 实用的信息
- 潜在的合作机会`,
        type: "networking",
        category: "community",
        startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 14 days from now + 3 hours
        location: {
          type: "physical",
          address: "广州市天河区创意园789号",
          city: "广州",
          country: "中国",
          coordinates: {
            latitude: 23.1291,
            longitude: 113.2644
          }
        },
        capacity: 50,
        currentRegistrations: 23,
        price: 50,
        currency: "CNY",
        status: "registration-open",
        publishedAt: new Date(),
        organizer: adminUser._id,
        bannerUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=400&fit=crop",
        tags: ["聚会", "人脉", "交流", "合作", "广州"],
        slug: "filmmaker-networking-guangzhou"
      }
    ];

    // Insert events
    const createdEvents = await Event.insertMany(sampleEvents);
    console.log('✅ Created sample events:');
    
    createdEvents.forEach(event => {
      console.log(`   - ${event.status}: ${event.title} (${event.type}, ${event.currentRegistrations}/${event.capacity})`);
    });

  } catch (error) {
    console.error('❌ Error creating sample events:', error);
    throw error;
  }
};

const createSampleForumPosts = async () => {
  try {
    // Get users
    const adminUser = await User.findOne({ email: 'admin@filmmakerschool.com' });
    const teacherUser = await User.findOne({ email: 'teacher@filmmakerschool.com' });
    const studentUser = await User.findOne({ email: 'student@filmmakerschool.com' });

    if (!adminUser || !teacherUser || !studentUser) {
      console.log('❌ Users not found. Please run createTestUsers first.');
      return;
    }

    // Clear existing sample forum posts
    await Forum.deleteMany({
      author: { $in: [adminUser._id, teacherUser._id, studentUser._id] }
    });
    console.log('🗑️ Cleared existing sample forum posts');

    // Create sample forum posts
    const sampleForumPosts = [
      {
        title: "欢迎来到电影制作学校论坛！",
        content: "欢迎所有对电影制作感兴趣的朋友！这里是大家交流学习、分享经验的地方。请遵守论坛规则，保持友善的交流氛围。",
        type: "announcement",
        category: "general",
        author: adminUser._id,
        status: "published",
        publishedAt: new Date(),
        tags: ["欢迎", "公告", "论坛"],
        likes: 15,
        views: 89,
        slug: "welcome-to-filmmaking-forum"
      },
      {
        title: "推荐一些适合初学者的电影制作书籍",
        content: "作为初学者，我一直在寻找好的学习资源。最近读了几本不错的书，想和大家分享：\n\n1. 《电影制作基础》- 系统介绍电影制作流程\n2. 《摄影的艺术》- 深入讲解摄影技巧\n3. 《剪辑的艺术》- 专业的剪辑指导\n\n大家有什么推荐的书吗？",
        type: "question",
        category: "resources",
        author: studentUser._id,
        status: "published",
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        tags: ["书籍", "推荐", "初学者", "学习"],
        likes: 8,
        views: 45,
        slug: "recommended-books-for-beginners"
      },
      {
        title: "分享我的第一个短片作品",
        content: "经过几个月的学习，终于完成了我的第一个短片作品！虽然还有很多不足，但这是一个很好的开始。\n\n作品链接：[短片链接]\n\n希望大家能给我一些建议和反馈，我会继续努力的！",
        type: "discussion",
        category: "showcase",
        author: studentUser._id,
        status: "published",
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        tags: ["短片", "作品", "分享", "反馈"],
        likes: 12,
        views: 67,
        slug: "my-first-short-film"
      },
      {
        title: "寻找摄影助理合作项目",
        content: "我正在筹备一个短片项目，需要一名摄影助理。项目预计持续2周，地点在北京。\n\n要求：\n- 有基础摄影经验\n- 熟悉基本设备操作\n- 能够配合团队工作\n- 有责任心和时间观念\n\n有意者请私信联系，谢谢！",
        type: "collaboration",
        category: "jobs",
        author: teacherUser._id,
        status: "published",
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        tags: ["招聘", "摄影助理", "合作", "北京"],
        likes: 5,
        views: 34,
        slug: "looking-for-camera-assistant"
      },
      {
        title: "关于电影制作中的音效处理",
        content: "最近在学习音效处理，发现这是一个很重要的环节。想和大家讨论一下：\n\n1. 大家使用什么软件进行音效处理？\n2. 有什么好的音效资源推荐？\n3. 音效和配乐的平衡如何把握？\n\n欢迎分享经验和建议！",
        type: "discussion",
        category: "technical",
        author: teacherUser._id,
        status: "published",
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        tags: ["音效", "处理", "软件", "技术"],
        likes: 9,
        views: 52,
        slug: "sound-effects-processing"
      },
      {
        title: "我的剧本创意：科幻短片《时间旅行者》",
        content: "我有一个科幻短片的创意，想和大家分享并征求意见：\n\n故事梗概：一个普通上班族意外获得了时间旅行的能力，但每次使用都会带来意想不到的后果。\n\n主要问题：\n1. 故事结构是否合理？\n2. 角色设定是否吸引人？\n3. 如何控制制作成本？\n\n希望大家能给出建议！",
        type: "project-pitch",
        category: "screenwriting",
        author: studentUser._id,
        status: "published",
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        tags: ["剧本", "科幻", "创意", "项目"],
        likes: 18,
        views: 78,
        slug: "sci-fi-short-film-pitch"
      }
    ];

    // Insert forum posts
    const createdForumPosts = await Forum.insertMany(sampleForumPosts);
    console.log('✅ Created sample forum posts:');
    
    createdForumPosts.forEach(post => {
      console.log(`   - ${post.type}: ${post.title} (${post.category}, ${post.likes} likes)`);
    });

  } catch (error) {
    console.error('❌ Error creating sample forum posts:', error);
    throw error;
  }
};

// Run the script
createAllSampleData(); 