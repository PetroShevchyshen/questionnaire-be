import { model, Schema } from "mongoose";
import { IQuestion } from "../../types/models/question.type";

const questionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer", require: false }],
});

export default model<IQuestion>("Question", questionSchema);
