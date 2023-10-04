import jwt from "jsonwebtoken";
import Token from "../models/TokenModel.js";
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const payload = jwt.verify(refreshToken, "Secret_Refresh_key");
    if (!payload) {
      return res.status(401);
    }
    const token_db = await Token.findOne({
      refreshToken: refreshToken,
      expired_at: { $gte: new Date() },
    });
    if (!token_db) {
      return res.status(401);
    }
    const accessToken = jwt.sign({ username }, "Secret_key", {
      expiresIn: "30m",
    });
    res.status(200).json({ token: accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
