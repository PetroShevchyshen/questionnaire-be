import { StatusCodes } from "http-status-codes";
import { submitUserAnswer } from "../domain/user.service.js";


export const submitAnswer = async (req, res) => {
  try {
    await submitUserAnswer(req.body)
    res.json({ status: StatusCodes.CREATED });
  } catch (error) {
    console.log(error)
  }
}