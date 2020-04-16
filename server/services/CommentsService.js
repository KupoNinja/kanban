import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { Comment } from "../../clientsrc/src/models/Comment";

class CommentsService {
  async getCommentsByTaskId(taskId) {
    let comments = await dbContext.Comments.find({ taskId: taskId, isDeleted: false });
    return comments;
  }
  async createComment(commentData) {
    let comment = await dbContext.Comments.create(new Comment(commentData))
    return comment;
  }
}

export const commentsService = new CommentsService();