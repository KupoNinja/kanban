import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import BoardSchema from "../models/Board";
import ListSchema from "../models/List";
import TaskSchema from "../models/Task";

class DbContext {
  Profile = mongoose.model("Profile", ProfileSchema);
  Values = mongoose.model("Value", ValueSchema);
  Boards = mongoose.model("Board", BoardSchema);
  Lists = mongoose.model("List", ListSchema);
  Tasks = mongoose.model("Task", TaskSchema);
}

export const dbContext = new DbContext();
