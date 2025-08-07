const express = require('express');
const { auth, teacherAuth, adminAuth } = require('../middleware/auth');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

const router = express.Router();

// @route   GET /api/lessons/course/:courseId
// @desc    Get all lessons for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { user } = req;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Get lessons
    const lessons = await Lesson.findByCourse(courseId, { status: 'published' });

    // If user is not authenticated, only show free lessons
    if (!user) {
      const freeLessons = lessons.filter(lesson => lesson.isFree);
      return res.json({ lessons: freeLessons });
    }

    // If user is admin or teacher of the course, show all lessons
    if (user.role === 'admin' || course.instructor.toString() === user._id.toString()) {
      return res.json({ lessons });
    }

    // For students, check enrollment
    const enrollment = course.enrolledStudents.find(e => e.student.toString() === user._id.toString());
    
    if (enrollment && enrollment.status === 'active') {
      // Enrolled student can see all lessons
      return res.json({ lessons });
    } else {
      // Non-enrolled student can only see free lessons
      const freeLessons = lessons.filter(lesson => lesson.isFree);
      return res.json({ lessons: freeLessons });
    }

  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/lessons/:lessonId
// @desc    Get a specific lesson
router.get('/:lessonId', async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { user } = req;

    const lesson = await Lesson.findById(lessonId).populate('course', 'title slug instructor');
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Check if lesson is published
    if (lesson.status !== 'published') {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // If lesson is free, anyone can access it
    if (lesson.isFree) {
      return res.json({ lesson });
    }

    // If user is not authenticated, deny access
    if (!user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // If user is admin or teacher of the course, allow access
    if (user.role === 'admin' || lesson.course.instructor.toString() === user._id.toString()) {
      return res.json({ lesson });
    }

    // For students, check enrollment
    const course = await Course.findById(lesson.course._id);
    const enrollment = course.enrolledStudents.find(e => e.student.toString() === user._id.toString());
    
    if (enrollment && enrollment.status === 'active') {
      return res.json({ lesson });
    } else {
      return res.status(403).json({ message: 'Enrollment required to access this lesson' });
    }

  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/lessons
// @desc    Create a new lesson (Teacher/Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { 
      courseId, title, description, videoUrl, thumbnailUrl, duration, 
      order, isFree, transcript, subtitles, resources, quiz 
    } = req.body;

    // Check if user has permission to create lessons
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only teachers and admins can create lessons' });
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // If teacher, check if they own the course
    if (req.user.role === 'teacher' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only create lessons for your own courses' });
    }

    // Validate required fields
    if (!title || !videoUrl || !duration || order === undefined) {
      return res.status(400).json({ message: 'Title, video URL, duration, and order are required' });
    }

    // Create new lesson
    const lesson = new Lesson({
      course: courseId,
      title,
      description: description || '',
      videoUrl,
      thumbnailUrl: thumbnailUrl || '',
      duration,
      order,
      isFree: isFree || false,
      transcript: transcript || '',
      subtitles: subtitles || [],
      resources: resources || [],
      quiz: quiz || { questions: [] }
    });

    await lesson.save();

    // Add lesson to course
    course.lessons.push(lesson._id);
    await course.save();

    res.status(201).json({
      message: 'Lesson created successfully',
      lesson: {
        _id: lesson._id,
        title: lesson.title,
        order: lesson.order,
        isFree: lesson.isFree,
        status: lesson.status
      }
    });

  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/lessons/:lessonId
// @desc    Update a lesson (Teacher/Admin only)
router.put('/:lessonId', auth, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const updateData = req.body;

    // Check if user has permission to update lessons
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only teachers and admins can update lessons' });
    }

    // Find the lesson
    const lesson = await Lesson.findById(lessonId).populate('course', 'instructor');
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // If teacher, check if they own the course
    if (req.user.role === 'teacher' && lesson.course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only update lessons for your own courses' });
    }

    // Update the lesson
    Object.keys(updateData).forEach(key => {
      if (key !== '_id' && key !== 'course') {
        lesson[key] = updateData[key];
      }
    });

    await lesson.save();

    res.json({
      message: 'Lesson updated successfully',
      lesson: {
        _id: lesson._id,
        title: lesson.title,
        order: lesson.order,
        isFree: lesson.isFree,
        status: lesson.status
      }
    });

  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/lessons/:lessonId
// @desc    Delete a lesson (Teacher/Admin only)
router.delete('/:lessonId', auth, async (req, res) => {
  try {
    const { lessonId } = req.params;

    // Check if user has permission to delete lessons
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only teachers and admins can delete lessons' });
    }

    // Find the lesson
    const lesson = await Lesson.findById(lessonId).populate('course', 'instructor');
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // If teacher, check if they own the course
    if (req.user.role === 'teacher' && lesson.course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete lessons for your own courses' });
    }

    // Remove lesson from course
    const course = await Course.findById(lesson.course._id);
    course.lessons = course.lessons.filter(l => l.toString() !== lessonId);
    await course.save();

    // Delete the lesson
    await Lesson.findByIdAndDelete(lessonId);

    res.json({ message: 'Lesson deleted successfully' });

  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/lessons/:lessonId/free-status
// @desc    Toggle lesson free status (Teacher/Admin only)
router.put('/:lessonId/free-status', auth, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { isFree } = req.body;

    // Check if user has permission
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only teachers and admins can modify lesson access' });
    }

    // Find the lesson
    const lesson = await Lesson.findById(lessonId).populate('course', 'instructor');
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // If teacher, check if they own the course
    if (req.user.role === 'teacher' && lesson.course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only modify lessons for your own courses' });
    }

    // Update free status
    lesson.isFree = isFree;
    await lesson.save();

    res.json({
      message: `Lesson ${isFree ? 'made free' : 'made paid'} successfully`,
      lesson: {
        _id: lesson._id,
        title: lesson.title,
        isFree: lesson.isFree
      }
    });

  } catch (error) {
    console.error('Toggle lesson free status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 