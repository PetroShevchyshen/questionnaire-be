import { StatusCodes } from "http-status-codes";
import { submitUserAnswer } from "../domain/user.service";
import { Request, Response } from "express";

export const submitAnswer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await submitUserAnswer(req.body);
    res.status(StatusCodes.CREATED);
  } catch (error) {
    console.log(error);
  }
};
