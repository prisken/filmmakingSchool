# 🚀 Deployment Guide for Filmmaker School Platform

This guide will help you deploy the filmmaking school platform for live testing.

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or cloud)
- Git account (GitHub, GitLab, etc.)
- Deployment platform account (Vercel, Netlify, Railway, etc.)

## 🌐 Deployment Options

### Option 1: Railway (Recommended for Full-Stack)

Railway is perfect for full-stack applications with MongoDB support.

#### Backend Deployment (Railway)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Initialize Railway project
   railway init
   
   # Deploy
   railway up
   ```

3. **Configure Environment Variables**
   - Go to Railway dashboard
   - Add environment variables:
     ```
     NODE_ENV=production
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_jwt_key
     PORT=5001
     ```

4. **Add MongoDB**
   - In Railway dashboard, add MongoDB plugin
   - Copy the connection string to MONGODB_URI

#### Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from client directory
   cd client
   vercel
   ```

3. **Configure Environment Variables**
   - In Vercel dashboard, add:
     ```
     REACT_APP_API_URL=https://your-railway-app.railway.app
     ```

### Option 2: Render (Alternative)

Render provides free hosting for both frontend and backend.

#### Backend Deployment (Render)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Connect your GitHub repository
   - Build Command: `npm install`
   - Start Command: `npm run server`
   - Environment: Node

3. **Configure Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   PORT=10000
   ```

#### Frontend Deployment (Render)

1. **Create Static Site**
   - Connect your GitHub repository
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/build`

2. **Configure Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-service.onrender.com
   ```

### Option 3: Heroku (Legacy)

Heroku still works but requires credit card for MongoDB add-on.

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create free cluster

2. **Configure Database**
   - Create database: `filmmaker-school`
   - Create user with read/write permissions
   - Get connection string

3. **Initialize Database**
   ```bash
   # Run these scripts after deployment
   node server/scripts/createTestUsers.js
   node server/scripts/createSimpleCourse.js
   node server/scripts/createSampleLessons.js
   ```

## 🔧 Environment Configuration

### Backend (.env)
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/filmmaker-school
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_ENVIRONMENT=production
```

## 🚀 Quick Deployment Steps

### 1. Push to GitHub
```bash
# Create GitHub repository
# Then push your code
git remote add origin https://github.com/yourusername/filmmaker-school.git
git push -u origin main
```

### 2. Deploy Backend (Railway)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### 3. Deploy Frontend (Vercel)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from client directory
cd client
vercel
```

### 4. Configure Environment Variables
- Set `REACT_APP_API_URL` in frontend to your backend URL
- Set `CORS_ORIGIN` in backend to your frontend URL

### 5. Initialize Database
```bash
# Run these on your deployed backend
node server/scripts/createTestUsers.js
node server/scripts/createSimpleCourse.js
node server/scripts/createSampleLessons.js
```

## 🧪 Testing Your Deployment

### Test Credentials
- **Admin**: `admin@filmmakerschool.com` / `admin123`
- **Teacher**: `teacher@filmmakerschool.com` / `teacher123`
- **Student**: `student@filmmakerschool.com` / `student123`

### Test URLs
- **Frontend**: Your deployed frontend URL
- **Backend API**: Your deployed backend URL
- **Health Check**: `https://your-backend-url/api/health`
- **Courses API**: `https://your-backend-url/api/courses`

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `CORS_ORIGIN` is set correctly in backend
   - Check that frontend URL matches exactly

2. **Database Connection**
   - Verify MongoDB connection string
   - Check network access in MongoDB Atlas

3. **Build Errors**
   - Ensure all dependencies are in package.json
   - Check Node.js version compatibility

4. **Environment Variables**
   - Verify all required variables are set
   - Check variable names match exactly

### Debug Commands
```bash
# Check backend logs
railway logs

# Check frontend build
vercel logs

# Test API endpoints
curl https://your-backend-url/api/health
curl https://your-backend-url/api/courses
```

## 📊 Monitoring

### Railway Dashboard
- Monitor backend performance
- View logs and errors
- Scale resources as needed

### Vercel Dashboard
- Monitor frontend performance
- View analytics and errors
- Configure custom domains

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit .env files
   - Use strong JWT secrets
   - Rotate secrets regularly

2. **Database Security**
   - Use MongoDB Atlas security features
   - Enable IP whitelisting
   - Use strong passwords

3. **API Security**
   - Enable rate limiting
   - Validate all inputs
   - Use HTTPS only

## 🎯 Next Steps

After successful deployment:

1. **Custom Domain**
   - Configure custom domain in Vercel/Railway
   - Update DNS settings

2. **SSL Certificate**
   - Enable HTTPS (automatic with Vercel/Railway)
   - Verify SSL configuration

3. **Monitoring**
   - Set up error tracking (Sentry)
   - Configure performance monitoring

4. **Backup**
   - Set up database backups
   - Configure automated backups

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review deployment platform documentation
3. Check application logs
4. Verify environment configuration

---

**Happy Deploying! 🎬** 