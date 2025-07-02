import express from "express";
import { getAvgAnswers, submitAnswer } from "./user.controller";

const router = express.Router();

router.post("/answer", submitAnswer);
router.get("/avgAnswers", getAvgAnswers);

export default router;
