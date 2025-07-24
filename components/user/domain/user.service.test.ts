import * as userRepository from "../data-access/user.repository";
import * as quizRepository from "../../quiz/data-access/quiz.repository";
import logger from "../../../config/logger";
import { submitUserAnswer, getAvgUsersAnswer } from "./user.service";
import { IUserAnswer } from "../types/models/userAnswer.type";
import { Types } from "mongoose";

jest.mock("../data-access/user.repository");
jest.mock("../../quiz/data-access/quiz.repository");
jest.mock("../../../config/logger");

const quizId = new Types.ObjectId("123456789012345678901234");
const questionId = new Types.ObjectId("123456789012342678901234");
const selectedAnswerId = new Types.ObjectId("123456783012345678901234");

describe("user.service", () => {
  const mockUserAnswer: IUserAnswer = {
    quiz: quizId,
    answers: [
      {
        questionId: questionId,
        selectedAnswerId: selectedAnswerId,
      },
    ],
    score: 10,
    timeSpent: 120,
  } as IUserAnswer;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("submitUserAnswer", () => {
    it("should call createUserAnswer and incrementQuizCount", async () => {
      (userRepository.createUserAnswer as jest.Mock).mockResolvedValue(
        undefined
      );
      (quizRepository.incrementQuizCount as jest.Mock).mockResolvedValue(
        undefined
      );

      await submitUserAnswer(mockUserAnswer);

      expect(userRepository.createUserAnswer).toHaveBeenCalledWith(
        mockUserAnswer
      );
      expect(quizRepository.incrementQuizCount).toHaveBeenCalledWith(
        quizId.toString()
      );
    });

    it("should log and throw error on failure", async () => {
      const error = new Error("fail");
      (userRepository.createUserAnswer as jest.Mock).mockRejectedValue(error);

      await expect(submitUserAnswer(mockUserAnswer)).rejects.toThrow(error);
      expect(logger.error).toHaveBeenCalledWith(
        "Fail of submitUserAnswer",
        error
      );
    });
  });

  describe("getAvgUsersAnswer", () => {
    it("should return getAvgAnswer result", () => {
      (userRepository.getAvgAnswer as jest.Mock).mockReturnValue(42);
      const result = getAvgUsersAnswer();
      expect(result).toBe(42);
    });

    it("should log and throw error on failure", () => {
      const error = new Error("fail");
      (userRepository.getAvgAnswer as jest.Mock).mockImplementation(() => {
        throw error;
      });
      expect(() => getAvgUsersAnswer()).toThrow(error);
      expect(logger.error).toHaveBeenCalledWith("Fail of getAvgAnswers", error);
    });
  });
});
