import { validationResult } from "express-validator";
import {
  getAllQuizzes,
  deleteQuizById,
  createQuizWithQuestions,
  getQuizById,
} from "../domain/quiz.services";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { Types } from "mongoose";

export const create = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json(error.array());
    }
    const quiz = await createQuizWithQuestions(req.body);
    res.status(StatusCodes.CREATED).json(quiz);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Quiz create error",
    });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const quizzes = await getAllQuizzes();
    res.status(StatusCodes.OK).json(quizzes);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Get all quizzes error",
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await getQuizById(new Types.ObjectId(id));

    if (!quiz) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Quiz not found" });
    }

    res.status(StatusCodes.OK).json(quiz);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Quiz getById error" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedQuiz = await deleteQuizById(new Types.ObjectId(id));

    if (!deletedQuiz) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Can’t delete quiz" });
  }
};
