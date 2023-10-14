import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB;
export default mongoDB;
