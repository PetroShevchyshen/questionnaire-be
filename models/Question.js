import { model, Schema } from "mongoose";

const questionSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
  text: { type: String, required: true },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }]
});

export default model("Question", questionSchema);