const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseSection'
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  
  // LinkedIn Learning Style Content
  content: {
    videoUrl: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String
    },
    duration: {
      type: Number, // in seconds
      required: true
    },
    // Bite-sized approach - most lessons should be 1-5 minutes
    targetDuration: {
      type: Number, // in seconds
      default: 180 // 3 minutes default
    }
  },
  
  // Lesson Structure
  order: {
    type: Number,
    required: true
  },
  lessonType: {
    type: String,
    enum: ['video', 'quiz', 'exercise', 'discussion', 'resource'],
    default: 'video'
  },
  isFree: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  
  // Enhanced Transcript and Subtitles (LinkedIn Learning Style)
  transcript: {
    type: String,
    trim: true
  },
  subtitles: [{
    startTime: {
      type: Number, // in seconds
      required: true
    },
    endTime: {
      type: Number, // in seconds
      required: true
    },
    text: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: 'zh'
    }
  }],
  
  // Interactive Elements
  quiz: {
    questions: [{
      question: {
        type: String,
        required: true
      },
      options: [{
        type: String,
        required: true
      }],
      correctAnswer: {
        type: Number,
        required: true
      },
      explanation: String,
      points: {
        type: Number,
        default: 1
      }
    }],
    passingScore: {
      type: Number,
      default: 70
    },
    timeLimit: {
      type: Number, // in seconds, 0 = no limit
      default: 0
    }
  },
  
  // Resources (LinkedIn Learning Style)
  resources: [{
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['pdf', 'doc', 'video', 'link', 'exercise-file', 'template'],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    description: String,
    size: String, // e.g., "2.5 MB"
    downloadCount: {
      type: Number,
      default: 0
    }
  }],
  
  // Learning Objectives
  learningObjectives: [{
    type: String,
    trim: true
  }],
  
  // Notes and Tips
  instructorNotes: {
    type: String,
    trim: true
  },
  studentTips: [{
    type: String,
    trim: true
  }],
  
  // Analytics
  views: {
    type: Number,
    default: 0
  },
  completionRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  averageWatchTime: {
    type: Number,
    default: 0 // in seconds
  },
  
  // Metadata
  tags: [String],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
lessonSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for formatted duration (LinkedIn Learning Style)
lessonSchema.virtual('formattedDuration').get(function() {
  const minutes = Math.floor(this.content.duration / 60);
  const seconds = this.content.duration % 60;
  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${seconds}s`;
});

// Virtual for short duration indicator
lessonSchema.virtual('isShortLesson').get(function() {
  return this.content.duration <= 180; // 3 minutes or less
});

// Method to check if lesson is accessible to student
lessonSchema.methods.isAccessible = function(studentEnrollment) {
  if (this.isFree) return true;
  if (!studentEnrollment) return false;
  return studentEnrollment.status === 'active';
};

// Method to get lesson progress for a student
lessonSchema.methods.getStudentProgress = function(studentId) {
  // This would be implemented with a separate progress tracking system
  return {
    watched: false,
    watchTime: 0,
    completed: false,
    quizScore: null
  };
};

// Static method to get lessons by course
lessonSchema.statics.findByCourse = function(courseId, options = {}) {
  const query = { course: courseId };
  
  if (options.status) {
    query.status = options.status;
  }
  
  return this.find(query)
    .sort({ order: 1 })
    .populate('course', 'title slug');
};

// Static method to get bite-sized lessons (LinkedIn Learning Style)
lessonSchema.statics.findBiteSized = function(courseId, maxDuration = 300) { // 5 minutes max
  return this.find({
    course: courseId,
    'content.duration': { $lte: maxDuration },
    status: 'published'
  }).sort({ order: 1 });
};

// Static method to get lesson statistics
lessonSchema.statics.getLessonStats = function(lessonId) {
  return this.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(lessonId) } },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'courseInfo'
      }
    },
    {
      $project: {
        title: 1,
        views: 1,
        completionRate: 1,
        averageWatchTime: 1,
        courseTitle: { $arrayElemAt: ['$courseInfo.title', 0] }
      }
    }
  ]);
};

module.exports = mongoose.model('Lesson', lessonSchema); 