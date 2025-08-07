const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    if (user.status !== 'active') {
      return res.status(401).json({ message: 'Account is not active' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if user is admin
const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (!req.user.isAdmin()) {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed' });
  }
};

// Middleware to check if user is teacher
const teacherAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (!req.user.isTeacher() && !req.user.isAdmin()) {
        return res.status(403).json({ message: 'Access denied. Teachers and admins only.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed' });
  }
};

// Middleware to check if user is student
const studentAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (!req.user.isStudent() && !req.user.isTeacher() && !req.user.isAdmin()) {
        return res.status(403).json({ message: 'Access denied. Students, teachers, and admins only.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed' });
  }
};

module.exports = { auth, adminAuth, teacherAuth, studentAuth }; 