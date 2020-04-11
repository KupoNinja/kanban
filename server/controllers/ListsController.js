import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { listsService } from "../services/ListsService";
import { tasksService } from "../services/TasksService";

export class ListsController extends BaseController {
  constructor() {
    super("api/lists");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("/:listId/tasks", this.getTasksByListId)
      // .get("/:listId", this.getList)
      .post("", this.createList)
      .delete("/:listId", this.deleteList)
  }

  // async getList(req, res, next) {
  //   try {

  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getTasksByListId(req, res, next) {
    try {
      let tasks = await tasksService.getTasksByListId(req.params.listId)
      res.send(tasks);
    } catch (error) {
      next(error);
    }
  }

  async createList(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      let list = await listsService.createList(req.body)
      res.send(list);
    } catch (error) {
      next(error);
    }
  }

  async deleteList(req, res, next) {
    try {
      let list = await listsService.deleteList(req.params.listId)
      res.send(list);
    } catch (error) {
      next(error);
    }
  }
}