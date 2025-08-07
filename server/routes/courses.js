const express = require('express');
const { auth, adminAuth, teacherAuth } = require('../middleware/auth');
const Course = require('../models/Course');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ status: 'published' }).populate('instructor', 'firstName lastName');
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/courses
// @desc    Create a new course (Teacher/Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, price, category, level, duration, language, status, instructor, slug } = req.body;

    // Check if user has permission to create courses
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only teachers and admins can create courses' });
    }

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    // Create new course
    const course = new Course({
      title,
      description,
      price: price || 0,
      category: category || 'filmmaking',
      level: level || 'beginner',
      duration: duration || '',
      language: language || 'zh',
      status: status || 'draft',
      instructor: instructor || req.user._id,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      lessons: [],
      enrollments: [],
      ratings: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await course.save();

    res.status(201).json({
      message: 'Course created successfully',
      course: {
        _id: course._id,
        title: course.title,
        slug: course.slug,
        status: course.status,
        instructor: course.instructor
      }
    });

  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/courses/:slug
// @desc    Get course by slug
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, status: 'published' })
      .populate('instructor', 'firstName lastName bio');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ course });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/courses/:slug/lessons
// @desc    Get lessons for a specific course
router.get('/:slug/lessons', async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, status: 'published' })
      .populate('lessons');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ lessons: course.lessons || [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/courses/enroll
// @desc    Enroll a student in a course (Admin/Teacher only)
router.post('/enroll', auth, async (req, res) => {
  try {
    const { courseId, studentEmail, enrollmentType, enrolledBy, enrolledByRole } = req.body;

    // Validate input
    if (!courseId || !studentEmail || !enrollmentType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user has permission to enroll students
    if (enrolledByRole !== 'admin' && enrolledByRole !== 'teacher') {
      return res.status(403).json({ message: 'Only admins and teachers can enroll students' });
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // If teacher, check if they own the course
    if (enrolledByRole === 'teacher' && course.instructor.toString() !== enrolledBy) {
      return res.status(403).json({ message: 'You can only enroll students in your own courses' });
    }

    // Find the student by email
    const student = await User.findOne({ email: studentEmail, role: 'student' });
    if (!student) {
      return res.status(404).json({ message: 'Student not found with this email' });
    }

    // Check if student is already enrolled
    const existingEnrollment = course.enrollments.find(
      enrollment => enrollment.student.toString() === student._id.toString()
    );

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Student is already enrolled in this course' });
    }

    // Create enrollment record
    const enrollment = {
      student: student._id,
      enrolledAt: new Date(),
      enrollmentType,
      enrolledBy,
      enrolledByRole,
      status: 'active',
      progress: 0,
      completedLessons: []
    };

    // Add enrollment to course
    course.enrollments.push(enrollment);
    await course.save();

    // Add course to student's enrolled courses
    if (!student.enrolledCourses) {
      student.enrolledCourses = [];
    }
    
    const studentEnrollment = {
      course: course._id,
      enrolledAt: new Date(),
      enrollmentType,
      enrolledBy,
      enrolledByRole,
      status: 'active',
      progress: 0,
      completedLessons: []
    };

    student.enrolledCourses.push(studentEnrollment);
    await student.save();

    res.status(201).json({
      message: 'Student successfully enrolled',
      enrollment: {
        student: {
          _id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email
        },
        course: {
          _id: course._id,
          title: course.title,
          slug: course.slug
        },
        enrollmentType,
        enrolledAt: enrollment.enrolledAt
      }
    });

  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/courses/:courseId/enrollments
// @desc    Get course enrollments (Admin/Teacher only)
router.get('/:courseId/enrollments', auth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { user } = req;

    // Find the course
    const course = await Course.findById(courseId)
      .populate('enrollments.student', 'firstName lastName email')
      .populate('instructor', 'firstName lastName');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check permissions
    if (user.role !== 'admin' && course.instructor.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      course: {
        _id: course._id,
        title: course.title,
        instructor: course.instructor
      },
      enrollments: course.enrollments
    });

  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/courses/:courseId/enrollments/:enrollmentId
// @desc    Update enrollment status (Admin/Teacher only)
router.put('/:courseId/enrollments/:enrollmentId', auth, async (req, res) => {
  try {
    const { courseId, enrollmentId } = req.params;
    const { status, progress } = req.body;
    const { user } = req;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check permissions
    if (user.role !== 'admin' && course.instructor.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Find and update the enrollment
    const enrollment = course.enrollments.id(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (status) enrollment.status = status;
    if (progress !== undefined) enrollment.progress = progress;

    await course.save();

    res.json({
      message: 'Enrollment updated successfully',
      enrollment
    });

  } catch (error) {
    console.error('Update enrollment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 