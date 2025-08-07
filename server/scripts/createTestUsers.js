const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const testUsers = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@filmmakerschool.com',
    password: 'admin123',
    role: 'admin',
    country: 'China',
    preferredLanguage: 'zh',
    status: 'active'
  },
  {
    firstName: 'Teacher',
    lastName: 'User',
    email: 'teacher@filmmakerschool.com',
    password: 'teacher123',
    role: 'teacher',
    country: 'China',
    preferredLanguage: 'zh',
    status: 'active',
    teacherProfile: {
      specialization: 'Film Directing',
      experience: '10+ years in film industry',
      bio: 'Experienced film director with multiple award-winning projects'
    }
  },
  {
    firstName: 'Student',
    lastName: 'User',
    email: 'student@filmmakerschool.com',
    password: 'student123',
    role: 'student',
    country: 'China',
    preferredLanguage: 'zh',
    status: 'active',
    studentProfile: {
      level: 'beginner',
      interests: ['Film Directing', 'Cinematography'],
      goals: 'Learn professional filmmaking techniques'
    }
  }
];

async function createTestUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/filmmaker-school');
    console.log('✅ Connected to MongoDB');

    // Clear existing test users
    await User.deleteMany({
      email: { 
        $in: testUsers.map(user => user.email) 
      }
    });
    console.log('🗑️  Cleared existing test users');

    // Create new test users
    for (const userData of testUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created ${userData.role} user: ${userData.email}`);
    }

    console.log('\n🎉 Test users created successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    testUsers.forEach(user => {
      console.log(`\n👤 ${user.role.toUpperCase()}:`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: ${user.password}`);
      console.log(`   Description: ${user.role === 'admin' ? 'Full access to all features' : 
                   user.role === 'teacher' ? 'Can create and manage courses' : 
                   'Can enroll in courses and access learning materials'}`);
    });
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💡 You can now use these credentials to test the login functionality!');

  } catch (error) {
    console.error('❌ Error creating test users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
createTestUsers(); 