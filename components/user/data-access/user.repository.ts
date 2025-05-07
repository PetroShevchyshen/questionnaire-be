import UserAnswerModel from "./models/userAnswer.model";

export const createUserAnswer = async (submitData: any) => {
  try {
    const answer = new UserAnswerModel(submitData);
    await answer.save();
  } catch (error) {
    console.log("Fail of creating user answer", error);
    throw error;
  }
};
