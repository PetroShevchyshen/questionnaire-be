import { ClientSession, Types } from "mongoose";
import QuestionModel from "./models/question.model";
import { IQuestion } from "../types/models/question.type";
import logger from "../../../config/logger";

export const createQuestion = async (
  questionData: IQuestion,
  session: ClientSession
) => {
  return new QuestionModel(questionData).save({ session });
};

export const updateQuestionAnswers = async (
  questionId: Types.ObjectId,
  answerIds: Types.ObjectId[],
  session: ClientSession
) => {
  return QuestionModel.findByIdAndUpdate(
    questionId,
    { answers: answerIds },
    { new: true, session }
  )
    .lean()
    .exec()
    .catch((error) => {
      logger.error("Repository error in updateQuestionAnswers:", error);
      throw error;
    });
};
