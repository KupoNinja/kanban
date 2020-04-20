import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksService";
import { commentsService } from "../services/CommentsService"
import { UnAuthorized } from "../utils/Errors";

export class TasksController extends BaseController {
  constructor() {
    super("api/tasks");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("/:taskId/comments", this.getCommentsByTaskId)
      .post("", this.createTask)
      .put("", this.updateTask)
      .delete("/:taskId", this.deleteTask)
  }

  async getCommentsByTaskId(req, res, next) {
    try {
      let comments = await commentsService.getCommentsByTaskId(req.params.taskId);
      res.send(comments);
    } catch (error) {
      next(error);
    }
  }

  async createTask(req, res, next) {
    try {
      // NOTE use sub for creates
      req.body.creatorId = req.userInfo.sub;
      let task = await tasksService.createTask(req.body)
      res.send(task);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      let task = await tasksService.updateTask(req.body);
      res.send(task);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      // REVIEW Design decision... Ok to validate in service? This is receiving a task Id not a task object to verify against creator Id
      // if (req.body.creatorId != req.userInfo.id) throw new UnAuthorized("Unauthorized to delete this task");
      await tasksService.deleteTask(req.params.taskId)
      res.send("Task deleted!");
    } catch (error) {
      next(error);
    }
  }
}