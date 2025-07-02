import { StatusCodes } from "http-status-codes";
import { getAvgAnswer, submitUserAnswer } from "../domain/user.service";
import { Request, Response } from "express";
import logger from "../../../config/logger";

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    await submitUserAnswer(req.body);
    res.sendStatus(StatusCodes.CREATED);
  } catch (error) {
    logger.error("Fail of submitAnswer:", error);
    res.send(error);
  }
};

export const getAvgAnswers = async (_req: Request, res: Response) => {
  try {
    const data = await getAvgAnswer();
    res.json(data);
  } catch (error) {
    logger.error("Fail of getAvgAnswers:", error);
    res.send(error);
  }
};
