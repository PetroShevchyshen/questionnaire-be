import UserAnswerModel from "./models/userAnswer.model.js";

export const createUserAnswer = async (submitData) => {
  try {
    const answer = new UserAnswerModel(submitData);
    await answer.save();
  } catch (error) {
    console.log("Fail of creating user answer", error)
    throw error;
  }
}