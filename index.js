import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import userRoute from "./components/user/entry-points/user.route.js"
import quizRoute from "./components/quiz/entry-points/quiz.rout.js"

dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())

const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("db ok")
})

app.use('/api/user', userRoute);
app.use('/api/quiz', quizRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})