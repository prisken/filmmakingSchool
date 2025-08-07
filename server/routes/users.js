const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ user: user.getPublicProfile() });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, bio, phone, city, country } = req.body;
    const user = await User.findById(req.user.id);
    
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (bio) user.bio = bio;
    if (phone) user.phone = phone;
    if (city) user.city = city;
    if (country) user.country = country;
    
    await user.save();
    res.json({ user: user.getPublicProfile() });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 