import { veryToken } from "../services/jwtToken.js";
import CustomErrorHandler from "../services/customErrorHandler.js";
const JWT_SECRET = process.env.JWT_SECRET || "@get-user-password-hash-#123456";
import redisConnection from "../configs/redisConnection.js";
const auth = async(req,res,next)=>{
    try{
        let authHeader = req.headers.authorization
        const authHeaderArr = authHeader.split(' ');
        const userStatus = await veryToken(authHeaderArr[1],JWT_SECRET);
        const isValidUser  = await redisConnection.get(`USERID-${userStatus._id}`);
        if(isValidUser){
            req.body._id = userStatus._id;
            req.body.role = userStatus.role;
            req.body.email = userStatus.email;
            req.body.mobile_no = userStatus.mobile_no;
            next()
        }
        else{
            return next(CustomErrorHandler.invalidToken());
        }
    }catch(err){
        console.log(err);
        return next(CustomErrorHandler.invalidToken());
    }
}
export default auth;