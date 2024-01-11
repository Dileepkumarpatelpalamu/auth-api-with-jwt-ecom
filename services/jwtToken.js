import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "@get-user-password-hash-#123456";
const getToken = async(data,JWT_SECRET=JWT_SECRET)=>{
   const token = await jwt.sign(data,JWT_SECRET,{ expiresIn: '1h' });
   return token;
}
const veryToken = async(token,JWT_SECRET=JWT_SECRET)=>{
    const very_status = await jwt.verify(token,JWT_SECRET);
    return very_status;
 }

 export {getToken,veryToken}
