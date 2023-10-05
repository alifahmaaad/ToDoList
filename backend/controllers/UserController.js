import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import cookie from "cookie-parser";
import jwt from "jsonwebtoken";
import Token from "../models/TokenModel.js";
export const createUser = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(password, salt);
  try {
    await User.create({ username, password: hashpassword }).then((data) => {
      res.status(200).json(data.username);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await User.findOne({
      username: username,
    });
    if (userData == null) {
      res.status(400).json({ message: "User with that username not found!" });
    } else {
      const isVerify = await bcrypt.compare(password, userData.password);
      if (!isVerify) {
        res.status(400).json({ message: "Wrong Password" });
      } else {
        const accessToken = jwt.sign({ username }, "Secret_key", {
          expiresIn: "10s",
        });
        const refreshToken = jwt.sign({ username }, "Secret_Refresh_key", {
          expiresIn: "7d",
        });
        await Token.create({
          user_username: username,
          refreshToken: refreshToken,
          expired_at: new Date().getDate() + 7,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ token: accessToken });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  await Token.findOneAndDelete({ refreshToken: refreshToken });
  res.cookie("refreshToken", "", { maxAge: 0 });
  res.sendStatus(200);
};
