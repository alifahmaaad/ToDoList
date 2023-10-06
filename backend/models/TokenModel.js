import mongoose from "mongoose";
const expire_time = 7 * 24 * 60 * 60 * 1000;

const tokenSchema = new mongoose.Schema({
  user_username: { type: String, require: true },
  expired_at: { type: Date, expires: expire_time },
  created_at: { type: Date, default: Date.now },
  refreshToken: { type: String },
});

const Token = mongoose.model("token", tokenSchema);
export default Token;
