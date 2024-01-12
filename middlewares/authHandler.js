import { veryToken } from "../services/jwtToken.js";
import CustomErrorHandler from "../services/customErrorHandler.js";
const JWT_SECRET = process.env.JWT_SECRET || "@get-user-password-hash-#123456";
const auth = async(req,res,next)=>{
    let authHeader = req.headers.authorization
    const authHeaderArr = authHeader.split(' ');
    try{
        const userStatus = await veryToken(authHeaderArr[1],JWT_SECRET);
        req.body._id = userStatus._id;
        req.body.role = userStatus.role;
        req.body.email = userStatus.email;
        req.body.mobile_no = userStatus.mobile_no;
        next()
    }catch(err){
        return next(CustomErrorHandler.invalidToken());
    }
}
export default auth;