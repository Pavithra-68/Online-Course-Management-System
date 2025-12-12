const express = require("express");
const { addQuestion, getQuiz, submitQuiz } = require("../controllers/quizController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin adds quiz questions
router.post("/add", protect, admin, addQuestion);

// User submits answers
router.post("/submit", protect, submitQuiz);

// User fetches quiz
router.get("/:courseId", protect, getQuiz);

module.exports = router;
