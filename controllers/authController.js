import User from "../models/userModel.js"
import userValidator from "../validatiors/userValidator.js"
import errorHandler from "../middlewares/errorHandler.js";
import CustomErrorHandler from "../services/customErrorHandler.js";
import bcrypt from "bcrypt";
import { getToken } from "../services/jwtToken.js";
const JWT_SECRET = process.env.JWT_SECRET || "@get-user-password-hash-#123456";
class AuthController{
    static async login(req,res,next){
        return res.status(200).send({message:"register url colled"});
    }

    static async register(req,res,next){
        const {error} = userValidator.validate(req.body);
        if (error) return next(error);
        const userExits = await User.findOne({$or:[{email:req.body.email},{email:req.body.mobile_no}]})
        if (userExits){
            return next(CustomErrorHandler.alreadyExits("Email or Mobile no already exists"));
        }
        try{
            const password_hash = await bcrypt.hash(req.body.password, 10);
            req.body.password=password_hash;
            const user = new User(req.body);
            const response = await user.save();
            const payload = {_id:response._id,email:response.email,mobile_no:response.email,role:response.role};
            const token = await getToken(payload,JWT_SECRET);
            payload.token = token;
            return res.status(201).send({message:"User registered successfully",data:payload});
        }catch(err){
            return next(err);
        }
    }
}
export default AuthController