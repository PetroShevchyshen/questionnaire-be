import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./config/logger";
import requestLogger from "./middleware/logger.middleware";

import userRoute from "./components/user/entry-points/user.route";
import quizRoute from "./components/quiz/entry-points/quiz.route";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);

const url = process.env.MONGO_URL;
url
  ? mongoose.connect(url).then(() => {
      logger.info("db connected");
    })
  : null;

app.use("/api", userRoute);
app.use("/api", quizRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
