import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const mongoDB =
  "mongodb+srv://mongodb:<password>@todolist.umpr6mh.mongodb.net/?retryWrites=true&w=majority";
export default mongoDB;
