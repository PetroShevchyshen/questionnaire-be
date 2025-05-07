import { model, Schema } from "mongoose";

const answerSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

export default model("Answer", answerSchema);
