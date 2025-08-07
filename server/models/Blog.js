const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  // Basic Info
  title: { type: String, required: true, trim: true, maxlength: 200 },
  subtitle: { type: String, maxlength: 300 },
  content: { type: String, required: true },
  excerpt: { type: String, maxlength: 500 },
  
  // Language
  language: { type: String, enum: ['zh', 'en'], required: true },
  originalPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  translations: [{
    language: { type: String, enum: ['zh', 'en'] },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
  }],
  
  // Categories
  category: {
    type: String,
    required: true,
    enum: ['filmmaking-basics', 'directing', 'cinematography', 'editing', 'screenwriting', 'sound-design', 'production-design', 'acting', 'documentary', 'commercial', 'music-video', 'short-film', 'feature-film', 'animation', 'visual-effects', 'color-grading', 'distribution', 'marketing', 'career-advice', 'industry-news', 'equipment-reviews', 'tutorials', 'interviews', 'case-studies']
  },
  tags: [String],
  
  // Author
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coAuthors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  // Media
  featuredImage: { type: String, required: true },
  images: [{ url: String, caption: String, alt: String, order: Number }],
  videos: [{ url: String, caption: String, type: { type: String, enum: ['youtube', 'vimeo', 'direct'] } }],
  
  // SEO
  slug: { type: String, unique: true, required: true },
  metaTitle: { type: String, maxlength: 60 },
  metaDescription: { type: String, maxlength: 160 },
  keywords: [String],
  
  // Status
  status: { type: String, enum: ['draft', 'published', 'scheduled', 'archived'], default: 'draft' },
  publishedAt: Date,
  scheduledAt: Date,
  
  // Engagement
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  shares: {
    facebook: { type: Number, default: 0 },
    twitter: { type: Number, default: 0 },
    linkedin: { type: Number, default: 0 },
    wechat: { type: Number, default: 0 },
    weibo: { type: Number, default: 0 }
  },
  
  // Comments
  commentsEnabled: { type: Boolean, default: true },
  comments: [{
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, maxlength: 1000 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isApproved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  
  // Related Content
  relatedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  relatedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  
  // Content Info
  readingTime: { type: Number, default: 0 }, // minutes
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  
  // Featured
  featured: { type: Boolean, default: false },
  featuredOrder: { type: Number, default: 0 },
  promoted: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
blogSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

blogSchema.virtual('commentCount').get(function() {
  return this.comments.filter(c => c.isApproved).length;
});

blogSchema.virtual('totalShares').get(function() {
  return Object.values(this.shares).reduce((sum, count) => sum + count, 0);
});

blogSchema.virtual('isPublished').get(function() {
  return this.status === 'published';
});

// Indexes
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });
blogSchema.index({ category: 1, status: 1, publishedAt: -1 });
blogSchema.index({ author: 1, createdAt: -1 });
blogSchema.index({ slug: 1, language: 1 });
blogSchema.index({ featured: 1, featuredOrder: 1 });

// Pre-save middleware
blogSchema.pre('save', function(next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 500).replace(/<[^>]*>/g, '');
  }
  if (!this.metaTitle) this.metaTitle = this.title;
  if (!this.metaDescription) {
    this.metaDescription = this.excerpt || this.content.substring(0, 160).replace(/<[^>]*>/g, '');
  }
  if (this.content) {
    const wordCount = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / 200);
  }
  next();
});

// Methods
blogSchema.methods.isLikedBy = function(userId) {
  return this.likes.some(like => like.toString() === userId.toString());
};

blogSchema.methods.toggleLike = function(userId) {
  const likeIndex = this.likes.findIndex(like => like.toString() === userId.toString());
  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push(userId);
  }
  return this.save();
};

blogSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Static methods
blogSchema.statics.findPublished = function() {
  return this.find({ status: 'published' }).sort({ publishedAt: -1 });
};

blogSchema.statics.findByCategory = function(category) {
  return this.find({ category, status: 'published' }).sort({ publishedAt: -1 });
};

blogSchema.statics.findFeatured = function() {
  return this.find({ status: 'published', featured: true }).sort({ featuredOrder: 1, publishedAt: -1 });
};

blogSchema.statics.search = function(query, language = null) {
  const searchQuery = { $text: { $search: query }, status: 'published' };
  if (language) searchQuery.language = language;
  return this.find(searchQuery).sort({ score: { $meta: 'textScore' } });
};

module.exports = mongoose.model('Blog', blogSchema); 