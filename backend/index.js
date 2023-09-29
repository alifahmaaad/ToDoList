import express from "express";
import cors from "cors";
import mongoDB from "./database/db.js";
import mongoose from "mongoose";
import router from "./routers/TodolistRouter.js";

try {
  await mongoose.connect(mongoDB);
  console.log("database connected...");
} catch (error) {
  console.log(error);
}

const app = express();
const port = 5000;
app.use(express.json());
app.use(router);
app.use(cors());
app.listen(port, () => {
  console.log("listening to port " + port);
});
