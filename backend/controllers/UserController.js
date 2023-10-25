import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import cookie from "cookie-parser";
import jwt from "jsonwebtoken";
import Token from "../models/TokenModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const createUser = async (req, res) => {
  // #swagger.tags = ['Users']
  const { username, password, email } = req.body;
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(password, salt);
  try {
    await User.create({ username, password: hashpassword, email }).then(
      (data) => {
        res.status(200).json(data.username);
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  // #swagger.tags = ['Users']
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
  // #swagger.tags = ['Users']
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  await Token.findOneAndDelete({ refreshToken: refreshToken });
  res.cookie("refreshToken", "", { maxAge: 0 });
  res.sendStatus(200);
};
export const getUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const dataUser = await User.findOne({ username: req.username });
    dataUser && res.status(200).json(dataUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateUser = async (req, res) => {
  // #swagger.tags = ['Users']
  const { username, old_password, new_password, email } = req.body;
  try {
    const userData = await User.findOne({
      username: req.username,
    });
    if (userData == null) {
      res.status(400).json({ message: "User with that username not found!" });
    } else {
      const isVerify = await bcrypt.compare(old_password, userData.password);
      if (!isVerify) {
        res.status(400).json({ message: "Wrong Old Password" });
      } else {
        const salt = await bcrypt.genSalt();
        const hashpassword = await bcrypt.hash(new_password, salt);
        await User.findByIdAndUpdate(
          { _id: userData.id },
          { username: username, password: hashpassword, email: email }
        );
        res.status(200).json(username);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const resetPassword = async (req, res) => {
  // #swagger.tags = ['Users']
  const { username, email } = req.body;
  try {
    const dataUser = await User.findOne({ username: username });
    if (dataUser.email != email) {
      res
        .status(404)
        .json({ message: "Email not found and not match with our data" });
    } else {
      const new_password = Math.random().toString(36).substring(2, 10);

      const salt = await bcrypt.genSalt();
      const hashpassword = await bcrypt.hash(new_password, salt);
      await User.findByIdAndUpdate(
        { _id: dataUser.id },
        { password: hashpassword }
      );
      var transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const message = {
        from: process.env.MY_EMAIL,
        to: "ahmad12alif@gmail.com",
        subject: "Reset Password Todolist.alifahmaaad",
        html: `
        <body>
    <div
      style="
        font-family: Helvetica, Arial, sans-serif;
        min-width: 1000px;
        overflow: auto;
        line-height: 2;
      "
    >
      <div style="margin: 50px auto; width: 70%; padding: 20px 0">
        <div style="border-bottom: 1px solid #eee">
          <p
            style="
              font-size: 1.4em;
              color: rgb(163 230 53);
              text-decoration: none;
              font-weight: 600;
            "
          >
            Todolist.alifahmaaad website
          </p>
        </div>
        <p style="font-size: 1.1em">Hi,</p>
        <p>
          Thank you for choosing Todolist.alifahmaaad website. Use the following reset password to login</p>
        <h2
          style="
            background: rgb(163 230 53);
            margin: 0 auto;
            width: max-content;
            padding: 0 10px;
            color: #fff;
            border-radius: 4px;
          "
        >
          <p>Your Reset Password from Todolist.alifahmaaad website is: ${new_password}</p>
        </h2>
        <p style="font-size: 0.9em">Regards,<br />Koding 101</p>
        <hr style="border: none; border-top: 1px solid #eee" />
      </div>
    </div>
  </body>`,
      };
      const info = await transport.sendMail(message);
      res.status(200).json(info);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
