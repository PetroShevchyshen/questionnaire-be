import { incrementQuizCount } from "../../quiz/data-access/quiz.repository";
import { createUserAnswer } from "../data-access/user.repository";

export const submitUserAnswer = async (submitData: any) => {
  await createUserAnswer(submitData);
  await incrementQuizCount(submitData.quiz);
};
