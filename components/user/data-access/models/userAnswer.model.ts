import { model, Schema } from "mongoose";
import { IUserAnswer } from "../../types/models/userAnswer.type";

const userAnswer = new Schema<IUserAnswer>(
  {
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    answers: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        selectedAnswerId: {
          type: Schema.Types.ObjectId,
          ref: "Answer",
          required: true,
        },
      },
    ],
    score: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<IUserAnswer>("UserAnswer", userAnswer);
