import express from "express";
import { quizValidation } from "../domain/quiz.validation";
import { create, getAll, getById, remove } from "./quiz.controller";

const router = express.Router();

router.post("/quiz", quizValidation, create);
router.get("/quiz", getAll);
router.get("/quiz/:id", getById);
router.delete("/quiz/:id", remove);

export default router;
