import { Types } from "mongoose";

export interface IQuiz {
  title: string;
  description?: string;
  questions: Types.ObjectId[];
  count?: number;
}
