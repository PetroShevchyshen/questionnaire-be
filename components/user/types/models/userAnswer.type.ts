import { Types } from "mongoose";

export interface IUserAnswer {
  quiz: Types.ObjectId;
  answers: [
    {
      questionId: Types.ObjectId;
      selectedAnswerId: Types.ObjectId;
    }
  ];
  score: number;
}
