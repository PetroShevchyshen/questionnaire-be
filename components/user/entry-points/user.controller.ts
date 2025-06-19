import { StatusCodes } from "http-status-codes";
import { submitUserAnswer } from "../domain/user.service";
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
