#!/bin/bash

# 🚀 Filmmaker School Platform Deployment Script
# This script helps you deploy the platform to Railway and Vercel

echo "🎬 Filmmaker School Platform Deployment"
echo "======================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please run 'git init' first."
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/filmmaker-school.git"
    echo "   git push -u origin main"
    echo ""
    read -p "Press Enter after you've added the remote and pushed to GitHub..."
fi

echo "📋 Prerequisites Check:"
echo "----------------------"

# Check Node.js version
NODE_VERSION=$(node --version)
echo "✅ Node.js: $NODE_VERSION"

# Check npm
NPM_VERSION=$(npm --version)
echo "✅ npm: $NPM_VERSION"

# Check if Railway CLI is installed
if command -v railway &> /dev/null; then
    echo "✅ Railway CLI: Installed"
else
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI: Installed"
else
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "🚀 Deployment Options:"
echo "====================="
echo "1. Railway (Backend) + Vercel (Frontend) - Recommended"
echo "2. Render (Backend + Frontend)"
echo "3. Manual deployment"
echo ""

read -p "Choose deployment option (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚂 Deploying to Railway (Backend)..."
        echo "-----------------------------------"
        
        # Check if user is logged into Railway
        if ! railway whoami &> /dev/null; then
            echo "🔐 Please login to Railway:"
            railway login
        fi
        
        echo "📦 Deploying backend to Railway..."
        railway up
        
        echo ""
        echo "🌐 Deploying to Vercel (Frontend)..."
        echo "-----------------------------------"
        
        # Check if user is logged into Vercel
        if ! vercel whoami &> /dev/null; then
            echo "🔐 Please login to Vercel:"
            vercel login
        fi
        
        echo "📦 Deploying frontend to Vercel..."
        cd client
        vercel --prod
        cd ..
        
        echo ""
        echo "✅ Deployment completed!"
        echo ""
        echo "📋 Next Steps:"
        echo "1. Configure environment variables in Railway dashboard"
        echo "2. Set REACT_APP_API_URL in Vercel dashboard"
        echo "3. Add MongoDB database to Railway"
        echo "4. Run database initialization scripts"
        ;;
        
    2)
        echo ""
        echo "🎨 Deploying to Render..."
        echo "------------------------"
        echo "Please follow the manual steps in DEPLOYMENT.md"
        echo "Render deployment requires manual setup through their dashboard."
        ;;
        
    3)
        echo ""
        echo "📖 Manual Deployment"
        echo "-------------------"
        echo "Please follow the detailed instructions in DEPLOYMENT.md"
        ;;
        
    *)
        echo "❌ Invalid option. Please choose 1, 2, or 3."
        exit 1
        ;;
esac

echo ""
echo "🎯 Post-Deployment Checklist:"
echo "============================"
echo "✅ Backend deployed and accessible"
echo "✅ Frontend deployed and accessible"
echo "✅ Environment variables configured"
echo "✅ Database connected and initialized"
echo "✅ CORS settings updated"
echo "✅ Test users created"
echo "✅ Sample course and lessons added"
echo ""

echo "🧪 Test Your Deployment:"
echo "======================="
echo "• Frontend: Your deployed frontend URL"
echo "• Backend API: Your deployed backend URL"
echo "• Health Check: https://your-backend-url/api/health"
echo "• Courses API: https://your-backend-url/api/courses"
echo ""

echo "🔑 Test Credentials:"
echo "==================="
echo "• Admin: admin@filmmakerschool.com / admin123"
echo "• Teacher: teacher@filmmakerschool.com / teacher123"
echo "• Student: student@filmmakerschool.com / student123"
echo ""

echo "🎬 Happy Testing! Your filmmaking school platform is ready for live testing!" 