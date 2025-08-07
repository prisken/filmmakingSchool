const mongoose = require('mongoose');

// Remove embedded lessonSchema - we'll use separate Lesson model

const courseSchema = new mongoose.Schema({
  // Basic Info
  title: { type: String, required: true, trim: true, maxlength: 200 },
  subtitle: { type: String, maxlength: 300 },
  description: { type: String, required: true, maxlength: 2000 },
  longDescription: { type: String, maxlength: 5000 },
  
  // Course Details
  category: {
    type: String,
    required: true,
    enum: ['directing', 'cinematography', 'editing', 'screenwriting', 'sound-design', 'production-design', 'acting', 'documentary', 'commercial', 'music-video', 'short-film', 'feature-film', 'animation', 'visual-effects', 'color-grading', 'distribution']
  },
  level: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels']
  },
  language: { type: String, enum: ['zh', 'en', 'both'] },
  
  // LinkedIn Learning Style Enhancements
  skillsYouGain: [{
    type: String,
    trim: true,
    maxlength: 100
  }],
  courseSections: [{
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    order: { type: Number, required: true },
    lessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    }]
  }],
  
  // Media
  thumbnail: { type: String, required: true },
  previewVideo: String,
  images: [{ url: String, caption: String, order: Number }],
  
  // Content
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  totalDuration: { type: Number, default: 0 }, // minutes
  totalLessons: { type: Number, default: 0 },
  
  // Interactive Elements (LinkedIn Learning Style)
  quizzes: [{
    title: { type: String, required: true },
    description: { type: String },
    questions: [{
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: Number, required: true },
      explanation: String
    }],
    order: { type: Number, required: true },
    passingScore: { type: Number, default: 70 }
  }],
  exercises: [{
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['practice', 'assignment', 'project'], default: 'practice' },
    instructions: { type: String },
    resources: [{ url: String, description: String }],
    order: { type: Number, required: true }
  }],
  
  // Pricing
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0 },
  currency: { type: String, default: 'CNY', enum: ['CNY', 'USD', 'EUR'] },
  isFree: { type: Boolean, default: false },
  
  // Instructor (Enhanced LinkedIn Learning Style)
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coInstructors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  // Status
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  publishedAt: Date,
  
  // Enrollment
  enrolledStudents: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    enrolledAt: { type: Date, default: Date.now },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    completed: { type: Boolean, default: false },
    completedAt: Date,
    certificate: String,
    quizScores: [{
      quizId: { type: mongoose.Schema.Types.ObjectId },
      score: { type: Number },
      completedAt: { type: Date, default: Date.now }
    }],
    exerciseSubmissions: [{
      exerciseId: { type: mongoose.Schema.Types.ObjectId },
      submittedAt: { type: Date, default: Date.now },
      status: { type: String, enum: ['submitted', 'reviewed', 'approved'], default: 'submitted' },
      feedback: String
    }]
  }],
  maxStudents: { type: Number, default: 0 }, // 0 = unlimited
  
  // Ratings (LinkedIn Learning Style)
  ratings: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, maxlength: 1000 },
    createdAt: { type: Date, default: Date.now },
    helpful: { type: Number, default: 0 },
    reported: { type: Boolean, default: false }
  }],
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  totalRatings: { type: Number, default: 0 },
  
  // Course Info
  prerequisites: [String],
  learningOutcomes: [String],
  requirements: [String],
  tags: [String],
  
  // Features (LinkedIn Learning Style)
  features: {
    certificate: { type: Boolean, default: true },
    lifetimeAccess: { type: Boolean, default: true },
    downloadableContent: { type: Boolean, default: false },
    liveSessions: { type: Boolean, default: false },
    oneOnOneSupport: { type: Boolean, default: false },
    mobileAccess: { type: Boolean, default: true },
    offlineDownload: { type: Boolean, default: false },
    exerciseFiles: { type: Boolean, default: false },
    closedCaptions: { type: Boolean, default: true },
    multipleLanguages: { type: Boolean, default: false }
  },
  
  // Forum
  forumEnabled: { type: Boolean, default: true },
  
  // Analytics
  views: { type: Number, default: 0 },
  wishlistCount: { type: Number, default: 0 },
  completionRate: { type: Number, default: 0, min: 0, max: 100 },
  
  // SEO
  slug: { type: String, unique: true, required: true },
  featured: { type: Boolean, default: false },
  featuredOrder: { type: Number, default: 0 },
  
  // LinkedIn Learning Style Metadata
  releaseDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  version: { type: String, default: '1.0' },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  estimatedTime: { type: String }, // e.g., "1h 14m"
  certificateTemplate: { type: String }, // URL to certificate template
  courseBadge: { type: String } // URL to course completion badge
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
courseSchema.virtual('enrollmentCount').get(function() {
  return this.enrolledStudents.length;
});

// completionRate is already defined as a field in the schema

courseSchema.virtual('isFull').get(function() {
  if (this.maxStudents === 0) return false;
  return this.enrolledStudents.length >= this.maxStudents;
});

// LinkedIn Learning Style Virtuals
courseSchema.virtual('totalQuizzes').get(function() {
  return this.quizzes ? this.quizzes.length : 0;
});

courseSchema.virtual('totalExercises').get(function() {
  return this.exercises ? this.exercises.length : 0;
});

courseSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.totalDuration / 60);
  const minutes = this.totalDuration % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
});

// Methods
courseSchema.methods.getStudentProgress = function(studentId) {
  const enrollment = this.enrolledStudents.find(e => e.student.toString() === studentId.toString());
  if (!enrollment) return null;
  
  return {
    progress: enrollment.progress,
    completed: enrollment.completed,
    completedAt: enrollment.completedAt,
    certificate: enrollment.certificate,
    quizScores: enrollment.quizScores,
    exerciseSubmissions: enrollment.exerciseSubmissions
  };
};

courseSchema.methods.addQuiz = function(quizData) {
  if (!this.quizzes) this.quizzes = [];
  quizData.order = this.quizzes.length + 1;
  this.quizzes.push(quizData);
  return this.save();
};

courseSchema.methods.addExercise = function(exerciseData) {
  if (!this.exercises) this.exercises = [];
  exerciseData.order = this.exercises.length + 1;
  this.exercises.push(exerciseData);
  return this.save();
};

// Static methods
courseSchema.statics.findBySkill = function(skill) {
  return this.find({
    skillsYouGain: { $regex: skill, $options: 'i' }
  });
};

courseSchema.statics.getPopularCourses = function(limit = 10) {
  return this.find({ status: 'published' })
    .sort({ enrolledStudents: -1, averageRating: -1 })
    .limit(limit)
    .populate('instructor', 'firstName lastName avatar');
};

// Pre-save middleware
courseSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

module.exports = mongoose.model('Course', courseSchema); 