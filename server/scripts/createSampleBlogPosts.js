const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Blog = require('../models/Blog');
const User = require('../models/User');

const createSampleBlogPosts = async () => {
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

    // Clear existing sample blog posts
    await Blog.deleteMany({ author: adminUser._id });
    console.log('🗑️ Cleared existing sample blog posts');

    // Create sample blog posts
    const samplePosts = [
      {
        title: '电影制作基础：从零开始的导演之路',
        subtitle: '初学者必读的导演入门指南',
        content: `电影制作是一门综合艺术，需要导演具备多方面的技能和知识。作为初学者，你需要了解以下基础概念：

## 1. 视觉语言
电影是一种视觉媒介，导演必须掌握如何通过画面讲述故事。这包括：
- 构图原理
- 镜头语言
- 色彩理论
- 光影运用

## 2. 叙事结构
好的故事是电影成功的基础：
- 三幕结构
- 角色发展
- 冲突设置
- 情节推进

## 3. 团队协作
电影制作是团队工作：
- 与摄影师合作
- 指导演员表演
- 协调各部门
- 时间管理

记住，成为优秀导演需要时间和实践。从短片开始，逐步提升你的技能。`,
        excerpt: '本文为电影制作初学者提供全面的导演入门指南，涵盖视觉语言、叙事结构和团队协作等核心概念。',
        category: 'filmmaking-basics',
        language: 'en',
        featuredImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop',
        tags: ['导演', '入门', '基础', '视觉语言'],
        status: 'published',
        publishedAt: new Date(),
        readingTime: 8,
        difficulty: 'beginner',
        featured: true,
        featuredOrder: 1,
        slug: 'filmmaking-beginners-guide',
        author: adminUser._id
      },
      {
        title: '摄影技巧：如何创造电影感的画面',
        subtitle: '专业摄影师的实用技巧分享',
        content: `电影摄影不仅仅是记录画面，更是创造艺术。以下是创造电影感画面的关键技巧：

## 1. 构图技巧
- 三分法则
- 对称构图
- 引导线运用
- 前景中景背景

## 2. 光影控制
- 自然光运用
- 人工光源设置
- 三点打光法
- 氛围营造

## 3. 镜头选择
- 广角镜头：环境展示
- 标准镜头：自然视角
- 长焦镜头：细节特写
- 变焦镜头：动态效果

## 4. 运动摄影
- 手持摄影
- 轨道拍摄
- 稳定器使用
- 无人机航拍

掌握这些技巧，你的作品将更具电影感。`,
        excerpt: '分享专业摄影师的实用技巧，教你如何创造具有电影感的画面效果。',
        category: 'cinematography',
        language: 'en',
        featuredImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=450&fit=crop',
        tags: ['摄影', '构图', '光影', '镜头'],
        status: 'published',
        publishedAt: new Date(),
        readingTime: 6,
        difficulty: 'intermediate',
        featured: true,
        featuredOrder: 2,
        slug: 'professional-photography-tips',
        author: adminUser._id
      },
      {
        title: '剪辑艺术：如何讲述更好的故事',
        subtitle: '剪辑师的核心技能与工作流程',
        content: `剪辑是电影的第二次创作，好的剪辑能让普通素材变成精彩作品。

## 1. 剪辑原则
- 连续性剪辑
- 蒙太奇理论
- 节奏控制
- 情感表达

## 2. 工作流程
1. 素材整理
2. 粗剪
3. 精剪
4. 调色
5. 音效

## 3. 常用技巧
- 跳切
- 交叉剪辑
- 平行剪辑
- 匹配剪辑

## 4. 软件选择
- Adobe Premiere Pro
- Final Cut Pro
- DaVinci Resolve
- Avid Media Composer

剪辑需要耐心和艺术感，多练习才能掌握。`,
        excerpt: '深入探讨剪辑艺术，从基本原则到高级技巧，帮助剪辑师提升作品质量。',
        category: 'editing',
        language: 'en',
        featuredImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=450&fit=crop',
        tags: ['剪辑', '后期', '故事', '技巧'],
        status: 'draft',
        publishedAt: null,
        readingTime: 7,
        difficulty: 'intermediate',
        featured: false,
        slug: 'editing-art-storytelling',
        author: adminUser._id
      },
      {
        title: 'Industry News: Latest Trends in Filmmaking Technology',
        subtitle: 'Stay updated with the latest developments in film technology',
        content: `The film industry is constantly evolving with new technologies. Here are the latest trends:

## 1. Virtual Production
- LED walls for real-time backgrounds
- Virtual sets and environments
- Real-time rendering
- Cost-effective production

## 2. AI in Filmmaking
- Script analysis
- Automated editing
- Visual effects generation
- Audience prediction

## 3. Streaming Revolution
- Direct-to-streaming releases
- Interactive content
- Multi-platform distribution
- New revenue models

## 4. Sustainability
- Green filmmaking practices
- Eco-friendly equipment
- Carbon footprint reduction
- Sustainable sets

These trends are shaping the future of filmmaking.`,
        excerpt: 'Explore the latest technological trends transforming the film industry and how they affect filmmakers.',
        category: 'industry-news',
        language: 'en',
        featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop',
        tags: ['technology', 'trends', 'innovation', 'future'],
        status: 'published',
        publishedAt: new Date(),
        readingTime: 5,
        difficulty: 'beginner',
        featured: false,
        slug: 'filmmaking-technology-trends',
        author: adminUser._id
      }
    ];

    // Slugs are already defined in the posts

    // Insert blog posts
    const createdPosts = await Blog.insertMany(samplePosts);
    console.log('✅ Created sample blog posts:');
    
    createdPosts.forEach(post => {
      console.log(`   - ${post.status}: ${post.title}`);
    });

    console.log('\n🎉 Sample blog posts created successfully!');

  } catch (error) {
    console.error('❌ Error creating sample blog posts:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the script
createSampleBlogPosts(); 