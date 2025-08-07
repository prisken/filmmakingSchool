const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const sampleCourses = [
  {
    title: "电影制作基础：从概念到完成",
    subtitle: "学习专业的电影制作技能，从剧本创作到后期制作",
    description: "这是一个全面的电影制作课程，涵盖从创意构思到最终成片的完整流程。适合初学者和有经验的电影制作人。",
    longDescription: "在这个综合课程中，您将学习电影制作的核心技能，包括剧本创作、摄影技巧、导演艺术、后期制作等。通过实践项目和专家指导，您将掌握制作专业质量电影所需的所有技能。课程采用理论与实践相结合的方式，让您在学习过程中获得真实的制作经验。",
    category: "directing",
    level: "beginner",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop",
    previewVideo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    price: 299,
    originalPrice: 399,
    currency: "CNY",
    isFree: false,
    status: "published",
    publishedAt: new Date(),
    prerequisites: [
      "基本的计算机操作技能",
      "对电影制作有浓厚兴趣",
      "愿意投入时间学习和实践"
    ],
    learningOutcomes: [
      "掌握电影制作的基本原理和技术",
      "学会编写和开发剧本",
      "理解摄影构图和镜头语言",
      "掌握基本的后期制作技能",
      "能够独立完成短片制作"
    ],
    requirements: [
      "电脑（Windows或Mac）",
      "视频编辑软件（推荐Adobe Premiere Pro或DaVinci Resolve）",
      "智能手机或相机用于拍摄"
    ],
    tags: ["电影制作", "导演", "摄影", "剧本", "后期制作", "短片"],
    features: {
      certificate: true,
      lifetimeAccess: true,
      downloadableContent: true,
      liveSessions: false,
      oneOnOneSupport: false
    },
    forumEnabled: true,
    slug: "filmmaking-basics-complete-guide",
    totalDuration: 1200,
    totalLessons: 24
  },
  {
    title: "高级摄影技巧与镜头语言",
    subtitle: "掌握专业摄影技术，提升画面质量和视觉表现力",
    description: "深入学习摄影技巧，掌握镜头语言，提升您的视觉叙事能力。",
    longDescription: "本课程专注于高级摄影技巧和镜头语言的运用。您将学习如何通过镜头选择、构图技巧、光线运用等方式来增强故事的视觉冲击力。课程包含大量实际案例分析和实践练习。",
    category: "cinematography",
    level: "intermediate",
    thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=450&fit=crop",
    price: 399,
    originalPrice: 499,
    currency: "CNY",
    isFree: false,
    status: "published",
    publishedAt: new Date(),
    prerequisites: [
      "基础摄影知识",
      "了解基本镜头类型",
      "有拍摄经验"
    ],
    learningOutcomes: [
      "掌握高级摄影构图技巧",
      "理解不同镜头的视觉效果",
      "学会运用光线创造氛围",
      "提升视觉叙事能力"
    ],
    requirements: [
      "专业相机设备",
      "多种镜头选择",
      "基础摄影软件"
    ],
    tags: ["摄影", "镜头语言", "构图", "光线", "视觉叙事"],
    features: {
      certificate: true,
      lifetimeAccess: true,
      downloadableContent: true,
      liveSessions: true,
      oneOnOneSupport: false
    },
    forumEnabled: true,
    slug: "advanced-cinematography-techniques",
    totalDuration: 900,
    totalLessons: 18
  },
  {
    title: "后期制作精修技巧",
    subtitle: "学习专业的后期制作技能，让作品更加完美",
    description: "从剪辑到调色，从音效到特效，掌握完整的后期制作流程。",
    longDescription: "后期制作是电影制作的关键环节。本课程将教授您从粗剪到精剪，从调色到音效处理的完整后期制作流程。使用行业标准软件，学习专业的工作流程和技巧。",
    category: "editing",
    level: "intermediate",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop",
    price: 499,
    originalPrice: 599,
    currency: "CNY",
    isFree: false,
    status: "published",
    publishedAt: new Date(),
    prerequisites: [
      "基础视频编辑经验",
      "熟悉Adobe Premiere Pro或DaVinci Resolve",
      "了解基本剪辑原理"
    ],
    learningOutcomes: [
      "掌握专业剪辑技巧",
      "学会调色和色彩校正",
      "理解音效处理流程",
      "能够完成专业级后期制作"
    ],
    requirements: [
      "Adobe Premiere Pro或DaVinci Resolve",
      "After Effects（可选）",
      "Audition或类似音频软件"
    ],
    tags: ["后期制作", "剪辑", "调色", "音效", "特效"],
    features: {
      certificate: true,
      lifetimeAccess: true,
      downloadableContent: true,
      liveSessions: false,
      oneOnOneSupport: true
    },
    forumEnabled: true,
    slug: "post-production-mastery",
    totalDuration: 1500,
    totalLessons: 30
  },
  {
    title: "剧本创作与故事结构",
    subtitle: "学习专业的剧本写作技巧，创作引人入胜的故事",
    description: "从创意构思到完整剧本，掌握专业的故事创作方法。",
    longDescription: "好的故事是成功电影的基础。本课程将教授您如何从创意构思开始，逐步构建完整的故事结构，最终创作出引人入胜的剧本。课程涵盖角色塑造、情节发展、对话写作等核心技能。",
    category: "screenwriting",
    level: "beginner",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=450&fit=crop",
    price: 199,
    originalPrice: 299,
    currency: "CNY",
    isFree: false,
    status: "published",
    publishedAt: new Date(),
    prerequisites: [
      "对写作有浓厚兴趣",
      "愿意投入时间练习",
      "有创意想法"
    ],
    learningOutcomes: [
      "掌握故事结构原理",
      "学会角色塑造技巧",
      "理解剧本格式规范",
      "能够创作完整剧本"
    ],
    requirements: [
      "文字处理软件",
      "笔记本和笔",
      "创意思维"
    ],
    tags: ["剧本创作", "故事结构", "角色塑造", "对话写作", "创意写作"],
    features: {
      certificate: true,
      lifetimeAccess: true,
      downloadableContent: true,
      liveSessions: false,
      oneOnOneSupport: false
    },
    forumEnabled: true,
    slug: "screenwriting-story-structure",
    totalDuration: 600,
    totalLessons: 12
  },
  {
    title: "音效设计与音频制作",
    subtitle: "掌握专业音效设计技巧，提升作品音质",
    description: "学习音效设计、音频编辑和混音技术，为您的作品添加专业音效。",
    longDescription: "音效是电影体验的重要组成部分。本课程将教授您如何设计、录制、编辑和混音，为您的作品创造专业的音频体验。从环境音到配乐，从对话到音效，全面掌握音频制作技能。",
    category: "sound-design",
    level: "intermediate",
    thumbnail: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&h=450&fit=crop",
    price: 349,
    originalPrice: 449,
    currency: "CNY",
    isFree: false,
    status: "published",
    publishedAt: new Date(),
    prerequisites: [
      "基础音频知识",
      "了解音频软件",
      "有录音经验"
    ],
    learningOutcomes: [
      "掌握音效设计原理",
      "学会音频编辑技巧",
      "理解混音技术",
      "能够制作专业音效"
    ],
    requirements: [
      "音频编辑软件（如Audition、Pro Tools）",
      "录音设备",
      "监听耳机或音箱"
    ],
    tags: ["音效设计", "音频制作", "混音", "录音", "配乐"],
    features: {
      certificate: true,
      lifetimeAccess: true,
      downloadableContent: true,
      liveSessions: false,
      oneOnOneSupport: false
    },
    forumEnabled: true,
    slug: "sound-design-audio-production",
    totalDuration: 800,
    totalLessons: 16
  }
];

const sampleLessons = [
  {
    title: "课程介绍和概述",
    description: "了解课程结构和学习目标，为学习之旅做好准备",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
    duration: 180,
    order: 1,
    isFree: true,
    status: "published",
    transcript: `欢迎来到电影制作基础课程！

在这个课程中，我们将从零开始学习电影制作的艺术。无论您是初学者还是有经验的创作者，这个课程都将为您提供宝贵的知识和技能。

课程结构：
- 第1-3章：基础理论和概念
- 第4-7章：实践技能训练
- 第8-10章：项目制作和完成

学习目标：
1. 掌握电影制作的基本原理
2. 学会编写和开发剧本
3. 理解摄影构图和镜头语言
4. 掌握基本的后期制作技能
5. 能够独立完成短片制作

让我们开始这个激动人心的学习之旅吧！`,
    resources: [
      {
        title: "课程大纲",
        type: "pdf",
        url: "https://example.com/course-outline.pdf",
        description: "详细的课程大纲和学习计划"
      }
    ]
  },
  {
    title: "电影制作的基本原理",
    description: "了解电影制作的核心概念和理论",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
    duration: 240,
    order: 2,
    isFree: false,
    status: "published",
    transcript: `电影制作的基本原理

电影制作是一门综合艺术，涉及多个领域的知识和技能。在本节课中，我们将探讨电影制作的核心原理。

主要内容：
1. 视觉语言基础
2. 叙事结构原理
3. 时间与空间概念
4. 观众心理学

这些基本原理将贯穿整个课程，为后续的实践学习奠定坚实基础。`,
    resources: [
      {
        title: "视觉语言指南",
        type: "pdf",
        url: "https://example.com/visual-language-guide.pdf",
        description: "视觉语言基础概念和示例"
      }
    ]
  }
];

async function createSampleCourses() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/filmmaker-school');
    console.log('✅ Connected to MongoDB');

    // Get a teacher user to assign as instructor
    const teacher = await User.findOne({ role: 'teacher' });
    if (!teacher) {
      console.log('❌ No teacher found. Please run createTestUsers.js first.');
      return;
    }

    // Clear existing sample courses
    await Course.deleteMany({
      slug: { $in: sampleCourses.map(course => course.slug) }
    });
    console.log('🗑️  Cleared existing sample courses');

    // Create courses
    for (const courseData of sampleCourses) {
      const course = new Course({
        ...courseData,
        instructor: teacher._id
      });
      await course.save();
      console.log(`✅ Created course: ${courseData.title}`);

      // Create lessons for the first course
      if (course.slug === 'filmmaking-basics-complete-guide') {
        for (const lessonData of sampleLessons) {
          const lesson = new Lesson({
            ...lessonData,
            course: course._id
          });
          await lesson.save();
          console.log(`  📚 Created lesson: ${lessonData.title}`);
        }

        // Update course with lessons
        const lessons = await Lesson.find({ course: course._id });
        course.lessons = lessons.map(l => l._id);
        await course.save();
      }
    }

    console.log('\n🎉 Sample courses created successfully!');
    console.log('\n📋 Created Courses:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    sampleCourses.forEach(course => {
      console.log(`\n🎬 ${course.title}`);
      console.log(`   Category: ${course.category}`);
      console.log(`   Level: ${course.level}`);
      console.log(`   Price: ${course.currency} ${course.price}`);
      console.log(`   Duration: ${course.totalDuration} minutes`);
      console.log(`   Lessons: ${course.totalLessons}`);
    });
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💡 You can now view these courses in the application!');

  } catch (error) {
    console.error('❌ Error creating sample courses:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
createSampleCourses(); 