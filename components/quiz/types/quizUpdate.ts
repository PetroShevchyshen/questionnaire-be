import { Types } from "mongoose";

export interface quizUpdateData {
  quizId: Types.ObjectId;
  questionIds: Types.ObjectId[];
}
