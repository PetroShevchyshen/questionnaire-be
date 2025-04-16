import answerModel from "./models/answer.model.js";

export const createAnswers = async (answers, session) => {
  return await answerModel.insertMany(answers, { session });
};