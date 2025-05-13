import { ClientSession } from "mongoose";
import { IAnswer } from "../types/models/answer.type";
import AnswerModel from "./models/answer.model";

export const createAnswers = async (
  answers: IAnswer[],
  session: ClientSession
) => {
  return AnswerModel.insertMany(answers, { session });
};
