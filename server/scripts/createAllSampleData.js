const mongoose = require('mongoose');
require('dotenv').config();

// Import the individual scripts
const createTestUsers = require('./createTestUsers');
const createSampleCourses = require('./createSampleCourses');
const createSampleBlogPosts = require('./createSampleBlogPosts');
const createSampleEvents = require('./createSampleEvents');
const createSampleForumPosts = require('./createSampleForumPosts');

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

// Run the script
createAllSampleData(); 