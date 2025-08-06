import express from "express";
import multer from "multer";
import { uploadPhoto } from "./upload-photo.controller";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), uploadPhoto);

export default router;
