import { Router } from "express";
import AuthController from "../controllers/authController.js";
import auth from "../middlewares/authHandler.js";
const authRouter = Router();
authRouter.post('/register',AuthController.register);
authRouter.post('/login',AuthController.login);
authRouter.post('/userdetails',auth,AuthController.get_user_details);
export default authRouter;