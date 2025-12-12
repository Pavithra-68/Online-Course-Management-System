const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Enrollment = require("../models/enrollmentModel");
const QuizResult = require("../models/quizResultModel");

exports.getStats = async (req, res) => {
  const users = await User.countDocuments();
  const courses = await Course.countDocuments();
  const enrollments = await Enrollment.countDocuments();
  const quizzes = await QuizResult.countDocuments();

  res.json({ users, courses, enrollments, quizzes });
};
