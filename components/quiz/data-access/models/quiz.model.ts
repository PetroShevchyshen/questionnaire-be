import { Schema, model } from "mongoose";
import { IQuiz } from "../../types/models/quiz.type";

const quizSchema = new Schema<IQuiz>(
  {
    title: { type: String, required: true },
    description: String,
    questions: [
      { type: Schema.Types.ObjectId, ref: "Question", require: false },
    ],
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<IQuiz>("Quiz", quizSchema);
