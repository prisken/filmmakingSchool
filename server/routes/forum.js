const express = require('express');
const { auth } = require('../middleware/auth');
const Forum = require('../models/Forum');

const router = express.Router();

// @route   GET /api/forum
// @desc    Get all forum posts
router.get('/', async (req, res) => {
  try {
    const posts = await Forum.find({ status: 'active' })
      .populate('author', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/forum
// @desc    Create new forum post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, category, type } = req.body;
    const post = new Forum({
      title,
      content,
      category,
      type,
      author: req.user.id,
      slug: title.toLowerCase().replace(/\s+/g, '-')
    });
    
    await post.save();
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 