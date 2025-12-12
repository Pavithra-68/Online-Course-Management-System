const Quiz = require("../models/quizModel");
const QuizResult = require("../models/quizResultModel");

// ADD QUIZ QUESTION (Admin)
exports.addQuestion = async (req, res) => {
  try {
    const { courseId, question, options, answer } = req.body;

    const quiz = await Quiz.create({
      courseId,
      question,
      options,
      answer
    });

    res.json({ message: "Question added", quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET QUIZ QUESTIONS (User)
exports.getQuiz = async (req, res) => {
  try {
    const { courseId } = req.params;

    const questions = await Quiz.find({ courseId });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SUBMIT QUIZ (User)
exports.submitQuiz = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId, answers } = req.body;

    const questions = await Quiz.find({ courseId });

    if (!questions || questions.length === 0) {
      return res.status(400).json({ message: "No quiz found for this course" });
    }

    // Score calculation
    let score = 0;
    questions.forEach((q, i) => {
      if (q.answer === answers[i]) score++;
    });

    const passingMarks = Math.ceil(questions.length * 0.5); // 50% pass

    // Save result
    await QuizResult.findOneAndUpdate(
      { userId, courseId },
      { score, passingMarks },
      { upsert: true }
    );

    res.json({
      score,
      passingMarks,
      passed: score >= passingMarks
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
