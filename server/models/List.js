import mongoose, { isValidObjectId } from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ListSchema = new Schema(
  {
    creatorId: { type: String, required: true },
    title: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
    boardId: { type: ObjectId, ref: "Board", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default ListSchema;
