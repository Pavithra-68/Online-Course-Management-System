const Course = require("../models/courseModel");
const Enrollment = require("../models/enrollmentModel");

const { generateCertificate } = require("../utils/certificateGenerator");

exports.getCertificate = async (req, res) => {
  try {
    const userId = req.user._id;
    const courseId = req.params.courseId;

    // check if enrolled
    const enrolled = await Enrollment.findOne({ userId, courseId });
    if (!enrolled) {
      return res.status(400).json({
        message: "User is not enrolled in this course"
      });
    }

    // fetch user & course info
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    const certificate = {
      studentName: user.name,
      courseName: course.title,
      issuedDate: new Date().toDateString(),
    };

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// GET ALL COURSES (with enrolled flag)
exports.getCourses = async (req, res) => {
  try {
    const userId = req.user?._id;

    const courses = await Course.find().sort({ createdAt: -1 });

    // If user not logged in → enrolled = false
    if (!userId) {
      return res.json(
        courses.map(course => ({
          ...course.toObject(),
          enrolled: false,
        }))
      );
    }

    // Fetch enrolled course IDs
    const enrolled = await Enrollment.find({ userId });
    const enrolledIds = enrolled.map(e => e.courseId.toString());

    // Attach enrolled flag to each course
    const updatedCourses = courses.map(course => ({
      ...course.toObject(),
      enrolled: enrolledIds.includes(course._id.toString())
    }));

    res.json(updatedCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADD COURSE (Admin)
exports.addCourse = async (req, res) => {
  try {
    const { title, description, price, content } = req.body;

    const course = await Course.create({
      title,
      description,
      price,
      content,
    });

    res.json({ message: "Course added successfully", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE COURSE
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE COURSE (Admin)
exports.updateCourse = async (req, res) => {
  try {
    const { title, description, content, price } = req.body;

    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, content, price },
      { new: true }
    );

    res.json({ message: "Course updated", course: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE COURSE (Admin)
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
