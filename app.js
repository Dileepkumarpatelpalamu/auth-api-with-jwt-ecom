import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRouter from './routers/authRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import connectiondb from './configs/dbconnection.js';
const app = express();
dotenv.config();
const mongoURI = process.env.mongoURI || "mongodb://127.0.0.1:27017/express_authApi"
connectiondb(mongoURI);
const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";
app.use(helmet());
app.use(express.json());
app.use('/api',authRouter);
app.use(errorHandler);
export default app.listen(port,host,()=> console.log(`server is running on http://${host}:${port}`));