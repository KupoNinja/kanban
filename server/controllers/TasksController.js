import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksService";

export class TasksController extends BaseController {
  constructor() {
    super("api/tasks");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get("", this.getTasks)
      // .get("/:taskId", this.getTask)
      .post("", this.createTask)
      .put("", this.updateTask)
    // .delete("/:taskId", this.deleteTask)
  }

  // async getTask(req, res, next) {
  //   try {

  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
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
      let task = await tasksService.deleteTask(req.params.taskId)
      res.send(task);
    } catch (error) {
      next(error);
    }
  }
}