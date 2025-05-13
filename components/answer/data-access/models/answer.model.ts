import { model, Schema } from "mongoose";
import { IAnswer } from "../../types/models/answer.type";

const answerSchema = new Schema<IAnswer>({
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

export default model<IAnswer>("Answer", answerSchema);
