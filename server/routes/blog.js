const express = require('express');
const { auth } = require('../middleware/auth');
const Blog = require('../models/Blog');

const router = express.Router();

// @route   GET /api/blog
// @desc    Get all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find({ status: 'published' })
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

// @route   POST /api/blog
// @desc    Create new blog post
router.post('/', auth, async (req, res) => {
  try {
    const { title, subtitle, content, excerpt, category, language, featuredImage, tags, status } = req.body;
    
    const post = new Blog({
      title,
      subtitle,
      content,
      excerpt,
      category,
      language,
      featuredImage,
      tags,
      status,
      author: req.user.id,
      slug: title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')
    });
    
    await post.save();
    res.status(201).json({ post });
  } catch (error) {
    console.error('Blog creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blog/:id
// @desc    Update blog post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
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
    console.error('Blog update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete blog post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
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
    console.error('Blog deletion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 