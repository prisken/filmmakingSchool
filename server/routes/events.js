const express = require('express');
const { auth } = require('../middleware/auth');
const Event = require('../models/Event');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.findUpcoming()
      .populate('organizer', 'firstName lastName');
    res.json({ events });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/events/:slug
// @desc    Get event by slug
router.get('/:slug', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug, status: 'published' })
      .populate('organizer', 'firstName lastName');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json({ event });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 