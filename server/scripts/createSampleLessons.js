const mongoose = require('mongoose');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
require('dotenv').config();

const sampleLessons = [
  {
    title: "电影制作基础介绍",
    subtitle: "了解电影制作的基本概念",
    description: "本课程将带你了解电影制作的基本概念和流程。",
    content: {
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop",
      duration: 15,
      targetDuration: 15
    },
    lessonType: "video",
    order: 1,
    learningObjectives: [
      "了解电影制作的基本流程",
      "认识电影制作的主要角色"
    ],
    studentTips: "建议在观看视频时做笔记，记录重要概念。",
    instructorNotes: "重点介绍电影制作的整体流程。",
    tags: ["基础", "介绍", "流程"],
    difficulty: "beginner"
  },
  {
    title: "摄影基础技巧",
    subtitle: "学习基本的摄影技巧",
    description: "学习如何使用相机进行基本的拍摄。",
    content: {
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=450&fit=crop",
      duration: 20,
      targetDuration: 20
    },
    lessonType: "video",
    order: 2,
    learningObjectives: [
      "掌握基本的摄影构图",
      "了解光线的重要性"
    ],
    studentTips: "实践是最好的学习方式，建议多练习拍摄。",
    instructorNotes: "强调构图和光线的基本原理。",
    tags: ["摄影", "构图", "光线"],
    difficulty: "beginner"
  },
  {
    title: "剪辑入门",
    subtitle: "学习基本的视频剪辑技巧",
    description: "介绍视频剪辑的基本概念和操作。",
    content: {
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_3mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop",
      duration: 25,
      targetDuration: 25
    },
    lessonType: "video",
    order: 3,
    learningObjectives: [
      "了解剪辑的基本原理",
      "掌握简单的剪辑操作"
    ],
    studentTips: "建议下载免费的剪辑软件进行练习。",
    instructorNotes: "重点介绍剪辑的基本概念和操作流程。",
    tags: ["剪辑", "软件", "操作"],
    difficulty: "beginner"
  },
  {
    title: "故事讲述技巧",
    subtitle: "学习如何讲述一个好故事",
    description: "探讨如何通过视觉方式讲述一个引人入胜的故事。",
    content: {
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_4mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
      duration: 30,
      targetDuration: 30
    },
    lessonType: "video",
    order: 4,
    learningObjectives: [
      "理解故事结构的重要性",
      "掌握视觉叙事技巧"
    ],
    studentTips: "多观察生活中的故事，思考如何用镜头表达。",
    instructorNotes: "强调故事结构和视觉叙事的结合。",
    tags: ["故事", "叙事", "结构"],
    difficulty: "beginner"
  },
  {
    title: "课程总结与实践",
    subtitle: "回顾所学知识并进行实践",
    description: "总结本课程的核心内容，并提供实践建议。",
    content: {
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop",
      duration: 20,
      targetDuration: 20
    },
    lessonType: "video",
    order: 5,
    learningObjectives: [
      "回顾课程核心内容",
      "制定个人学习计划"
    ],
    studentTips: "制定一个简单的拍摄计划，开始你的电影制作之旅。",
    instructorNotes: "鼓励学生开始实践，不要害怕犯错。",
    tags: ["总结", "实践", "计划"],
    difficulty: "beginner"
  }
];

async function createSampleLessons() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/filmmaker-school');
    console.log('✅ Connected to MongoDB');

    // Find the course
    const course = await Course.findOne({ slug: 'filmmaking-basics-intro' });
    if (!course) {
      console.log('❌ Course not found. Please run createSimpleCourse.js first.');
      return;
    }

    console.log(`📚 Found course: ${course.title}`);

    // Clear existing lessons for this course
    await Lesson.deleteMany({ _id: { $in: course.lessons } });
    console.log('🗑️  Cleared existing lessons');

    // Create lessons
    const createdLessons = [];
    for (const lessonData of sampleLessons) {
      const lesson = new Lesson({
        ...lessonData,
        course: course._id,
        section: course._id // For now, all lessons belong to the main course section
      });
      await lesson.save();
      createdLessons.push(lesson._id);
      console.log(`✅ Created lesson: ${lesson.title}`);
    }

    // Update course with lessons
    course.lessons = createdLessons;
    course.totalLessons = createdLessons.length;
    course.totalDuration = sampleLessons.reduce((total, lesson) => total + lesson.content.duration, 0);
    await course.save();

    console.log('\n🎉 Sample lessons created successfully!');
    console.log('\n📊 Course Updated:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📚 Title: ${course.title}`);
    console.log(`📝 Lessons: ${course.totalLessons}`);
    console.log(`⏱️  Duration: ${course.totalDuration} minutes`);
    console.log(`🔗 Slug: ${course.slug}`);
    console.log('\n📋 Lessons:');
    sampleLessons.forEach((lesson, index) => {
      console.log(`  ${index + 1}. ${lesson.title} (${lesson.content.duration}min)`);
    });
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('❌ Error creating sample lessons:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
createSampleLessons(); 