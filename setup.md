# 电影制作学校平台设置指南 / Filmmaker School Platform Setup Guide

## 🚀 快速开始 / Quick Start

### 1. 环境要求 / Prerequisites

- Node.js (v16 或更高版本 / or higher)
- MongoDB (v4.4 或更高版本 / or higher)
- npm 或 yarn / or yarn

### 2. 安装依赖 / Install Dependencies

```bash
# 安装后端依赖 / Install backend dependencies
npm install

# 安装前端依赖 / Install frontend dependencies
cd client
npm install
cd ..
```

### 3. 环境配置 / Environment Configuration

创建 `.env` 文件在项目根目录 / Create `.env` file in project root:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/filmmaker-school

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Stripe Configuration (for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
EMAIL_FROM=noreply@filmmakerschool.com

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your_session_secret_here

# Logging
LOG_LEVEL=info
```

### 4. 启动开发服务器 / Start Development Server

```bash
# 同时启动前端和后端 / Start both frontend and backend
npm run dev

# 或者分别启动 / Or start separately
npm run server  # 后端 / Backend
npm run client  # 前端 / Frontend
```

### 5. 访问应用 / Access Application

- 前端: http://localhost:3000
- 后端 API: http://localhost:5000
- API 文档: http://localhost:5000/api/health

## 📁 项目结构 / Project Structure

```
filmmaker-school-platform/
├── client/                 # React 前端 / React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # 可复用组件 / Reusable Components
│   │   ├── pages/         # 页面组件 / Page Components
│   │   ├── contexts/      # React 上下文 / React Contexts
│   │   ├── hooks/         # 自定义钩子 / Custom Hooks
│   │   ├── utils/         # 工具函数 / Utility Functions
│   │   └── styles/        # 样式文件 / Styles
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Express 后端 / Express Backend
│   ├── controllers/       # 路由控制器 / Route Controllers
│   ├── models/           # MongoDB 模型 / MongoDB Models
│   ├── routes/           # API 路由 / API Routes
│   ├── middleware/       # 中间件 / Middleware
│   └── utils/            # 工具函数 / Utility Functions
├── uploads/              # 文件上传目录 / File Uploads
├── package.json
├── server.js
└── README.md
```

## 🎯 功能特性 / Features

### 核心功能 / Core Features
- ✅ 多语言支持 (中文/英文) / Multi-language Support (Chinese/English)
- ✅ 用户角色管理 (管理员/教师/学生) / User Role Management (Admin/Teacher/Student)
- ✅ 在线支付集成 / Online Payment Integration
- ✅ 课程管理系统 / Course Management System
- ✅ 讨论论坛 / Discussion Forum
- ✅ 项目展示平台 / Project Showcase Platform
- ✅ SEO 博客系统 / SEO Blog System
- ✅ 活动和项目展示 / Events and Projects
- ✅ 响应式设计 / Responsive Design

### 技术特性 / Technical Features
- ✅ JWT 身份验证 / JWT Authentication
- ✅ 密码加密 / Password Hashing
- ✅ 速率限制 / Rate Limiting
- ✅ 文件上传 / File Upload
- ✅ 实时通知 / Real-time Notifications
- ✅ 搜索功能 / Search Functionality
- ✅ 主题切换 / Theme Toggle
- ✅ 错误处理 / Error Handling

## 🔧 开发指南 / Development Guide

### 添加新页面 / Adding New Pages

1. 在 `client/src/pages/` 创建页面组件
2. 在 `client/src/App.js` 添加路由
3. 在 `client/src/contexts/LanguageContext.js` 添加翻译

### 添加新 API 端点 / Adding New API Endpoints

1. 在 `server/models/` 创建数据模型
2. 在 `server/controllers/` 创建控制器
3. 在 `server/routes/` 创建路由
4. 在 `server.js` 注册路由

### 数据库操作 / Database Operations

```bash
# 连接到 MongoDB
mongo

# 切换到项目数据库
use filmmaker-school

# 查看集合
show collections

# 查询数据
db.users.find()
db.courses.find()
```

## 🚀 部署指南 / Deployment Guide

### 生产环境配置 / Production Configuration

1. 设置环境变量 / Set environment variables
2. 配置数据库 / Configure database
3. 设置域名和 SSL / Set up domain and SSL
4. 配置 CDN / Configure CDN
5. 设置监控 / Set up monitoring

### 构建生产版本 / Build for Production

```bash
# 构建前端
cd client
npm run build

# 启动生产服务器
npm start
```

## 🐛 故障排除 / Troubleshooting

### 常见问题 / Common Issues

1. **MongoDB 连接失败 / MongoDB Connection Failed**
   - 检查 MongoDB 服务是否运行 / Check if MongoDB service is running
   - 验证连接字符串 / Verify connection string

2. **前端无法连接后端 / Frontend can't connect to backend**
   - 检查 CORS 配置 / Check CORS configuration
   - 验证代理设置 / Verify proxy settings

3. **文件上传失败 / File Upload Failed**
   - 检查 Cloudinary 配置 / Check Cloudinary configuration
   - 验证文件大小限制 / Verify file size limits

## 📞 支持 / Support

如有问题，请查看：
- 项目文档 / Project documentation
- GitHub Issues / GitHub Issues
- 开发团队联系方式 / Development team contact

---

**电影制作学校平台** - 让电影制作教育更简单、更专业、更国际化
**Filmmaker School Platform** - Making filmmaking education simpler, more professional, and more international 