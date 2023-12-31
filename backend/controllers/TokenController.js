import jwt from "jsonwebtoken";
import Token from "../models/TokenModel.js";
export const refreshToken = async (req, res) => {
  // #swagger.tags = ['Token']
  try {
    const refreshToken = req.cookies.refreshToken;
    const payload = jwt.verify(refreshToken, "Secret_Refresh_key");
    if (!payload) {
      return res.sendStatus(403);
    }
    const date = new Date();
    const token_db = await Token.find({
      refreshToken: refreshToken,
      expired_at: { $lte: date },
    });
    if (!token_db) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign({ username: payload.username }, "Secret_key", {
      expiresIn: "10s",
    });
    res.status(200).json({ token: accessToken });
  } catch (error) {
    if (error.message == "jwt expired") {
      res.sendStatus(403);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
