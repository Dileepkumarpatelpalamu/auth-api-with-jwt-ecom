import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
const UPLOADPATH = process.env.UPLOADPATH || "uploads/";
const url = `http://${process.env.HOST}:${process.env.PORT}`;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null,UPLOADPATH);
    },
    filename: (req, file, cb) => {
       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
       cb(null,file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
 });
 const upload_config = multer({ storage: storage });
 export default upload_config;