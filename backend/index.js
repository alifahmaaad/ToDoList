import express from "express";
import cors from "cors";
import mongoDB from "./database/db.js";
import mongoose from "mongoose";
import TodolistRouter from "./routers/TodolistRouter.js";
import UserRouter from "./routers/UserRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./ImportJson.cjs";

const options = {
  customCssUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui.min.css",
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-standalone-preset.js",
  ],
};
dotenv.config();
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
    origin: process.env.CLIENTHOST,
    credentials: true,
    preflightContinue: true,
  })
);
app.use(cookieParser());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile, options));
app.use(TodolistRouter);
app.use(UserRouter);
app.listen(port, () => {
  console.log("listening to port " + port);
});
