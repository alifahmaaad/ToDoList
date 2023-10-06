import express from "express";
import {
  createTask,
  deleteTask,
  getAllTaskByUserId,
  updateTask,
} from "../controllers/TodolistController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
const router = express.Router();
router.post("/create", verifyToken, createTask);
router.delete("/task/delete/:id", verifyToken, deleteTask);
router.put("/task/update", verifyToken, updateTask);
router.get("/task", verifyToken, getAllTaskByUserId);
export default router;
