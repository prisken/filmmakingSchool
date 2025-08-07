const express = require('express');
const { auth } = require('../middleware/auth');
const Event = require('../models/Event');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
router.get('/', async (req, res) => {
  try {
    const { type, status } = req.query;
    let query = {};
    
    if (type && type !== 'all') {
      query.type = type;
    }
    
    if (status) {
      query.status = status;
    }
    
    const events = await Event.find(query)
      .populate('organizer', 'firstName lastName')
      .sort({ startDate: 1 });
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

// @route   POST /api/events
// @desc    Create a new event
router.post('/', auth, async (req, res) => {
  try {
    const { user } = req;
    
    // Check if user is admin or teacher
    if (user.role !== 'admin' && user.role !== 'teacher') {
      return res.status(403).json({ message: 'Not authorized to create events' });
    }
    
    const eventData = {
      ...req.body,
      organizer: user._id,
      publishedAt: req.body.status === 'published' ? new Date() : null
    };
    
    const event = new Event(eventData);
    await event.save();
    
    res.status(201).json({ event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/events/:id
// @desc    Update an event
router.put('/:id', auth, async (req, res) => {
  try {
    const { user } = req;
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is authorized to update this event
    if (user.role !== 'admin' && event.organizer.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }
    
    const updateData = { ...req.body };
    if (req.body.status === 'published' && event.status !== 'published') {
      updateData.publishedAt = new Date();
    }
    
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('organizer', 'firstName lastName');
    
    res.json({ event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
router.delete('/:id', auth, async (req, res) => {
  try {
    const { user } = req;
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is authorized to delete this event
    if (user.role !== 'admin' && event.organizer.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register for an event
router.post('/:id/register', auth, async (req, res) => {
  try {
    const { user } = req;
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    if (event.status !== 'published' && event.status !== 'registration-open') {
      return res.status(400).json({ message: 'Event registration is not open' });
    }
    
    if (event.isFull()) {
      return res.status(400).json({ message: 'Event is full' });
    }
    
    if (event.isRegistered(user._id)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }
    
    await event.registerUser(user._id, req.body.ticketType || 'regular');
    
    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @route   POST /api/events/:id/like
// @desc    Toggle like for an event
router.post('/:id/like', auth, async (req, res) => {
  try {
    const { user } = req;
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    await event.toggleLike(user._id);
    
    res.json({ message: 'Like toggled successfully' });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 