import CustomErrorHandler from "../services/customErrorHandler.js";
import Joi from "joi";
const DEBUG_MODE = process.env.DEBUG_MODE || "false";
const errorHandler = (err,req,res,next)=>{
    let statusCode =500;
    let data = {
        message:"Internal server error..! ",
        ...(DEBUG_MODE === "true" && {originalError: err.originalError})
    }
    if (err instanceof Joi.ValidationError ){
        statusCode = 422;
        data = {
            message : err.message
        }
    }
    if (err instanceof CustomErrorHandler){
        statusCode = err.statusCode;
        data = {
            message:err.message
        }
    }
    return res.status(statusCode).json(data);
}
export default errorHandler;