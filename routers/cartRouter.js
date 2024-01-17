import { Router } from "express";
import CartProcuct from "../controllers/cartController.js";
import auth from "../middlewares/authHandler.js";
const cartRouter = Router();
cartRouter.post('/addtocart',auth,CartProcuct.add_to_cart);
// cartRouter.put('/updateaddress',auth,CartProcuct.update_address);
// cartRouter.delete('/deleteaddress',auth,CartProcuct.delete_address);
// cartRouter.get('/getaddress/:user?',auth,CartProcuct.get_address);
export default cartRouter;