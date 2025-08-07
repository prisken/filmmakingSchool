const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  
  // Role and Status
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    default: 'student'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  
  // Profile Information
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  phone: {
    type: String,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  
  // Location
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  city: {
    type: String
  },
  timezone: {
    type: String,
    default: 'UTC'
  },
  
  // Language Preferences
  preferredLanguage: {
    type: String,
    enum: ['zh', 'en'],
    default: 'zh'
  },
  
  // Filmmaking Specific
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'professional'],
    default: 'beginner'
  },
  interests: [{
    type: String,
    enum: [
      'directing', 'cinematography', 'editing', 'screenwriting', 
      'sound-design', 'production-design', 'acting', 'documentary',
      'commercial', 'music-video', 'short-film', 'feature-film'
    ]
  }],
  
  // Teacher Specific Fields
  teacherProfile: {
    specialization: [String],
    yearsOfExperience: Number,
    education: [{
      degree: String,
      institution: String,
      year: Number
    }],
    awards: [{
      name: String,
      year: Number,
      description: String
    }],
    portfolio: [{
      title: String,
      description: String,
      url: String,
      type: String // video, image, document
    }],
    hourlyRate: {
      type: Number,
      min: 0
    },
    availability: {
      type: String,
      enum: ['available', 'limited', 'unavailable'],
      default: 'available'
    }
  },
  
  // Student Specific Fields
  studentProfile: {
    enrolledCourses: [{
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      },
      enrolledAt: {
        type: Date,
        default: Date.now
      },
      progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
      },
      completed: {
        type: Boolean,
        default: false
      },
      certificate: {
        type: String
      }
    }],
    completedCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
    wishlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
    learningGoals: [String]
  },
  
  // Payment and Subscription
  stripeCustomerId: {
    type: String
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium', 'enterprise']
    },
    status: {
      type: String,
      enum: ['active', 'canceled', 'past_due', 'unpaid']
    },
    currentPeriodEnd: Date
  },
  
  // Social and Communication
  socialLinks: {
    website: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    youtube: String,
    vimeo: String
  },
  
  // Notifications
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: false
    }
  },
  
  // Verification
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  
  // Password Reset
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // Last Activity
  lastLogin: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for display name
userSchema.virtual('displayName').get(function() {
  return this.fullName;
});

// Index for search
userSchema.index({ 
  firstName: 'text', 
  lastName: 'text', 
  email: 'text',
  'teacherProfile.specialization': 'text'
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  
  delete userObject.password;
  delete userObject.emailVerificationToken;
  delete userObject.passwordResetToken;
  delete userObject.__v;
  
  return userObject;
};

// Method to check if user is admin
userSchema.methods.isAdmin = function() {
  return this.role === 'admin';
};

// Method to check if user is teacher
userSchema.methods.isTeacher = function() {
  return this.role === 'teacher';
};

// Method to check if user is student
userSchema.methods.isStudent = function() {
  return this.role === 'student';
};

// Static method to find by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

module.exports = mongoose.model('User', userSchema); 