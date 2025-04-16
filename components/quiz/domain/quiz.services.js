import * as QuizRepository from "../data-access/quiz.repository.js"
import { createQuiz } from "../data-access/quiz.repository.js";
import { createQuestion } from "../../question/data-access/question.repository.js";
import { createAnswers } from "../../answer/data-access/answer.repository.js"
import mongoose from 'mongoose';

export const createQuizWithQuestions = async ({ title, description, questions }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const quiz = await createQuiz({ title, description }, session);
    const questionIds = [];

    for (const q of questions) {
      const question = await createQuestion({ quiz: quiz._id, text: q.text }, session);
      questionIds.push(question._id);

      const answerDocs = q.answers.map((a) => ({
        question: question._id,
        text: a.text,
        isCorrect: a.isCorrect
      }));

      const savedAnswers = await createAnswers(answerDocs, session);
      const answerIds = savedAnswers.map(a => a._id);

      await updateQuestionAnswers(question._id, answerIds, session);
    }

    const updatedQuiz = await updateQuizQuestions(quiz._id, questionIds, session);

    await session.commitTransaction();
    session.endSession();

    return updatedQuiz;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log("Fail of creating quiz", error)
  }
};

export const getAllQuizzes = async () => {
  return await QuizRepository.getAllQuizzes();
}

export const getQuizById = async (id) => {
  return await QuizRepository.getQuizById(id);
}

export const deleteQuizById = async (id) => {
  return await QuizRepository.deleteQuiz(id);
}
