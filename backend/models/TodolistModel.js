import mongoose from "mongoose";

const { Schema } = mongoose;
const todolistSchema = new Schema({
  task: { type: String, require: true },
  description: String,
  datetime: { type: Date, default: Date.now },
  label: Array,
  user_id: { type: String, require: true },
});

const Todolist = mongoose.model("Todolist", todolistSchema);

export default Todolist;
