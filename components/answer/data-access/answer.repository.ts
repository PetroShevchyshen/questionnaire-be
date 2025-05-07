import AnswerModel from "./models/answer.model";

export const createAnswers = async (answers, session) => {
  return AnswerModel.insertMany(answers, { session });
};
