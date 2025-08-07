const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  type: { type: String, required: true, enum: ['workshop', 'masterclass', 'competition', 'festival', 'screening', 'networking', 'conference', 'project-showcase'] },
  category: { type: String, required: true, enum: ['directing', 'cinematography', 'editing', 'screenwriting', 'sound-design', 'production-design', 'acting', 'documentary', 'commercial', 'music-video', 'short-film', 'feature-film'] },
  language: { type: String, enum: ['zh', 'en', 'both'], default: 'zh' },
  
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  timezone: { type: String, default: 'Asia/Shanghai' },
  
  location: {
    type: { type: String, enum: ['physical', 'online', 'hybrid'], required: true },
    address: String,
    city: String,
    country: String,
    venue: String,
    onlinePlatform: String,
    meetingUrl: String
  },
  
  banner: { type: String, required: true },
  images: [{ url: String, caption: String }],
  
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  instructors: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, role: String }],
  
  pricing: {
    earlyBird: { price: Number, currency: { type: String, default: 'CNY' }, availableUntil: Date },
    regular: { price: Number, currency: { type: String, default: 'CNY' } },
    isFree: { type: Boolean, default: false }
  },
  
  capacity: { total: { type: Number, required: true }, reserved: { type: Number, default: 0 } },
  registrationDeadline: Date,
  registrationOpen: { type: Boolean, default: true },
  
  registrations: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ticketType: { type: String, enum: ['early-bird', 'regular'] },
    registeredAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['confirmed', 'pending', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' }
  }],
  
  schedule: [{ time: Date, title: String, description: String, speaker: String, duration: Number }],
  prerequisites: [String],
  requirements: [String],
  whatYouWillLearn: [String],
  
  project: {
    genre: String,
    duration: String,
    theme: String,
    prizes: [{ place: String, prize: String }],
    submissionDeadline: Date
  },
  
  status: { type: String, enum: ['draft', 'published', 'registration-open', 'completed', 'cancelled'], default: 'draft' },
  publishedAt: Date,
  
  slug: { type: String, unique: true, required: true },
  metaTitle: String,
  metaDescription: String,
  keywords: [String],
  
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  featured: { type: Boolean, default: false },
  featuredOrder: { type: Number, default: 0 },
  tags: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
eventSchema.virtual('registrationCount').get(function() {
  return this.registrations.filter(r => r.status === 'confirmed').length;
});

eventSchema.virtual('availableSpots').get(function() {
  return this.capacity.total - this.registrationCount - this.capacity.reserved;
});

eventSchema.virtual('isFull').get(function() {
  return this.availableSpots <= 0;
});

eventSchema.virtual('isUpcoming').get(function() {
  return new Date() < this.startDate;
});

eventSchema.virtual('isOngoing').get(function() {
  const now = new Date();
  return now >= this.startDate && now <= this.endDate;
});

eventSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Indexes
eventSchema.index({ title: 'text', description: 'text', tags: 'text' });
eventSchema.index({ type: 1, category: 1, status: 1, startDate: 1 });
eventSchema.index({ organizer: 1, createdAt: -1 });

// Methods
eventSchema.methods.isRegistered = function(userId) {
  return this.registrations.some(r => r.user.toString() === userId.toString());
};

eventSchema.methods.registerUser = function(userId, ticketType = 'regular') {
  if (this.isRegistered(userId)) throw new Error('Already registered');
  if (this.isFull()) throw new Error('Event is full');
  
  this.registrations.push({ user: userId, ticketType, status: 'pending' });
  return this.save();
};

eventSchema.methods.isLikedBy = function(userId) {
  return this.likes.some(like => like.toString() === userId.toString());
};

eventSchema.methods.toggleLike = function(userId) {
  const likeIndex = this.likes.findIndex(like => like.toString() === userId.toString());
  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push(userId);
  }
  return this.save();
};

// Static methods
eventSchema.statics.findUpcoming = function() {
  return this.find({ 
    status: { $in: ['published', 'registration-open'] },
    startDate: { $gt: new Date() }
  }).sort({ startDate: 1 });
};

eventSchema.statics.findFeatured = function() {
  return this.find({ 
    featured: true, 
    status: { $in: ['published', 'registration-open'] } 
  }).sort({ featuredOrder: 1, startDate: 1 });
};

module.exports = mongoose.model('Event', eventSchema); 