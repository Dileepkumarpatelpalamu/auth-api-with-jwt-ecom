import { Router } from "express";
import AuthController from "../controllers/authController.js";
import auth from "../middlewares/authHandler.js";
const authRouter = Router();
authRouter.post('/register',AuthController.register);
authRouter.post('/login',AuthController.login);
authRouter.post('/refreshtoken',AuthController.refresh_token);
authRouter.post('/userdetails',auth,AuthController.get_user_details);
authRouter.post('/userslist',auth,AuthController.users_list);
authRouter.put('/userupdate',auth,AuthController.update_user_details);
authRouter.delete('/userdelete/:ID?',auth,AuthController.delete_user_details);
authRouter.post('/logoutuser',auth,AuthController.logout_users);
export default authRouter;