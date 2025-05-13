import { model, Schema } from "mongoose";
import { IQuestion } from "../../types/models/question.type";

const questionSchema = new Schema<IQuestion>({
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
  text: { type: String, required: true },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
});

export default model<IQuestion>("Question", questionSchema);
