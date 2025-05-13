import { ClientSession, Types } from "mongoose";
import QuizModel from "./models/quiz.model";
import { IQuiz } from "../types/models/quiz.type";
import { quizUpdateData } from "../types/quizUpdate";

export const createQuiz = async (quizData: IQuiz, session: ClientSession) => {
  return new QuizModel(quizData).save({ session });
};

export const updateQuizQuestions = async (
  quizData: quizUpdateData,
  session: ClientSession
) => {
  return QuizModel.findByIdAndUpdate(
    quizData.quizId,
    { questions: quizData.questionIds },
    { new: true, session }
  )
    .lean()
    .exec()
    .catch((error) => {
      console.error("Repository error in updateQuizQuestions:", error);
      throw error;
    });
};

export const getAllQuizzes = async () => {
  return QuizModel.find()
    .populate({
      path: "questions",
      populate: { path: "answers" },
    })
    .lean()
    .exec()
    .catch((error) => {
      console.error("Repository error in getAllQuizzes:", error);
      throw error;
    });
};

export const getQuizById = async (id: Types.ObjectId) => {
  return QuizModel.findById(id)
    .populate({
      path: "questions",
      populate: { path: "answers" },
    })
    .lean()
    .exec()
    .catch((error) => {
      console.error("Repository error in getQuizById:", error);
      throw error;
    });
};

export const deleteQuiz = async (id: Types.ObjectId) => {
  return QuizModel.findOneAndDelete({ _id: id })
    .lean()
    .exec()
    .catch((error) => {
      console.error("Repository error in deleteQuiz:", error);
      throw error;
    });
};

export const incrementQuizCount = async (id: Types.ObjectId) => {
  return QuizModel.findByIdAndUpdate(id, { $inc: { count: 1 } })
    .lean()
    .exec()
    .catch((error) => {
      console.error("Repository error in incrementQuizCount:", error);
      throw error;
    });
};
