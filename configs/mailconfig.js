import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()
const service = process.env.MAILSERVICE || "gmail";
const authUser = process.env.AUTHUSER || "pateldileep51@gmail.com";
const authPass = process.env.AUTHPASS || "nmjjakkjldrshtof";
const mailConfigOptions = {service: service,auth: {user: authUser,pass: authPass,}}
const transporter = nodemailer.createTransport(mailConfigOptions);
const mailSender  = async (from,to,subject,body)=>{
    const mailOptions = {from: from,to: to,subject: subject,text: body};
    try{
        const info = await transporter.sendMail(mailOptions);
        return info;
    }catch(err){
        console.log(err)
    }
}
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }
export {mailSender,generateOTP}
