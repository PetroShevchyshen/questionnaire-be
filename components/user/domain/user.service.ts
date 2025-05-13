import { incrementQuizCount } from "../../quiz/data-access/quiz.repository";
import { createUserAnswer } from "../data-access/user.repository";
import { IUserAnswer } from "../types/models/userAnswer.type";

export const submitUserAnswer = async (
  submitData: IUserAnswer
): Promise<void> => {
  try {
    await createUserAnswer(submitData);
    await incrementQuizCount(submitData.quiz);
  } catch (error) {
    console.log("Fail of submitUserAnswer", error);
  }
};
