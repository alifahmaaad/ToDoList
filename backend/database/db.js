import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB;
export default mongoDB;
