import QuestionModel from "./models/question.model.js";

export const createQuestion = async (questionData, session) => {
  const question = new QuestionModel(questionData);
  return question.save({ session });
};

export const updateQuestionAnswers = async (questionId, answerIds, session) => {
  return QuestionModel.findByIdAndUpdate(questionId, { answers: answerIds }, { new: true, session });
};