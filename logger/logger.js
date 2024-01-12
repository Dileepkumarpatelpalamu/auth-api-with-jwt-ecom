import winston from "winston";
import dotenv from 'dotenv';
dotenv.config();
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${process.env.LOG_PATH}error.log`, level: "error" }),
    new winston.transports.File({ filename: `${process.env.LOG_PATH}combinedlog.log` }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});
const loggerOptions = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${process.env.LOG_PATH}http.log`}),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  meta: false,
  expressFormat: true,
};
const errorOptions = {
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: `${process.env.LOG_PATH}error.log` }),
    ],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }
export { logger,loggerOptions,errorOptions };
