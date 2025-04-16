import { createUserAnswer } from "../data-access/user.repository.js";
import { incrementQuizCount } from "../../quiz/data-access/quiz.repository.js";

export const submitUserAnswer = async (submitData) => {
  createUserAnswer(submitData);
  await incrementQuizCount(submitData.quiz);
}