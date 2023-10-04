import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  user_username: { type: String, require: true },
  expired_at: { type: Date },
  created_at: { type: Date, default: Date.now },
  refreshToken: { type: String },
});

const Token = new mongoose.model("token", tokenSchema);
export default Token;
