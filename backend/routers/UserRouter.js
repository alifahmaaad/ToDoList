import express from "express";
import { createUser, login } from "../controllers/UserController.js";
const router = express.Router();
router.post("/login", login);
router.post("/user/create", createUser);

export default router;