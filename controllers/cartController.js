import User from "../models/userModel.js";
import ProductCateogry from "./productController.js";
import CustomErrorHandler from "../services/customErrorHandler.js";
import cartValidationSchema from "../validatiors/cartValidator.js";
import Cart from "../models/cartModel.js";

class CartProcuct {
    static async add_to_cart(req, res, next) {
      const {_id,role,user,items} = req.body;
      console.log(req.body);
      const { error } = cartValidationSchema.validate({user,items});
      if (error) return next(error);
      res.send("data");
    }
}
export default CartProcuct;
