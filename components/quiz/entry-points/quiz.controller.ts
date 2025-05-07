import { validationResult } from "express-validator";
import {
  getAllQuizzes,
  deleteQuizById,
  createQuizWithQuestions,
} from "../domain/quiz.services";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json(error.array());
    }
    const quiz = await createQuizWithQuestions(req.body);
    res.status(StatusCodes.CREATED).json(quiz);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "quiz error",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const quizzes = await getAllQuizzes();
    res.status(StatusCodes.OK).json(quizzes);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "get all quizzes error",
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await deleteQuizById(id);

    if (!quiz) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Quiz not found" });
    }

    res.status(StatusCodes.OK).json(quiz);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedQuiz = await deleteQuizById(id);

    if (!deletedQuiz) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Can’t delete quiz" });
  }
};
