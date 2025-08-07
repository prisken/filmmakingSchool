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
    const { title, content, category, type, tags, pitch } = req.body;
    const post = new Forum({
      title,
      content,
      category,
      type,
      tags,
      pitch,
      author: req.user.id,
      slug: title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')
    });
    
    await post.save();
    res.status(201).json({ post });
  } catch (error) {
    console.error('Forum creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/forum/:id
// @desc    Update forum post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Forum.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Only author or admin can update
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    Object.assign(post, req.body);
    await post.save();
    
    res.json({ post });
  } catch (error) {
    console.error('Forum update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/forum/:id
// @desc    Delete forum post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Forum.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Only author or admin can delete
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Forum deletion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/forum/:id/like
// @desc    Like/unlike forum post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Forum.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    await post.toggleLike(req.user.id);
    res.json({ post });
  } catch (error) {
    console.error('Forum like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 