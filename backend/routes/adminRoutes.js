const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { getStats } = require("../controllers/adminController");

const router = express.Router();

router.get("/stats", protect, admin, getStats);

module.exports = router;
