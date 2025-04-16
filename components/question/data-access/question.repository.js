import questionModel from "./models/question.model.js";

export const createQuestion = async (questionData, session) => {
  const question = new questionModel(questionData);
  return await question.save({ session });
};

export const updateQuestionAnswers = async (questionId, answerIds, session) => {
  return await questionModel.findByIdAndUpdate(questionId, { answers: answerIds }, { new: true, session });
};