const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { collection: "quizzes" }
);

const QuizConfig = mongoose.model("QuizConfig", QuizSchema);

module.exports = QuizConfig;
