import { ClientSession, isValidObjectId } from "mongoose";
import logger from "../../../config/logger";
import QuizModel from "./models/quiz.model";
import { IQuiz } from "../types/models/quiz.type";
import { quizUpdateData } from "../types/quizUpdate";
import { QuizSortOrder } from "../types/quizSort.enum";

export const createQuiz = async (quizData: IQuiz, session: ClientSession) => {
  return new QuizModel(quizData).save({ session });
};

export const updateQuizQuestions = async (
  quizData: quizUpdateData,
  session: ClientSession
) => {
  checkIsIdIsValid(quizData.quizId);
  quizData.questionIds.map((questionId) => checkIsIdIsValid(questionId));

  return QuizModel.findByIdAndUpdate(
    quizData.quizId,
    { questions: quizData.questionIds },
    { new: true, session }
  )
    .lean()
    .exec()
    .catch((error) => {
      logger.error("Repository error in updateQuizQuestions:", error);
      throw error;
    });
};

export const getAllQuizzes = async (
  skipItems: number,
  limit: number,
  sortField: string,
  sortOrderValue: QuizSortOrder
) => {
  return Promise.all([
    QuizModel.find()
      .populate({
        path: "questions",
        populate: { path: "answers" },
      })
      .sort({ [sortField]: sortOrderValue })
      .skip(skipItems)
      .limit(limit)
      .lean()
      .exec()
      .catch((error) => {
        logger.error("Repository error in getAllQuizzes:", error);
        throw error;
      }),
    QuizModel.countDocuments(),
  ]);
};

export const getQuizById = async (id: string) => {
  checkIsIdIsValid(id);
  return QuizModel.findById(id)
    .populate({
      path: "questions",
      populate: { path: "answers" },
    })
    .lean()
    .exec()
    .catch((error) => {
      logger.error("Repository error in getQuizById:", error);
      throw error;
    });
};

export const deleteQuiz = async (id: string) => {
  checkIsIdIsValid(id);
  return QuizModel.findOneAndDelete({ _id: id })
    .lean()
    .exec()
    .catch((error) => {
      logger.error("Repository error in deleteQuiz:", error);
      throw error;
    });
};

export const incrementQuizCount = async (id: string) => {
  checkIsIdIsValid(id);
  return QuizModel.findByIdAndUpdate(id, { $inc: { count: 1 } })
    .lean()
    .exec()
    .catch((error) => {
      logger.error("Repository error in incrementQuizCount:", error);
      throw error;
    });
};

function checkIsIdIsValid(id: string): void {
  const isValidId = isValidObjectId(id);
  if (!isValidId) throw new Error("Invalid Id");
}
