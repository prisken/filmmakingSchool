const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: [2000, 'Comment cannot exceed 2000 characters']
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: Date,
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }
}, {
  timestamps: true
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    maxlength: [200, 'Post title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    maxlength: [10000, 'Post content cannot exceed 10000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'general', 'directing', 'cinematography', 'editing', 'screenwriting',
      'sound-design', 'production-design', 'acting', 'documentary',
      'commercial', 'music-video', 'short-film', 'feature-film',
      'project-pitch', 'collaboration', 'equipment', 'locations',
      'funding', 'distribution', 'festivals', 'career-advice'
    ]
  },
  type: {
    type: String,
    enum: ['discussion', 'question', 'project-pitch', 'collaboration', 'announcement'],
    default: 'discussion'
  },
  tags: [String],
  
  // Project Pitch Specific Fields
  pitch: {
    genre: String,
    budget: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'CNY' }
    },
    timeline: {
      startDate: Date,
      endDate: Date
    },
    location: String,
    crewNeeded: [{
      role: String,
      description: String,
      isPaid: Boolean,
      compensation: String
    }],
    equipment: [String],
    synopsis: String,
    targetAudience: String,
    uniqueSellingPoint: String
  },
  
  // Engagement
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  comments: [commentSchema],
  
  // Status
  status: {
    type: String,
    enum: ['active', 'closed', 'featured', 'pinned'],
    default: 'active'
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: Date,
  
  // Moderation
  isModerated: {
    type: Boolean,
    default: false
  },
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderationReason: String,
  
  // Course Association
  relatedCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  
  // SEO
  slug: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
postSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

postSchema.virtual('dislikeCount').get(function() {
  return this.dislikes.length;
});

postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

postSchema.virtual('score').get(function() {
  return this.likes.length - this.dislikes.length;
});

postSchema.virtual('isProjectPitch').get(function() {
  return this.type === 'project-pitch';
});

// Indexes
postSchema.index({ title: 'text', content: 'text', tags: 'text' });
postSchema.index({ category: 1, type: 1, status: 1, createdAt: -1 });
postSchema.index({ author: 1, createdAt: -1 });

// Methods
postSchema.methods.isLikedBy = function(userId) {
  return this.likes.some(like => like.toString() === userId.toString());
};

postSchema.methods.isDislikedBy = function(userId) {
  return this.dislikes.some(dislike => dislike.toString() === userId.toString());
};

postSchema.methods.toggleLike = function(userId) {
  const likeIndex = this.likes.findIndex(like => like.toString() === userId.toString());
  const dislikeIndex = this.dislikes.findIndex(dislike => dislike.toString() === userId.toString());
  
  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push(userId);
    if (dislikeIndex > -1) {
      this.dislikes.splice(dislikeIndex, 1);
    }
  }
  
  return this.save();
};

postSchema.methods.toggleDislike = function(userId) {
  const dislikeIndex = this.dislikes.findIndex(dislike => dislike.toString() === userId.toString());
  const likeIndex = this.likes.findIndex(like => like.toString() === userId.toString());
  
  if (dislikeIndex > -1) {
    this.dislikes.splice(dislikeIndex, 1);
  } else {
    this.dislikes.push(userId);
    if (likeIndex > -1) {
      this.likes.splice(likeIndex, 1);
    }
  }
  
  return this.save();
};

postSchema.methods.addComment = function(commentData) {
  this.comments.push(commentData);
  return this.save();
};

postSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Static methods
postSchema.statics.findByCategory = function(category) {
  return this.find({ category, status: 'active' }).sort({ createdAt: -1 });
};

postSchema.statics.findProjectPitches = function() {
  return this.find({ type: 'project-pitch', status: 'active' }).sort({ createdAt: -1 });
};

postSchema.statics.findFeatured = function() {
  return this.find({ status: 'featured' }).sort({ createdAt: -1 });
};

postSchema.statics.search = function(query) {
  return this.find({
    $text: { $search: query },
    status: 'active'
  }).sort({ score: { $meta: 'textScore' } });
};

module.exports = mongoose.model('Forum', postSchema); 