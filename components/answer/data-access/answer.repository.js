import AnswerModel from "./models/answer.model.js";

export const createAnswers = async (answers, session) => {
  return AnswerModel.insertMany(answers, { session });
};