const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Event = require('../models/Event');
const User = require('../models/User');

const createSampleEvents = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/filmmaker-school';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Get admin user
    const adminUser = await User.findOne({ email: 'admin@filmmakerschool.com' });
    if (!adminUser) {
      console.log('❌ Admin user not found. Please run createTestUsers.js first.');
      return;
    }

    // Clear existing sample events
    await Event.deleteMany({ organizer: adminUser._id });
    console.log('🗑️ Cleared existing sample events');

    // Create sample events
    const sampleEvents = [
      {
        title: '电影制作基础工作坊',
        description: '为期两天的电影制作基础工作坊，适合初学者参加。学习基本的拍摄技巧、剪辑方法和故事讲述。',
        type: 'workshop',
        category: 'directing',
        language: 'zh',
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // 9 days from now
        timezone: 'Asia/Shanghai',
        location: {
          type: 'online',
          onlinePlatform: 'Zoom',
          meetingUrl: 'https://zoom.us/j/123456789'
        },
        banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop',
        organizer: adminUser._id,
        pricing: {
          earlyBird: { price: 299, currency: 'CNY', availableUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
          regular: { price: 399, currency: 'CNY' },
          isFree: false
        },
        capacity: { total: 50, reserved: 5 },
        registrationDeadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        status: 'published',
        publishedAt: new Date(),
        slug: 'filmmaking-basics-workshop',
        whatYouWillLearn: [
          '基本的拍摄技巧',
          '剪辑软件使用',
          '故事结构设计',
          '团队协作方法'
        ],
        featured: true,
        featuredOrder: 1
      },
      {
        title: '短片电影节',
        description: '展示学生作品的专业短片电影节，提供展示平台和交流机会。',
        type: 'festival',
        category: 'short-film',
        language: 'zh',
        startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        endDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000), // 16 days from now
        timezone: 'Asia/Shanghai',
        location: {
          type: 'physical',
          address: '北京市朝阳区电影学院',
          city: '北京',
          country: '中国',
          venue: '电影学院大礼堂'
        },
        banner: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop',
        organizer: adminUser._id,
        pricing: {
          isFree: true
        },
        capacity: { total: 200, reserved: 20 },
        registrationDeadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        status: 'registration-open',
        publishedAt: new Date(),
        slug: 'short-film-festival',
        project: {
          genre: '短片',
          duration: '5-15分钟',
          theme: '自由主题',
          prizes: [
            { place: '一等奖', prize: '奖金5000元 + 专业设备' },
            { place: '二等奖', prize: '奖金3000元 + 课程优惠' },
            { place: '三等奖', prize: '奖金1000元 + 证书' }
          ],
          submissionDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
        },
        featured: true,
        featuredOrder: 2
      },
      {
        title: '摄影大师课',
        description: '由知名摄影师主讲的高级摄影技巧课程，深入探讨电影摄影的艺术。',
        type: 'masterclass',
        category: 'cinematography',
        language: 'zh',
        startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // Same day
        timezone: 'Asia/Shanghai',
        location: {
          type: 'hybrid',
          address: '上海市浦东新区影视基地',
          city: '上海',
          country: '中国',
          venue: '影视基地摄影棚',
          onlinePlatform: '腾讯会议',
          meetingUrl: 'https://meeting.tencent.com/123456789'
        },
        banner: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=450&fit=crop',
        organizer: adminUser._id,
        pricing: {
          earlyBird: { price: 599, currency: 'CNY', availableUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
          regular: { price: 799, currency: 'CNY' },
          isFree: false
        },
        capacity: { total: 30, reserved: 8 },
        registrationDeadline: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000),
        status: 'draft',
        slug: 'cinematography-masterclass',
        whatYouWillLearn: [
          '高级构图技巧',
          '光影艺术',
          '镜头语言',
          '色彩理论'
        ],
        featured: false
      },
      {
        title: '网络交流活动',
        description: '电影制作人网络交流活动，分享经验，建立人脉，寻找合作机会。',
        type: 'networking',
        category: 'directing',
        language: 'zh',
        startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Same day
        timezone: 'Asia/Shanghai',
        location: {
          type: 'online',
          onlinePlatform: 'Discord',
          meetingUrl: 'https://discord.gg/filmmakers'
        },
        banner: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
        organizer: adminUser._id,
        pricing: {
          isFree: true
        },
        capacity: { total: 100, reserved: 0 },
        registrationDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'published',
        publishedAt: new Date(),
        slug: 'filmmaker-networking',
        whatYouWillLearn: [
          '行业经验分享',
          '人脉建立技巧',
          '项目合作机会',
          '资源整合方法'
        ],
        featured: false
      }
    ];

    // Insert events
    const createdEvents = await Event.insertMany(sampleEvents);
    console.log('✅ Created sample events:');
    
    createdEvents.forEach(event => {
      console.log(`   - ${event.status}: ${event.title} (${event.type})`);
    });

    console.log('\n🎉 Sample events created successfully!');

  } catch (error) {
    console.error('❌ Error creating sample events:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the script
createSampleEvents(); 