import * as QuizRepository from "../data-access/quiz.repository";
import {
  createQuiz,
  updateQuizQuestions,
} from "../data-access/quiz.repository";
import {
  createQuestion,
  updateQuestionAnswers,
} from "../../question/data-access/question.repository";
import { createAnswers } from "../../answer/data-access/answer.repository";
import mongoose, { Types } from "mongoose";
import { IQuestion } from "../../question/types/models/question.type";

export const createQuizWithQuestions = async ({
  title,
  description,
  questions,
}: {
  title: string;
  description: string;
  questions: IQuestion[];
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const quiz = await createQuiz(
      { title, description, questions: [] },
      session
    );
    const questionIds = [];

    for (const q of questions) {
      const question = await createQuestion(
        { quiz: quiz._id, text: q.text, answers: q.answers },
        session
      );
      questionIds.push(question._id);

      const answerDocs = q.answers.map((a) => ({
        question: question._id,
        text: a.text,
        isCorrect: a.isCorrect,
      }));

      const savedAnswers = await createAnswers(answerDocs, session);
      const answerIds = savedAnswers.map((a) => a._id);

      await updateQuestionAnswers(question._id, answerIds, session);
    }

    const updatedQuiz = await updateQuizQuestions(
      { quizId: quiz._id, questionIds: questionIds },
      session
    );

    await session.commitTransaction();
    session.endSession();

    return updatedQuiz;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log("Fail of creating quiz", error);
  }
};

export const getAllQuizzes = async () => {
  return await QuizRepository.getAllQuizzes();
};

export const getQuizById = async (id: Types.ObjectId) => {
  return await QuizRepository.getQuizById(id);
};

export const deleteQuizById = async (id: Types.ObjectId) => {
  return await QuizRepository.deleteQuiz(id);
};
