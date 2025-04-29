import answerModel from "./models/answer.model.js";

export const createAnswers = async (answers, session) => {
  return answerModel.insertMany(answers, { session });
};