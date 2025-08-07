# 电影制作学校在线平台 / Filmmaker School Online Platform

A comprehensive online filmmaking course platform with multi-language support (Chinese/English), payment processing, and interactive features.

## 🌟 Features

### Core Functionality
- **Multi-language Support**: Chinese and English interface
- **User Management**: Admin, Teachers, and Students roles
- **Online Payments**: Stripe integration for course purchases
- **Course Management**: Comprehensive course creation and management
- **Interactive Features**: Discussion forums and project pitching
- **SEO Blog**: Content marketing for filmmaking topics
- **Events & Projects**: Showcase upcoming opportunities

### Technical Features
- **Responsive Design**: Works on all devices
- **Real-time Chat**: Socket.io integration
- **File Upload**: Cloudinary for media storage
- **Security**: JWT authentication, rate limiting, helmet
- **Scalable Architecture**: MongoDB with Express.js backend

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Stripe account (for payments)
- Cloudinary account (for media uploads)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd filmmaker-school-platform
npm run install-all
```

2. **Environment Setup:**
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/filmmaker-school
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

3. **Start Development:**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
filmmaker-school-platform/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── locales/       # Translation files
├── server/                # Express.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── utils/            # Utility functions
├── uploads/              # File uploads (development)
└── docs/                 # Documentation
```

## 🎯 User Roles

### Admin
- Manage all users and courses
- Monitor payments and analytics
- Content moderation
- System configuration

### Teachers
- Create and manage courses
- Upload course materials
- Grade assignments
- Participate in discussions

### Students
- Enroll in courses
- Access course materials
- Submit assignments
- Participate in forums

## 💳 Payment Integration

The platform uses Stripe for secure payment processing:
- Course enrollment payments
- Subscription management
- Refund handling
- Payment analytics

## 🌐 Internationalization

Built with i18next for seamless language switching:
- Chinese (Simplified) - Default
- English - Secondary language
- Easy to add more languages

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation

## 📱 Responsive Design

- Mobile-first approach
- Progressive Web App features
- Optimized for all screen sizes

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
Ensure all environment variables are properly configured for production deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For support and questions, please contact the development team.

---

**电影制作学校在线平台** - Empowering filmmakers worldwide through quality education and community. 