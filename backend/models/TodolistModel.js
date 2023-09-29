import mongoose from "mongoose";

const { Schema } = mongoose;
const todolistSchema = new Schema({
  task: { type: String, require: true },
  description: String,
  datetime: { type: Date, default: Date.now },
  label: Array,
});

const Todolist = mongoose.model("Todolist", todolistSchema);

export default Todolist;
