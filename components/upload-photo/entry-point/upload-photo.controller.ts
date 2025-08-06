import { Request, Response } from "express";
import { uploadToS3 } from "../domain/s3.service";
import { StatusCodes } from "http-status-codes";
import logger from "../../../config/logger";

export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      logger.error("Missing fields");
      return;
    }
    const photoUrl = await uploadToS3(
      file.buffer,
      process.env.AWS_BUCKET_NAME!,
      file.originalname,
      file.mimetype
    );

    res.json(photoUrl);
  } catch (error) {
    logger.error(error);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
