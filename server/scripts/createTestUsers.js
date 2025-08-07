const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('../models/User');

const createTestUsers = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/filmmaker-school';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

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

    console.log('\n🎉 Test users created successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@filmmakerschool.com / admin123');
    console.log('Teacher: teacher@filmmakerschool.com / teacher123');
    console.log('Student: student@filmmakerschool.com / student123');

  } catch (error) {
    console.error('❌ Error creating test users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the script
createTestUsers(); 