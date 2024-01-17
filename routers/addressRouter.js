import { Router } from "express";
import UserAddress from "../controllers/addressController.js";
import auth from "../middlewares/authHandler.js";
const addressRouter = Router();
addressRouter.post('/addaddress',auth,UserAddress.add_address);
addressRouter.put('/updateaddress',auth,UserAddress.update_address);
addressRouter.delete('/deleteaddress',auth,UserAddress.delete_address);
addressRouter.get('/getaddress/:user?',auth,UserAddress.get_address);
export default addressRouter;