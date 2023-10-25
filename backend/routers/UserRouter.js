import express from "express";
import {
  createUser,
  getUser,
  login,
  logout,
  resetPassword,
  updateUser,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/TokenController.js";
const router = express.Router();
router.post("/login", login);
router.post("/register", createUser);
router.get("/logout", verifyToken, logout);
router.get("/refresh", refreshToken);
router.get("/user", verifyToken, getUser);
router.put("/update/user", verifyToken, updateUser);
router.post("/resetpassword", resetPassword);
export default router;
