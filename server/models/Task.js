import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TaskSchema = new Schema(
  {
    creatorId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, },
    isDeleted: { type: Boolean, required: true, default: false },
    listId: { type: ObjectId, ref: "List", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default TaskSchema;