import express from "express";
import cors from "cors";
import mongoDB from "./database/db.js";
import mongoose from "mongoose";
import TodolistRouter from "./routers/TodolistRouter.js";
import UserRouter from "./routers/UserRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
// import swaggerFile from "./ImportJson.js";
import { promises as fs } from "fs";

const data = await fs.readFile(
  process.cwd() + "./public/data/swagger-output.json",
  "utf8"
);
const swaggerFile = JSON.parse(data);

dotenv.config();
try {
  await mongoose.connect(mongoDB);
  console.log("database connected...");
  console.log(swaggerFile);
} catch (error) {
  console.log(error);
}

const app = express();
const port = 5000;
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENTHOST,
    credentials: true,
    preflightContinue: true,
  })
);
app.use(cookieParser());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(TodolistRouter);
app.use(UserRouter);
app.listen(port, () => {
  console.log("listening to port " + port);
});
