import { Types } from "mongoose";

export interface IAnswer {
  question: Types.ObjectId;
  text: string;
  isCorrect: boolean;
}
