import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import {
  getAllQuizzes,
  deleteQuizById,
  createQuizWithQuestions,
  getQuizById,
} from "../domain/quiz.services";

export const create = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json(error.array());
      return;
    }
    const quiz = await createQuizWithQuestions(req.body);
    res.status(StatusCodes.CREATED).json(quiz);
  } catch (error) {
    console.log(error);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skipItems = (page - 1) * limit;
  try {
    const [quizzes, quizzesCount] = await getAllQuizzes(skipItems, limit);
    res.status(StatusCodes.OK).json({ quizzes, quizzesCount });
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

    const quiz = await getQuizById(id);

    if (!quiz) {
      res.sendStatus(StatusCodes.NOT_FOUND);
      return;
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

    const deletedQuiz = await deleteQuizById(id);

    if (!deletedQuiz) {
      res.sendStatus(StatusCodes.NOT_FOUND);
      return;
    }

    res.status(StatusCodes.OK).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Can’t delete quiz" });
  }
};
