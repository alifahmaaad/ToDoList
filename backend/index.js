import express from "express";
import cors from "cors";
import mongoDB from "./database/db.js";
import mongoose from "mongoose";
import TodolistRouter from "./routers/TodolistRouter.js";
import UserRouter from "./routers/UserRouter.js";
import cookieParser from "cookie-parser";
try {
  await mongoose.connect(mongoDB);
  console.log("database connected...");
} catch (error) {
  console.log(error);
}

const app = express();
const port = 5000;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(TodolistRouter);
app.use(UserRouter);
app.listen(port, () => {
  console.log("listening to port " + port);
});
