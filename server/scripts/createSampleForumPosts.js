const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Forum = require('../models/Forum');
const User = require('../models/User');

const createSampleForumPosts = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/filmmaker-school';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Get admin and teacher users
    const adminUser = await User.findOne({ email: 'admin@filmmakerschool.com' });
    const teacherUser = await User.findOne({ email: 'teacher@filmmakerschool.com' });
    const studentUser = await User.findOne({ email: 'student@filmmakerschool.com' });

    if (!adminUser || !teacherUser || !studentUser) {
      console.log('❌ Test users not found. Please run createTestUsers.js first.');
      return;
    }

    // Clear existing sample forum posts
    await Forum.deleteMany({
      author: { $in: [adminUser._id, teacherUser._id, studentUser._id] }
    });
    console.log('🗑️ Cleared existing sample forum posts');

    // Create sample forum posts
    const samplePosts = [
      {
        title: '欢迎来到电影制作学校论坛！',
        content: `大家好！欢迎来到我们的电影制作学校论坛。

这里是电影制作爱好者和专业人士交流的平台。无论你是初学者还是经验丰富的电影人，都可以在这里：

- 分享你的作品和经验
- 讨论电影制作技巧
- 寻找合作伙伴
- 提问和解答问题
- 了解行业动态

请遵守论坛规则，保持友善和专业的交流氛围。

期待看到大家的精彩讨论！`,
        author: adminUser._id,
        category: 'general',
        type: 'announcement',
        tags: ['欢迎', '介绍', '规则'],
        likes: [teacherUser._id, studentUser._id],
        slug: 'welcome-to-filmmaking-forum'
      },
      {
        title: '新手导演如何开始第一个短片项目？',
        content: `我是一名新手导演，想要拍摄我的第一个短片。请问有经验的朋友们：

1. 如何选择合适的剧本？
2. 需要准备哪些设备？
3. 团队组建有什么建议？
4. 预算大概需要多少？
5. 后期制作流程是怎样的？

希望得到大家的建议和指导，谢谢！`,
        author: studentUser._id,
        category: 'directing',
        type: 'question',
        tags: ['新手', '短片', '导演', '项目'],
        likes: [adminUser._id],
        slug: 'new-director-first-short-film'
      },
      {
        title: '分享：我的摄影技巧心得',
        content: `作为一名摄影师，我想分享一些实用的摄影技巧：

## 构图技巧
- 三分法则：将画面分为九宫格，重要元素放在交叉点上
- 引导线：利用自然线条引导观众视线
- 对称构图：适合表现庄重、平衡的主题

## 光影运用
- 黄金时段：日出后和日落前1-2小时的光线最美
- 三点打光：主光、补光、轮廓光
- 自然光：学会利用窗户光、阴天光等

## 镜头选择
- 广角：适合环境展示，营造空间感
- 标准：最接近人眼视角，自然真实
- 长焦：压缩空间，突出主体

这些技巧需要大量练习才能掌握，建议大家多拍多练！`,
        author: teacherUser._id,
        category: 'cinematography',
        type: 'discussion',
        tags: ['摄影', '技巧', '构图', '光影'],
        likes: [adminUser._id, studentUser._id],
        slug: 'photography-techniques-sharing'
      },
      {
        title: '寻找剪辑师合作项目',
        content: `我正在筹备一个短片项目，需要寻找有经验的剪辑师合作。

## 项目信息
- 类型：剧情短片
- 时长：约10分钟
- 主题：都市情感
- 拍摄时间：下个月

## 要求
- 有短片剪辑经验
- 熟悉Premiere Pro或Final Cut Pro
- 能够参与前期讨论
- 有时间保证

## 合作方式
- 可以讨论报酬
- 也可以作为作品集项目
- 署名权保证

有兴趣的朋友请私信联系，谢谢！`,
        author: studentUser._id,
        category: 'collaboration',
        type: 'collaboration',
        tags: ['合作', '剪辑师', '短片', '项目'],
        slug: 'looking-for-editor-collaboration',
        pitch: {
          genre: '剧情',
          budget: { min: 5000, max: 10000, currency: 'CNY' },
          timeline: {
            startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
          },
          location: '北京',
          crewNeeded: [
            {
              role: '剪辑师',
              description: '负责后期剪辑和调色',
              isPaid: true,
              compensation: '面议'
            }
          ],
          synopsis: '一个关于都市情感的故事，探讨现代人的情感困境。'
        }
      },
      {
        title: '推荐几款适合新手的剪辑软件',
        content: `很多新手朋友问我推荐什么剪辑软件，我来分享一下：

## 免费软件
1. **DaVinci Resolve** - 功能强大，专业级调色
2. **OpenShot** - 简单易用，适合初学者
3. **Shotcut** - 开源免费，跨平台

## 付费软件
1. **Adobe Premiere Pro** - 行业标准，功能全面
2. **Final Cut Pro** - Mac专用，性能优秀
3. **Vegas Pro** - 性价比高，适合个人用户

## 新手建议
- 从免费软件开始学习
- 掌握基本概念后再升级
- 多关注官方教程
- 加入用户社区

大家有什么使用心得也可以分享！`,
        author: teacherUser._id,
        category: 'editing',
        type: 'discussion',
        tags: ['剪辑', '软件', '推荐', '新手'],
        likes: [adminUser._id, studentUser._id],
        slug: 'editing-software-recommendations'
      },
      {
        title: '项目提案：科幻短片《时间旅行者》',
        content: `我想拍摄一个科幻短片，希望大家给些建议：

## 故事梗概
一个时间旅行者被困在过去，试图回到未来但发现时间线已经改变。

## 技术挑战
- 时间旅行特效
- 场景转换
- 服装道具设计
- 音效制作

## 预算考虑
- 特效制作费用
- 道具租赁
- 场地费用
- 后期制作

## 团队需求
- 特效师
- 美术指导
- 音效师
- 演员

这个项目比较有挑战性，但我觉得很有创意。大家觉得怎么样？`,
        author: studentUser._id,
        category: 'project-pitch',
        type: 'project-pitch',
        tags: ['科幻', '短片', '提案', '特效'],
        slug: 'sci-fi-short-film-pitch',
        pitch: {
          genre: '科幻',
          budget: { min: 20000, max: 50000, currency: 'CNY' },
          timeline: {
            startDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
          },
          location: '上海',
          crewNeeded: [
            {
              role: '特效师',
              description: '负责时间旅行特效制作',
              isPaid: true,
              compensation: '8000-15000元'
            },
            {
              role: '美术指导',
              description: '负责场景和道具设计',
              isPaid: true,
              compensation: '5000-8000元'
            }
          ],
          synopsis: '一个关于时间旅行和命运改变的科幻故事。',
          targetAudience: '科幻爱好者，18-35岁',
          uniqueSellingPoint: '创新的时间旅行概念和视觉效果'
        }
      }
    ];

    // Insert forum posts
    const createdPosts = await Forum.insertMany(samplePosts);
    console.log('✅ Created sample forum posts:');
    
    createdPosts.forEach(post => {
      console.log(`   - ${post.type}: ${post.title} (by ${post.author === adminUser._id ? 'Admin' : post.author === teacherUser._id ? 'Teacher' : 'Student'})`);
    });

    console.log('\n🎉 Sample forum posts created successfully!');

  } catch (error) {
    console.error('❌ Error creating sample forum posts:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the script
createSampleForumPosts(); 