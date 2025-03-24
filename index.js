import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

import { quizValidation } from "./validations/quiz.js"

import * as QuizController from "./controllers/QuizController.js"
import * as UserController from "./controllers/UserController.js"

dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())

const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("db ok")
})

app.post("/quiz", quizValidation, QuizController.createQuiz);
app.get("/quiz", QuizController.getAll);
app.get("/quiz/:id", QuizController.getById);
app.delete("/quiz/:id", QuizController.remove);

app.post("/answer", UserController.submitAnswer);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})