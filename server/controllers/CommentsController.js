import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createComment)
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      let comment = await commentsService.createComment(req.body)
      res.send(comment);
    } catch (error) {
      next(error);
    }
  }
}