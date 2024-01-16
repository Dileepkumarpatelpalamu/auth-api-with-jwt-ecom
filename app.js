import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routers/authRouter.js';
import productRouter from './routers/productCategoryRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import connectiondb from './configs/dbconnection.js';
import { logger,errorOptions,loggerOptions } from './logger/logger.js';
import expresswinston from "express-winston"
import {join} from 'path';
const app = express();
dotenv.config();
const mongoURI = process.env.mongoURI || "mongodb://127.0.0.1:27017/express_authApi"
connectiondb(mongoURI);
const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";
const uploadsPath = join(process.cwd(), 'uploads');
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static(uploadsPath));
app.use(expresswinston.logger(loggerOptions));
app.use(expresswinston.errorLogger(errorOptions));
app.use('/api',authRouter);
app.use('/api',productRouter);
app.use(errorHandler);
export default app.listen(port,host,()=> console.log(`server is running on http://${host}:${port}`));