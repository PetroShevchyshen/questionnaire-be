import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  req.params
    ? logger.info(`${req.method} ${req.originalUrl} ${req.params}`)
    : logger.info(`${req.method} ${req.originalUrl} ${req.body}`);
  next();
};
export default requestLogger;
