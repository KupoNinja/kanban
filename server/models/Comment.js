import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema(
  {
    creatorId: { type: String, required: true },
    content: { type: String, },
    isDeleted: { type: Boolean, required: true, default: false },
    taskId: { type: ObjectId, ref: "Task", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default CommentSchema;