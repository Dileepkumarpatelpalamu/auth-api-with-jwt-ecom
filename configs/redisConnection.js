import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();
const redisOption = {
    host: process.env.REDISHOST || "localhost",
    port: process.env.REDISPORT || 6379,
    password: process.env.REDISPASS || "",
  };
const redisConnection = async(redisOption)=>{
    try{
        const client = createClient(redisOption);
        await client.connect();
        console.log("Connected to redis server")
        return client;
    }catch(err){
     console.log(err);
    }
}
export default  await redisConnection(redisOption)