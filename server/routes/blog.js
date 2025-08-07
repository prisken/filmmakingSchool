const express = require('express');
const { auth } = require('../middleware/auth');
const Blog = require('../models/Blog');

const router = express.Router();

// @route   GET /api/blog
// @desc    Get all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.findPublished()
      .populate('author', 'firstName lastName')
      .sort({ publishedAt: -1 });
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/:slug
// @desc    Get blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug, status: 'published' })
      .populate('author', 'firstName lastName');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 