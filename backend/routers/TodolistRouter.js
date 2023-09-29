import express from "express";
import { createTask } from "../controllers/TodolistController.js";
const router = express.Router();
router.post("/create", createTask);
export default router;
