import { Types } from "mongoose";
import { IAnswer } from "../../../answer/types/models/answer.type";

export interface IQuestion {
  quiz: Types.ObjectId;
  text: string;
  answers: IAnswer[];
}
