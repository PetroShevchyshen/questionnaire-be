import mongoose, { Types } from "mongoose";
import logger from "../../../config/logger";
import * as QuizRepository from "../data-access/quiz.repository";
import {
  createQuizWithQuestions,
  getAllQuizzes,
  getQuizById,
  deleteQuizById,
} from "./quiz.services";
import {
  createQuestion,
  updateQuestionAnswers,
} from "../../question/data-access/question.repository";
import { createAnswers } from "../../answer/data-access/answer.repository";
import { QuizSortOrder } from "../types/quizSort.enum";

jest.spyOn(mongoose, "startSession").mockImplementation(jest.fn());
jest.mock("../../../config/logger");
jest.mock("../data-access/quiz.repository");
jest.mock("../../question/data-access/question.repository");
jest.mock("../../answer/data-access/answer.repository");

describe("quiz.services", () => {
  // Create unique IDs before using in tests
  const quizId = new Types.ObjectId("123456789012345678901234");
  const questionId = new Types.ObjectId("223456789012345678901234");
  const answerId1 = new Types.ObjectId("323456789012345678901234");
  const answerId2 = new Types.ObjectId("423456789012345678901234");

  const mockSession = {
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    abortTransaction: jest.fn(),
    endSession: jest.fn(),
  };

  beforeEach(() => {
    (mongoose.startSession as jest.Mock).mockResolvedValue(mockSession);
    jest.clearAllMocks();
  });

  describe("createQuizWithQuestions", () => {
    it("should create quiz with questions and answers", async () => {
      (createQuestion as jest.Mock).mockResolvedValue({ _id: questionId });
      (createAnswers as jest.Mock).mockResolvedValue([
        { _id: answerId1 },
        { _id: answerId2 },
      ]);
      (updateQuestionAnswers as jest.Mock).mockResolvedValue(undefined);
      (QuizRepository.createQuiz as jest.Mock).mockResolvedValue({
        _id: quizId,
      });

      const input = {
        title: "Sample Quiz",
        description: "A test quiz",
        questions: [
          {
            text: "Q1",
            answers: [
              { text: "A1", isCorrect: true },
              { text: "A2", isCorrect: false },
            ],
          },
        ],
      };

      const result = await createQuizWithQuestions(input);

      expect(mongoose.startSession).toHaveBeenCalled();
      expect(mockSession.startTransaction).toHaveBeenCalled();
      expect(createQuestion).toHaveBeenCalledWith({ text: "Q1" }, mockSession);
      expect(createAnswers).toHaveBeenCalledWith(
        [
          { question: questionId, text: "A1", isCorrect: true },
          { question: questionId, text: "A2", isCorrect: false },
        ],
        mockSession
      );
      expect(updateQuestionAnswers).toHaveBeenCalledWith(
        questionId,
        [answerId1, answerId2],
        mockSession
      );
      expect(QuizRepository.createQuiz).toHaveBeenCalledWith(
        {
          title: input.title,
          description: input.description,
          questions: [questionId],
        },
        mockSession
      );
      expect(mockSession.commitTransaction).toHaveBeenCalled();
      expect(mockSession.endSession).toHaveBeenCalled();
      expect(result).toEqual({ _id: quizId });
    });

    it("should abort transaction and log error on failure", async () => {
      (createQuestion as jest.Mock).mockImplementation(() => {
        throw new Error("fail");
      });

      const input = {
        title: "Sample Quiz",
        description: "A test quiz",
        questions: [
          {
            text: "Q1",
            answers: [{ text: "A1", isCorrect: true }],
          },
        ],
      };

      await expect(createQuizWithQuestions(input)).rejects.toThrow("fail");
      expect(mockSession.commitTransaction);
      expect(logger.error).toHaveBeenCalledWith(
        "Fail of creating quiz",
        expect.any(Error)
      );
    });
  });

  describe("getAllQuizzes", () => {
    it("should call QuizRepository.getAllQuizzes with correct params", async () => {
      (QuizRepository.getAllQuizzes as jest.Mock).mockResolvedValue([
        "quiz1",
        "quiz2",
      ]);
      const result = await getAllQuizzes(0, 10, "title", QuizSortOrder.Asc);
      expect(QuizRepository.getAllQuizzes).toHaveBeenCalledWith(
        0,
        10,
        "title",
        QuizSortOrder.Asc
      );
      expect(result).toEqual(["quiz1", "quiz2"]);
    });
  });

  describe("getQuizById", () => {
    it("should call QuizRepository.getQuizById with correct id", async () => {
      (QuizRepository.getQuizById as jest.Mock).mockResolvedValue({
        _id: quizId,
      });
      const result = await getQuizById(quizId.toString());
      expect(QuizRepository.getQuizById).toHaveBeenCalledWith(
        quizId.toString()
      );
      expect(result).toEqual({ _id: quizId });
    });
  });

  describe("deleteQuizById", () => {
    it("should call QuizRepository.deleteQuiz with correct id", async () => {
      (QuizRepository.deleteQuiz as jest.Mock).mockResolvedValue({
        deleted: true,
      });
      const result = await deleteQuizById(quizId.toString());
      expect(QuizRepository.deleteQuiz).toHaveBeenCalledWith(quizId.toString());
      expect(result).toEqual({ deleted: true });
    });
  });
});
