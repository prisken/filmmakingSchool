const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const testCourseData = {
  title: "电影制作基础：从概念到完成",
  subtitle: "学习专业的电影制作技能，从剧本创作到后期制作",
  description: "这是一个全面的电影制作课程，涵盖从创意构思到最终成片的完整流程。适合初学者和有经验的电影制作人。",
  longDescription: "在这个综合课程中，您将学习电影制作的核心技能，包括剧本创作、摄影技巧、导演艺术、后期制作等。通过实践项目和专家指导，您将掌握制作专业质量电影所需的所有技能。",
  category: "directing",
  level: "beginner",
  language: "zh",
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
  slug: "filmmaking-basics-complete-guide"
};

const testLessons = [
  {
    title: "课程介绍和概述",
    description: "了解课程结构和学习目标",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
    duration: 180, // 3 minutes
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
    subtitles: [
      { startTime: 0, endTime: 5, text: "欢迎来到电影制作基础课程！", language: "zh" },
      { startTime: 5, endTime: 15, text: "在这个课程中，我们将从零开始学习电影制作的艺术。", language: "zh" },
      { startTime: 15, endTime: 25, text: "无论您是初学者还是有经验的创作者，这个课程都将为您提供宝贵的知识和技能。", language: "zh" },
      { startTime: 25, endTime: 45, text: "课程结构：第1-3章：基础理论和概念，第4-7章：实践技能训练，第8-10章：项目制作和完成", language: "zh" },
      { startTime: 45, endTime: 75, text: "学习目标：掌握电影制作的基本原理，学会编写和开发剧本，理解摄影构图和镜头语言", language: "zh" },
      { startTime: 75, endTime: 90, text: "掌握基本的后期制作技能，能够独立完成短片制作", language: "zh" },
      { startTime: 90, endTime: 105, text: "让我们开始这个激动人心的学习之旅吧！", language: "zh" }
    ],
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
    duration: 600, // 10 minutes
    order: 2,
    isFree: true,
    status: "published",
    transcript: `电影制作的基本原理

电影制作是一门综合艺术，它结合了视觉艺术、听觉艺术、表演艺术和叙事艺术。要制作一部成功的电影，我们需要理解以下基本原理：

1. 视觉叙事
电影首先是视觉媒介。每个镜头都应该推动故事向前发展，传达情感，或建立氛围。视觉叙事包括：
- 构图：如何安排画面中的元素
- 色彩：如何使用色彩传达情感
- 光线：如何用光线创造氛围和深度

2. 声音设计
声音是电影体验的重要组成部分，包括：
- 对话：清晰、自然的对话
- 音效：环境声音和动作音效
- 音乐：情感支持和氛围营造

3. 节奏和剪辑
电影的节奏决定了观众如何体验故事：
- 快节奏：紧张、兴奋的场景
- 慢节奏：沉思、情感的场景
- 剪辑：如何连接不同的镜头和场景

4. 角色发展
观众需要关心角色才能投入故事：
- 角色动机：角色想要什么？
- 角色弧线：角色如何改变？
- 冲突：角色面临什么挑战？

这些基本原理将贯穿整个课程，帮助我们制作出有意义的电影作品。`,
    subtitles: [
      { startTime: 0, endTime: 10, text: "电影制作的基本原理", language: "zh" },
      { startTime: 10, endTime: 30, text: "电影制作是一门综合艺术，它结合了视觉艺术、听觉艺术、表演艺术和叙事艺术。", language: "zh" },
      { startTime: 30, endTime: 50, text: "要制作一部成功的电影，我们需要理解以下基本原理：", language: "zh" },
      { startTime: 50, endTime: 80, text: "1. 视觉叙事 - 电影首先是视觉媒介。每个镜头都应该推动故事向前发展。", language: "zh" },
      { startTime: 80, endTime: 120, text: "视觉叙事包括构图、色彩和光线的运用。", language: "zh" },
      { startTime: 120, endTime: 160, text: "2. 声音设计 - 声音是电影体验的重要组成部分。", language: "zh" },
      { startTime: 160, endTime: 200, text: "包括对话、音效和音乐的运用。", language: "zh" },
      { startTime: 200, endTime: 240, text: "3. 节奏和剪辑 - 电影的节奏决定了观众如何体验故事。", language: "zh" },
      { startTime: 240, endTime: 280, text: "4. 角色发展 - 观众需要关心角色才能投入故事。", language: "zh" },
      { startTime: 280, endTime: 320, text: "这些基本原理将贯穿整个课程，帮助我们制作出有意义的电影作品。", language: "zh" }
    ],
    resources: [
      {
        title: "电影制作原理手册",
        type: "pdf",
        url: "https://example.com/filmmaking-principles.pdf",
        description: "详细的理论知识和案例分析"
      }
    ]
  },
  {
    title: "剧本创作基础",
    description: "学习如何编写引人入胜的剧本",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
    duration: 900, // 15 minutes
    order: 3,
    isFree: false,
    status: "published",
    transcript: `剧本创作基础

剧本是电影的基础，一个好的剧本可以成就一部伟大的电影。让我们学习剧本创作的基本要素：

1. 故事结构
传统的故事结构包括：
- 开端：建立角色和世界
- 发展：冲突逐渐升级
- 高潮：冲突达到顶点
- 结局：冲突得到解决

2. 角色发展
每个角色都应该有：
- 明确的目标和动机
- 独特的性格特征
- 成长和改变的可能性
- 与故事主题的联系

3. 对话写作
好的对话应该：
- 推动情节发展
- 揭示角色性格
- 听起来自然真实
- 避免信息堆砌

4. 场景描述
场景描述应该：
- 清晰简洁
- 突出重要细节
- 创造视觉画面
- 支持故事氛围

5. 格式规范
标准剧本格式包括：
- 场景标题
- 动作描述
- 角色名称
- 对话内容
- 括号说明

记住，剧本是蓝图，不是最终产品。好的剧本为导演、演员和制作团队提供了坚实的基础。`,
    subtitles: [
      { startTime: 0, endTime: 10, text: "剧本创作基础", language: "zh" },
      { startTime: 10, endTime: 30, text: "剧本是电影的基础，一个好的剧本可以成就一部伟大的电影。", language: "zh" },
      { startTime: 30, endTime: 60, text: "1. 故事结构 - 传统的故事结构包括开端、发展、高潮和结局。", language: "zh" },
      { startTime: 60, endTime: 100, text: "2. 角色发展 - 每个角色都应该有明确的目标和动机。", language: "zh" },
      { startTime: 100, endTime: 140, text: "3. 对话写作 - 好的对话应该推动情节发展，揭示角色性格。", language: "zh" },
      { startTime: 140, endTime: 180, text: "4. 场景描述 - 场景描述应该清晰简洁，创造视觉画面。", language: "zh" },
      { startTime: 180, endTime: 220, text: "5. 格式规范 - 标准剧本格式包括场景标题、动作描述等。", language: "zh" },
      { startTime: 220, endTime: 250, text: "记住，剧本是蓝图，不是最终产品。", language: "zh" }
    ],
    resources: [
      {
        title: "剧本写作模板",
        type: "doc",
        url: "https://example.com/screenplay-template.docx",
        description: "标准剧本格式模板"
      },
      {
        title: "剧本写作技巧",
        type: "pdf",
        url: "https://example.com/screenwriting-tips.pdf",
        description: "剧本写作的实用技巧和建议"
      }
    ]
  },
  {
    title: "摄影构图技巧",
    description: "掌握电影摄影的基本构图原则",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
    duration: 1200, // 20 minutes
    order: 4,
    isFree: false,
    status: "published",
    transcript: `摄影构图技巧

构图是电影摄影的核心，它决定了观众如何观看和理解画面。让我们学习一些基本的构图原则：

1. 三分法则
将画面分为九等份，重要的元素应该放在交叉点上。这创造视觉平衡和兴趣点。

2. 对称构图
在画面中心放置主体，创造庄重、平衡的感觉。常用于建筑摄影和正式场景。

3. 引导线
使用自然或人造的线条引导观众视线，如道路、河流、建筑线条等。

4. 框架构图
使用门框、窗户、拱门等元素作为画面的自然框架，增加深度感。

5. 前景、中景、背景
创造画面的层次感，让观众感受到空间的深度。

6. 色彩对比
使用互补色或对比色创造视觉冲击力。

7. 光线运用
- 顺光：明亮、清晰的画面
- 侧光：创造阴影和质感
- 逆光：创造剪影效果
- 顶光：戏剧性的阴影效果

8. 镜头选择
- 广角镜头：广阔的视野，适合风景
- 标准镜头：自然的视角，适合人像
- 长焦镜头：压缩空间，突出主体

记住，构图规则是指导原则，不是绝对法则。最好的构图是服务于故事和情感的构图。`,
    subtitles: [
      { startTime: 0, endTime: 15, text: "摄影构图技巧", language: "zh" },
      { startTime: 15, endTime: 45, text: "构图是电影摄影的核心，它决定了观众如何观看和理解画面。", language: "zh" },
      { startTime: 45, endTime: 90, text: "1. 三分法则 - 将画面分为九等份，重要的元素应该放在交叉点上。", language: "zh" },
      { startTime: 90, endTime: 135, text: "2. 对称构图 - 在画面中心放置主体，创造庄重、平衡的感觉。", language: "zh" },
      { startTime: 135, endTime: 180, text: "3. 引导线 - 使用自然或人造的线条引导观众视线。", language: "zh" },
      { startTime: 180, endTime: 225, text: "4. 框架构图 - 使用门框、窗户等元素作为画面的自然框架。", language: "zh" },
      { startTime: 225, endTime: 270, text: "5. 前景、中景、背景 - 创造画面的层次感。", language: "zh" },
      { startTime: 270, endTime: 315, text: "6. 色彩对比 - 使用互补色或对比色创造视觉冲击力。", language: "zh" },
      { startTime: 315, endTime: 360, text: "7. 光线运用 - 顺光、侧光、逆光、顶光的不同效果。", language: "zh" },
      { startTime: 360, endTime: 405, text: "8. 镜头选择 - 广角、标准、长焦镜头的不同特点。", language: "zh" },
      { startTime: 405, endTime: 450, text: "记住，构图规则是指导原则，不是绝对法则。", language: "zh" }
    ],
    resources: [
      {
        title: "构图技巧图解",
        type: "pdf",
        url: "https://example.com/composition-guide.pdf",
        description: "详细的构图技巧图解和示例"
      }
    ]
  },
  {
    title: "后期制作基础",
    description: "学习视频剪辑和后期制作的基本技能",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
    duration: 1500, // 25 minutes
    order: 5,
    isFree: false,
    status: "published",
    transcript: `后期制作基础

后期制作是将拍摄的素材转化为最终电影作品的过程。这是电影制作的关键阶段，让我们学习基本技能：

1. 剪辑基础
剪辑是后期制作的核心：
- 连续性剪辑：保持时间和空间的连续性
- 蒙太奇：通过剪辑创造新的含义
- 节奏控制：通过剪辑控制影片节奏
- 情感剪辑：通过剪辑传达情感

2. 色彩校正
- 白平衡：确保色彩准确
- 对比度：调整明暗对比
- 饱和度：控制色彩强度
- 色调：调整整体色彩倾向

3. 音效处理
- 音量平衡：确保各音轨音量协调
- 音效添加：环境音、动作音效
- 音乐配乐：选择合适的背景音乐
- 混音：将所有音轨混合

4. 特效制作
- 转场效果：镜头之间的过渡
- 文字标题：片头、片尾、字幕
- 简单特效：色彩调整、模糊等
- 合成：多层画面的合成

5. 输出格式
- 分辨率：选择合适的输出分辨率
- 编码格式：H.264、ProRes等
- 文件大小：平衡质量和文件大小
- 平台适配：不同平台的格式要求

后期制作需要耐心和细心，好的后期制作可以让普通素材变成优秀作品。`,
    subtitles: [
      { startTime: 0, endTime: 15, text: "后期制作基础", language: "zh" },
      { startTime: 15, endTime: 45, text: "后期制作是将拍摄的素材转化为最终电影作品的过程。", language: "zh" },
      { startTime: 45, endTime: 90, text: "1. 剪辑基础 - 剪辑是后期制作的核心。", language: "zh" },
      { startTime: 90, endTime: 135, text: "包括连续性剪辑、蒙太奇、节奏控制和情感剪辑。", language: "zh" },
      { startTime: 135, endTime: 180, text: "2. 色彩校正 - 白平衡、对比度、饱和度、色调的调整。", language: "zh" },
      { startTime: 180, endTime: 225, text: "3. 音效处理 - 音量平衡、音效添加、音乐配乐、混音。", language: "zh" },
      { startTime: 225, endTime: 270, text: "4. 特效制作 - 转场效果、文字标题、简单特效、合成。", language: "zh" },
      { startTime: 270, endTime: 315, text: "5. 输出格式 - 分辨率、编码格式、文件大小、平台适配。", language: "zh" },
      { startTime: 315, endTime: 350, text: "后期制作需要耐心和细心，好的后期制作可以让普通素材变成优秀作品。", language: "zh" }
    ],
    resources: [
      {
        title: "后期制作软件指南",
        type: "pdf",
        url: "https://example.com/post-production-guide.pdf",
        description: "常用后期制作软件的使用指南"
      },
      {
        title: "剪辑技巧视频",
        type: "video",
        url: "https://example.com/editing-tutorial.mp4",
        description: "详细的剪辑技巧演示"
      }
    ]
  }
];

async function createTestCourse() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/filmmaker-school');
    console.log('✅ Connected to MongoDB');

    // Find or create a teacher user
    let teacher = await User.findOne({ email: 'teacher@filmmakerschool.com' });
    if (!teacher) {
      console.log('❌ Teacher user not found. Please run createTestUsers.js first.');
      return;
    }

    // Check if test course already exists
    const existingCourse = await Course.findOne({ slug: testCourseData.slug });
    if (existingCourse) {
      console.log('🗑️  Deleting existing test course...');
      await Course.findByIdAndDelete(existingCourse._id);
    }

    // Create the course
    const course = new Course({
      ...testCourseData,
      instructor: teacher._id
    });

    await course.save();
    console.log('✅ Created test course');

    // Create lessons
    const createdLessons = [];
    for (const lessonData of testLessons) {
      const lesson = new Lesson({
        ...lessonData,
        course: course._id
      });
      await lesson.save();
      createdLessons.push(lesson._id);
      console.log(`✅ Created lesson: ${lessonData.title}`);
    }

    // Update course with lesson references
    course.lessons = createdLessons;
    course.totalLessons = createdLessons.length;
    course.totalDuration = testLessons.reduce((total, lesson) => total + lesson.duration, 0);
    await course.save();

    console.log('\n🎉 Test course created successfully!');
    console.log('\n📋 Course Details:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📚 Course: ${course.title}`);
    console.log(`👨‍🏫 Instructor: ${teacher.firstName} ${teacher.lastName}`);
    console.log(`💰 Price: ¥${course.price}`);
    console.log(`📹 Total Lessons: ${course.totalLessons}`);
    console.log(`⏱️  Total Duration: ${Math.floor(course.totalDuration / 60)} minutes`);
    console.log(`🔗 Slug: ${course.slug}`);
    console.log('\n📝 Lessons:');
    testLessons.forEach((lesson, index) => {
      const status = lesson.isFree ? '🆓 FREE' : '💰 PAID';
      console.log(`   ${index + 1}. ${lesson.title} (${status})`);
    });
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💡 You can now test the course functionality!');

  } catch (error) {
    console.error('❌ Error creating test course:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
createTestCourse(); 