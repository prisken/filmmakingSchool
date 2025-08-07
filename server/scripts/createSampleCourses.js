const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Course = require('../models/Course');
const User = require('../models/User');

const createSampleCourses = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/filmmaker-school';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Get teacher user
    const teacherUser = await User.findOne({ email: 'teacher@filmmakerschool.com' });
    if (!teacherUser) {
      console.log('❌ Teacher user not found. Please run createTestUsers.js first.');
      return;
    }

    // Clear existing sample courses
    await Course.deleteMany({});
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

    console.log('\n🎉 Sample courses created successfully!');

  } catch (error) {
    console.error('❌ Error creating sample courses:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the script
createSampleCourses(); 