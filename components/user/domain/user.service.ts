import logger from "../../../config/logger";
import { incrementQuizCount } from "../../quiz/data-access/quiz.repository";
import { AvgAnswers, createUserAnswer } from "../data-access/user.repository";
import { IUserAnswer } from "../types/models/userAnswer.type";

export const submitUserAnswer = async (
  submitData: IUserAnswer
): Promise<void> => {
  try {
    await createUserAnswer(submitData);
    await incrementQuizCount(submitData.quiz.toString());
  } catch (error) {
    logger.error("Fail of submitUserAnswer", error);
    throw error;
  }
};

export const getAvgAnswer = () => {
  try {
    return AvgAnswers();
  } catch (error) {
    logger.error("Fail of getAvgAnswers", error);
    throw error;
  }
};
