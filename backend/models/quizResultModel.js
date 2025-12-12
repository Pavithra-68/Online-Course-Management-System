const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  score: { type: Number, required: true },
  passingMarks: { type: Number, default: 50 }  // 50% is pass
});

module.exports = mongoose.model("QuizResult", quizResultSchema);
