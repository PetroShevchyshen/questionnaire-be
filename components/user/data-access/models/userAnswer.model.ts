import { model, Schema } from "mongoose";

const userAnswer = new Schema(
  {
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    answers: [
      {
        questionID: {
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
  },
  { timestamps: true }
);

export default model("UserAnswer", userAnswer);
