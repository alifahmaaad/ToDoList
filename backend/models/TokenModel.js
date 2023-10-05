import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  user_username: { type: String, require: true },
  expired_at: { type: Date, expires: 7 * 24 * 60 * 60 * 1000 },
  created_at: { type: Date, default: Date.now },
  refreshToken: { type: String },
});

const Token = mongoose.model("token", tokenSchema);
export default Token;
