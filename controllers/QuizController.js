import { validationResult } from "express-validator";
import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js"

export const createQuiz = async (req, res) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(500).json(error.array());
    }
    const { title, description, questions } = req.body;

    const newQuiz = new Quiz({
      title,
      description
    })
    await newQuiz.save();

    let questionIds = [];

    for (const q of questions) {
      const newQuestion = new Question({
        quiz: newQuiz._id,
        text: q.text
      });
      await newQuestion.save();
      questionIds.push(newQuestion._id);

      let answerIds = [];

      for (const a of q.answers) {
        const newAnswer = new Answer({
          question: newQuestion._id,
          text: a.text,
          isCorrect: a.isCorrect
        });
        await newAnswer.save();
        answerIds.push(newAnswer._id);
      }

      newQuestion.answers = answerIds;
      await newQuestion.save();
    }
    newQuiz.questions = questionIds;
    await newQuiz.save();

    res.json(newQuiz);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "quiz error"
    })
  }
};

export const getAll = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate({
      path: "questions",
      populate: { path: "answers" }
    });
    res.json({ data: quizzes, status: 200 })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "get all quizzes error"
    })
  };
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id)
      .populate({
        path: "questions",
        populate: { path: "answers" }
      });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json({ data: quiz, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuiz = await Quiz.findOneAndDelete({ _id: id });

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Can’t delete quiz" });
  }

};
