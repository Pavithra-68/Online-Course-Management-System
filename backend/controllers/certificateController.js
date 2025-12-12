const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Enrollment = require("../models/enrollmentModel");   // <-- ADD THIS

exports.getCertificate = async (req, res) => {
  try {
    const userId = req.user._id;
    const courseId = req.params.courseId;

    // Check enrollment
    const enrolled = await Enrollment.findOne({ userId, courseId });
    if (!enrolled) {
      return res.status(400).json({ message: "User is not enrolled in this course" });
    }

    // Fetch user and course
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    // Build certificate object
    const certificate = {
      studentName: user.name,
      courseName: course.title,
      issuedDate: new Date().toDateString()
    };

    res.json(certificate);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
