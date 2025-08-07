const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
require('dotenv').config();

// LinkedIn Learning Style Course Structure
const linkedInStyleCourse = {
  title: "电影制作基础：从概念到完成",
  subtitle: "学习专业的电影制作技能，从剧本创作到后期制作",
  description: "这是一个全面的电影制作课程，采用LinkedIn Learning的专业结构，涵盖从创意构思到最终成片的完整流程。",
  longDescription: "在这个综合课程中，您将学习电影制作的核心技能，包括剧本创作、摄影技巧、导演艺术、后期制作等。课程采用LinkedIn Learning的bite-sized学习方法，每个视频都经过精心设计，确保学习效果最大化。",
  category: "directing",
  level: "beginner",
  skillsYouGain: [
    "电影制作基础",
    "剧本创作",
    "摄影构图",
    "导演技巧",
    "后期制作",
    "项目管理"
  ],
  courseSections: [
    {
      title: "课程基础",
      description: "了解课程结构和学习目标",
      order: 1
    },
    {
      title: "电影制作原理",
      description: "掌握电影制作的核心概念",
      order: 2
    },
    {
      title: "剧本创作技巧",
      description: "学习专业的剧本写作方法",
      order: 3
    },
    {
      title: "摄影与构图",
      description: "掌握视觉语言和镜头运用",
      order: 4
    },
    {
      title: "导演艺术",
      description: "学习导演的核心技能",
      order: 5
    },
    {
      title: "后期制作",
      description: "掌握剪辑和后期处理技巧",
      order: 6
    },
    {
      title: "项目实践",
      description: "完成个人短片项目",
      order: 7
    }
  ],
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
    oneOnOneSupport: false,
    mobileAccess: true,
    offlineDownload: false,
    exerciseFiles: true,
    closedCaptions: true,
    multipleLanguages: false
  },
  forumEnabled: true,
  slug: "filmmaking-basics-linkedin-style",
  totalDuration: 1200,
  totalLessons: 24,
  estimatedTime: "20h",
  version: "1.0",
  difficulty: "beginner",
  certificateTemplate: "https://example.com/certificate-template.pdf",
  courseBadge: "https://example.com/course-badge.png"
};

// LinkedIn Learning Style Lessons (Bite-sized approach)
const linkedInStyleLessons = [
  // Section 1: 课程基础
  {
    title: "课程介绍和概述",
    description: "了解课程结构和学习目标，为学习之旅做好准备",
    content: {
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
      duration: 120, // 2 minutes - LinkedIn Learning style
      targetDuration: 120
    },
    order: 1,
    lessonType: "video",
    isFree: true,
    status: "published",
    transcript: `欢迎来到电影制作基础课程！

在这个课程中，我们将从零开始学习电影制作的艺术。课程采用LinkedIn Learning的专业结构，每个视频都经过精心设计，确保学习效果最大化。

课程结构：
- 第1-2章：基础理论和概念
- 第3-5章：核心技能训练
- 第6-7章：项目制作和完成

学习目标：
1. 掌握电影制作的基本原理
2. 学会编写和开发剧本
3. 理解摄影构图和镜头语言
4. 掌握基本的后期制作技能
5. 能够独立完成短片制作

让我们开始这个激动人心的学习之旅吧！`,
    learningObjectives: [
      "了解课程整体结构",
      "明确学习目标",
      "准备学习环境"
    ],
    studentTips: [
      "建议每天学习1-2个视频",
      "准备笔记本记录重点",
      "积极参与讨论区交流"
    ],
    resources: [
      {
        title: "课程大纲",
        type: "pdf",
        url: "https://example.com/course-outline.pdf",
        description: "详细的课程大纲和学习计划",
        size: "1.2 MB"
      },
      {
        title: "学习进度表",
        type: "pdf",
        url: "https://example.com/progress-tracker.pdf",
        description: "个人学习进度跟踪表",
        size: "0.8 MB"
      }
    ]
  },
  {
    title: "学习环境准备",
    description: "设置您的学习环境，确保最佳学习体验",
    content: {
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
      duration: 90, // 1.5 minutes
      targetDuration: 90
    },
    order: 2,
    lessonType: "video",
    isFree: true,
    status: "published",
    transcript: `学习环境准备

为了获得最佳的学习体验，我们需要准备合适的学习环境。

硬件要求：
- 电脑：Windows 10或Mac OS 10.14以上
- 内存：8GB以上
- 存储：至少10GB可用空间
- 显示器：13英寸以上，分辨率1920x1080

软件要求：
- 视频编辑软件：Adobe Premiere Pro或DaVinci Resolve
- 浏览器：Chrome、Firefox或Safari最新版本
- 媒体播放器：VLC或QuickTime

学习空间：
- 安静的环境
- 良好的照明
- 舒适的座椅
- 稳定的网络连接

准备好这些，我们就可以开始学习了！`,
    learningObjectives: [
      "了解硬件和软件要求",
      "设置学习环境",
      "准备必要的工具"
    ],
    studentTips: [
      "确保网络连接稳定",
      "准备耳机或音箱",
      "创建专门的学习文件夹"
    ]
  },

  // Section 2: 电影制作原理
  {
    title: "什么是电影制作",
    description: "了解电影制作的基本概念和定义",
    content: {
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
      duration: 150, // 2.5 minutes
      targetDuration: 150
    },
    order: 3,
    lessonType: "video",
    isFree: false,
    status: "published",
    transcript: `什么是电影制作

电影制作是一门综合艺术，涉及多个领域的知识和技能。

电影制作的定义：
电影制作是将创意想法转化为视觉故事的过程，包括前期策划、拍摄制作和后期处理三个阶段。

电影制作的要素：
1. 故事（Story）：核心内容和情节
2. 视觉（Visual）：画面构图和镜头语言
3. 声音（Audio）：对话、音效和配乐
4. 节奏（Pacing）：时间控制和节奏感

电影制作的特点：
- 团队协作：需要多人配合
- 技术性：涉及多种技术手段
- 艺术性：具有强烈的艺术表现力
- 商业性：需要考虑市场接受度

理解这些基本概念，是我们学习电影制作的第一步。`,
    learningObjectives: [
      "理解电影制作的定义",
      "掌握电影制作的基本要素",
      "了解电影制作的特点"
    ],
    studentTips: [
      "多观察身边的电影作品",
      "思考不同电影的制作特点",
      "记录自己的理解和想法"
    ]
  },
  {
    title: "电影制作的基本流程",
    description: "了解电影制作的完整工作流程",
    content: {
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
      duration: 180, // 3 minutes
      targetDuration: 180
    },
    order: 4,
    lessonType: "video",
    isFree: false,
    status: "published",
    transcript: `电影制作的基本流程

电影制作是一个系统性的过程，分为三个主要阶段。

前期制作（Pre-production）：
1. 创意开发：故事构思和剧本创作
2. 项目策划：预算、时间表和团队组建
3. 技术准备：设备、场地和人员安排
4. 视觉设计：分镜头脚本和美术设计

制作阶段（Production）：
1. 现场拍摄：按照计划进行实际拍摄
2. 现场管理：协调各个部门的工作
3. 质量控制：确保拍摄质量符合要求
4. 进度控制：按计划完成拍摄任务

后期制作（Post-production）：
1. 素材整理：整理和分类拍摄素材
2. 剪辑制作：将素材剪辑成完整作品
3. 音效处理：添加音效、配乐和混音
4. 调色处理：统一画面色彩和风格
5. 最终输出：生成最终成品

每个阶段都很重要，缺一不可。`,
    learningObjectives: [
      "掌握电影制作的三个阶段",
      "了解每个阶段的主要任务",
      "理解各阶段之间的关系"
    ],
    studentTips: [
      "重点关注自己感兴趣的阶段",
      "了解各阶段的时间分配",
      "思考如何优化工作流程"
    ]
  },

  // Section 3: 剧本创作技巧
  {
    title: "剧本创作基础",
    description: "学习剧本创作的基本原理和技巧",
    content: {
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
      duration: 200, // 3.3 minutes
      targetDuration: 200
    },
    order: 5,
    lessonType: "video",
    isFree: false,
    status: "published",
    transcript: `剧本创作基础

剧本是电影的基础，好的剧本是成功电影的关键。

剧本的基本要素：
1. 故事（Story）：核心情节和冲突
2. 角色（Character）：人物设定和发展
3. 对话（Dialogue）：人物之间的交流
4. 场景（Scene）：时间和地点的设定
5. 动作（Action）：人物的行为和动作

剧本结构：
- 第一幕：设定和冲突建立
- 第二幕：冲突发展和深化
- 第三幕：冲突解决和结局

剧本格式：
- 场景标题：时间、地点
- 动作描述：人物的行为和动作
- 对话：人物的对话内容
- 转场：场景之间的转换

创作技巧：
1. 从简单的故事开始
2. 注重角色发展
3. 保持故事节奏
4. 反复修改完善

记住，好的剧本需要反复打磨。`,
    learningObjectives: [
      "掌握剧本的基本要素",
      "理解剧本结构",
      "学会剧本格式"
    ],
    studentTips: [
      "多读优秀剧本",
      "练习写作技巧",
      "接受反馈和建议"
    ],
    resources: [
      {
        title: "剧本模板",
        type: "doc",
        url: "https://example.com/script-template.doc",
        description: "标准剧本格式模板",
        size: "0.5 MB"
      }
    ]
  },

  // Quiz Lesson
  {
    title: "剧本创作知识测试",
    description: "测试您对剧本创作基础知识的掌握程度",
    content: {
      videoUrl: "",
      thumbnailUrl: "",
      duration: 0,
      targetDuration: 300
    },
    order: 6,
    lessonType: "quiz",
    isFree: false,
    status: "published",
    quiz: {
      questions: [
        {
          question: "剧本的基本要素不包括以下哪一项？",
          options: ["故事", "角色", "对话", "特效"],
          correctAnswer: 3,
          explanation: "特效是制作阶段的技术手段，不是剧本的基本要素。",
          points: 1
        },
        {
          question: "剧本的三幕结构是什么？",
          options: ["开始、发展、结束", "设定、冲突、解决", "引入、高潮、结局", "以上都是"],
          correctAnswer: 3,
          explanation: "三幕结构包括设定和冲突建立、冲突发展和深化、冲突解决和结局。",
          points: 1
        },
        {
          question: "好的剧本最重要的特点是什么？",
          options: ["字数多", "格式规范", "故事吸引人", "对话精彩"],
          correctAnswer: 2,
          explanation: "故事是剧本的核心，好的故事是成功剧本的关键。",
          points: 1
        }
      ],
      passingScore: 70,
      timeLimit: 300
    }
  }
];

async function createLinkedInStyleCourse() {
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

    // Clear existing course
    await Course.deleteMany({
      slug: linkedInStyleCourse.slug
    });
    console.log('🗑️  Cleared existing course');

    // Create course
    const course = new Course({
      ...linkedInStyleCourse,
      instructor: teacher._id
    });
    await course.save();
    console.log(`✅ Created LinkedIn-style course: ${linkedInStyleCourse.title}`);

    // Create lessons
    for (const lessonData of linkedInStyleLessons) {
      const lesson = new Lesson({
        ...lessonData,
        course: course._id
      });
      await lesson.save();
      console.log(`  📚 Created lesson: ${lessonData.title} (${lessonData.content.duration}s)`);
    }

    // Update course with lessons and calculate totals
    const lessons = await Lesson.find({ course: course._id });
    course.lessons = lessons.map(l => l._id);
    course.totalLessons = lessons.length;
    course.totalDuration = lessons.reduce((total, lesson) => total + lesson.content.duration, 0) / 60; // Convert to minutes
    await course.save();

    console.log('\n🎉 LinkedIn-style course created successfully!');
    console.log('\n📊 Course Statistics:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📚 Course: ${course.title}`);
    console.log(`⏱️  Total Duration: ${course.formattedDuration}`);
    console.log(`📝 Total Lessons: ${course.totalLessons}`);
    console.log(`🎯 Skills You'll Gain: ${course.skillsYouGain.length}`);
    console.log(`📂 Course Sections: ${course.courseSections.length}`);
    console.log(`💰 Price: ${course.currency} ${course.price}`);
    console.log(`🏷️  Level: ${course.level}`);
    console.log(`📅 Release Date: ${course.releaseDate.toLocaleDateString()}`);
    
    console.log('\n📋 Lesson Breakdown:');
    lessons.forEach((lesson, index) => {
      console.log(`  ${index + 1}. ${lesson.title} (${lesson.formattedDuration}) - ${lesson.lessonType}`);
    });
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💡 This course now follows LinkedIn Learning\'s professional structure!');

  } catch (error) {
    console.error('❌ Error creating LinkedIn-style course:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
createLinkedInStyleCourse(); 