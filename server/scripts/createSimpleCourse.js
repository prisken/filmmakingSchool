const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
require('dotenv').config();

const simpleCourse = {
  title: "电影制作基础入门",
  subtitle: "学习电影制作的基本技能",
  description: "这是一个入门级的电影制作课程，适合初学者。",
  longDescription: "在这个课程中，您将学习电影制作的基础知识，包括摄影、剪辑和故事讲述的基本技巧。",
  category: "directing",
  level: "beginner",
  thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop",
  price: 199,
  originalPrice: 299,
  currency: "CNY",
  isFree: false,
  status: "published",
  publishedAt: new Date(),
  prerequisites: ["对电影制作有兴趣"],
  learningOutcomes: [
    "了解电影制作基本流程",
    "掌握基础摄影技巧",
    "学会简单剪辑操作"
  ],
  requirements: ["电脑", "智能手机"],
  tags: ["电影制作", "入门", "基础"],
  features: {
    certificate: true,
    lifetimeAccess: true,
    downloadableContent: false,
    liveSessions: false,
    oneOnOneSupport: false,
    mobileAccess: true,
    offlineDownload: false,
    exerciseFiles: false,
    closedCaptions: true,
    multipleLanguages: false
  },
  forumEnabled: true,
  slug: "filmmaking-basics-intro",
  totalDuration: 300,
  totalLessons: 5,
  estimatedTime: "5h",
  version: "1.0",
  difficulty: "beginner"
};

async function createSimpleCourse() {
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
      slug: simpleCourse.slug
    });
    console.log('🗑️  Cleared existing course');

    // Create course
    const course = new Course({
      ...simpleCourse,
      instructor: teacher._id
    });
    await course.save();
    console.log(`✅ Created simple course: ${simpleCourse.title}`);

    console.log('\n🎉 Simple course created successfully!');
    console.log('\n📊 Course Details:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📚 Title: ${course.title}`);
    console.log(`💰 Price: ${course.currency} ${course.price}`);
    console.log(`🏷️  Level: ${course.level}`);
    console.log(`📝 Lessons: ${course.totalLessons}`);
    console.log(`⏱️  Duration: ${course.totalDuration} minutes`);
    console.log(`🔗 Slug: ${course.slug}`);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💡 You can now test the frontend with this course!');

  } catch (error) {
    console.error('❌ Error creating simple course:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
createSimpleCourse(); 