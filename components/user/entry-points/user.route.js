import express from "express"
import { submitAnswer } from "./user.controller.js";

const router = express.Router();

router.post("/answer", submitAnswer);

export default router;