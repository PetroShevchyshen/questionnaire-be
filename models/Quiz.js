import { Schema, model } from "mongoose";

const quizSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  count: { type: Number, default: 0 }
}, { timestamps: true });

export default model("Quiz", quizSchema);