import mongoose from "mongoose";
import logger from "../../../config/logger";
import * as QuizRepository from "../data-access/quiz.repository";
import { createQuiz } from "../data-access/quiz.repository";
import {
  createQuestion,
  updateQuestionAnswers,
} from "../../question/data-access/question.repository";
import { createAnswers } from "../../answer/data-access/answer.repository";
import { IQuestionRequest } from "../../question/types/request/question.type";
import { QuizSortOrder } from "../types/quizSort.enum";

export const createQuizWithQuestions = async ({
  title,
  description,
  questions,
}: {
  title: string;
  description: string;
  questions: IQuestionRequest[];
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const questionIds = [];

    for (const q of questions) {
      const question = await createQuestion({ text: q.text }, session);
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
    const quiz = await createQuiz(
      { title, description, questions: questionIds },
      session
    );

    await session.commitTransaction();
    session.endSession();

    return quiz;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    logger.error("Fail of creating quiz", error);
    throw error;
  }
};

export const getAllQuizzes = async (
  skipItems: number,
  limit: number,
  sortField: string,
  sortOrderValue: QuizSortOrder
) => {
  return QuizRepository.getAllQuizzes(
    skipItems,
    limit,
    sortField,
    sortOrderValue
  );
};

export const getQuizById = async (id: string) => {
  return QuizRepository.getQuizById(id);
};

export const deleteQuizById = async (id: string) => {
  return QuizRepository.deleteQuiz(id);
};
