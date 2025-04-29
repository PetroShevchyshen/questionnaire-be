import UserAnswerModel from "./models/userAnswer.model.js";

export const createUserAnswer = async () => {
  try {
    const answer = new UserAnswerModel(req.body);
    await answer.save();
  } catch (error) {
    console.log("Fail of creating user answer", error)
  }
}