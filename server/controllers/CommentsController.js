import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createComment)
      .delete("/:commentId", this.deleteComment)
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.sub;
      let comment = await commentsService.createComment(req.body)
      res.send(comment);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      await commentsService.deleteComment(req.params.commentId)
      res.send("Comment deleted!");
    } catch (error) {
      next(error);
    }
  }
}