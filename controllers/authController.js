import User from "../models/userModel.js"
import {registerUserValidator,loginUserValidator} from "../validatiors/userValidator.js"
import CustomErrorHandler from "../services/customErrorHandler.js";
import bcrypt from "bcrypt";
import { getToken, veryToken} from "../services/jwtToken.js";
const JWT_SECRET = process.env.JWT_SECRET || "@get-user-password-hash-#123456";
const JWT_REFRESHSECRET = process.env.JWT_REFRESHSECRET || "@post-password-hash-#79421636";
class AuthController{
    static async login(req,res,next){
        const {error} = loginUserValidator.validate(req.body);
        if (error) return next(error);
        try{
            const userExits = await User.findOne({email:req.body.email});
            if(!userExits) return next(CustomErrorHandler.userNotExits());
            const password_matched = await bcrypt.compare(req.body.password,userExits.password);
            if (!password_matched) return next(CustomErrorHandler.incorrectPassword());
            const payload = {_id:userExits._id,email:userExits.email,mobile_no:userExits.mobile_no,role:userExits.role};
            const accesstoken = await getToken(payload,JWT_SECRET);
            const refreshtoken = await getToken(payload,JWT_REFRESHSECRET);
            payload.accesstoken = accesstoken;
            payload.refreshtoken = refreshtoken;
            return res.status(200).send({message:"User loggedin successfully",data:payload});
        }catch(err){
            return next(err);
        }
    }

    static async register(req,res,next){
        const {error} = registerUserValidator.validate(req.body);
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
            const payload = {_id:response._id,email:response.email,mobile_no:response.mobile_no,role:response.role};
            const accesstoken = await getToken(payload,JWT_SECRET);
            const refreshtoken = await getToken(payload,JWT_REFRESHSECRET);
            payload.accesstoken = accesstoken;
            payload.refreshtoken = refreshtoken;
            return res.status(201).send({message:"User registered successfully",data:payload});
        }catch(err){
            return next(err);
        }
    }
    static async get_user_details(req,res,next){
        const _id = req.body._id;
        try{
            const userDetails = await User.findOne({_id:_id}).select('_id firstName lastName email mobile_no role status createdAt');
            return res.status(200).send({message:"User details",data:userDetails});
        }catch(err){
            return next(CustomErrorHandler.invalidToken());
        }
    }
    static async refresh_token(req,res,next){
        const {refreshtoken} =  req.body;
        if(refreshtoken){
            try{
                const refreshStatus = await veryToken(refreshtoken,JWT_REFRESHSECRET);
                const payload ={_id:refreshStatus._id,email:refreshStatus.email,mobile_no:refreshStatus.email,role:refreshStatus.role};
                const accesstoken = await getToken(payload,JWT_SECRET);
                return res.status(200).send({accesstoken}).json();
            }catch(err){
                return next(CustomErrorHandler.missingRefreshToken());
            }
        }
        else{
            return next(CustomErrorHandler.missingRefreshToken());
        }
    }
    static async users_list(req,res,next){
        const {_id,role} = req.body;
        try{
            if (_id !== undefined && role === "admin"){
                const userDetails = await User.find().select('_id firstName lastName email mobile_no role status createdAt');
                return res.status(200).send({message:"Users details",data:userDetails});
            }else{
                return next(CustomErrorHandler.onlyAdminAllowed());
            }
        }catch(err){
            return next(CustomErrorHandler.invalidToken());
        }
    }
}
export default AuthController