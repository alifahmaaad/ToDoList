import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const createUser = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(password, salt);
  try {
    await User.create({ username, password: hashpassword }).then((data) => {
      res.status(200).json(data);
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
    const isMatch = bcrypt.compare(password, userData.password);
    if (!isMatch) res.status(400).json({ message: "Wrong Password" });
    const accessToken = jwt.sign({ username }, "Secret_key", {
      expiresIn: "30m",
    });
    res.status(200).json({ token: accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
