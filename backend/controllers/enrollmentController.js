const Enrollment = require("../models/enrollmentModel");
const Course = require("../models/courseModel");
const Payment = require("../models/paymentModel");

// ENROLL IN COURSE
exports.enrollCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.body;

    // 1. CHECK PAYMENT FIRST
    const payment = await Payment.findOne({ userId, courseId });

    if (!payment || payment.status !== "success") {
      return res.status(400).json({
        message: "Payment not completed. Please pay before enrolling."
      });
    }

    // 2. CHECK IF ALREADY ENROLLED
    const exist = await Enrollment.findOne({ userId, courseId });
    if (exist) {
      return res.status(400).json({
        message: "Already enrolled in this course"
      });
    }

    // 3. ENROLL USER
    const enroll = await Enrollment.create({ userId, courseId });

    res.json({
      message: "Enrollment successful",
      enroll
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL ENROLLED COURSES
exports.getMyCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    // Populate course info
    const enrolledCourses = await Enrollment.find({ userId })
      .populate("courseId");

    res.json(enrolledCourses);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
