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

  // async getTask(req, res, next) {
  //   try {

  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      let comment = await commentsService.createComment(req.body)
      res.send(comment);
    } catch (error) {
      next(error);
    }
  }

  // async updateTask(req, res, next) {
  //   try {
  //     let task = await tasksService.updateTask(req.body);
  //     res.send(task);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async deleteTask(req, res, next) {
  //   try {
  //     let task = await tasksService.deleteTask(req.params.taskId)
  //     res.send(task);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}