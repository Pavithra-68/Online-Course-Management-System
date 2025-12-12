const express = require("express");
const { 
  addCourse, 
  getCourses, 
  getCourse, 
  updateCourse, 
  deleteCourse 
} = require("../controllers/courseController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin Routes
router.post("/add", protect, admin, addCourse);
router.put("/:id", protect, admin, updateCourse);
router.delete("/:id", protect, admin, deleteCourse);

// Public Routes
router.get("/", protect, getCourses);
router.get("/:id", getCourse);

module.exports = router;
