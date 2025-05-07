import { body } from "express-validator";

export const quizValidation = [
  body("title").isString().notEmpty(),
  body("description").optional().isString(),
  body("questions").isArray({ min: 1 }).withMessage("At least one question is required"),
  body("questions.*.text").isString().notEmpty(),
  body("questions.*.answers").isArray({ min: 1 }).withMessage("Each question must have at least one answer"),
  body("questions.*.answers.*.text").isString().notEmpty(),
  body("questions.*.answers.*.isCorrect").isBoolean().withMessage("Each answer must have a boolean isCorrect field")
];
