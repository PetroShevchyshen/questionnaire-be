import { HydratedDocument } from "mongoose";
import { IUserAnswer } from "../types/models/userAnswer.type";
import UserAnswerModel from "./models/userAnswer.model";

export const createUserAnswer = async (
  submitData: IUserAnswer
): Promise<HydratedDocument<IUserAnswer>> => {
  return new UserAnswerModel(submitData).save();
};
