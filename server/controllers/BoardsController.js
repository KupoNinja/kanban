import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { boardsService } from "../services/BoardsService";
import { listsService } from "../services/ListsService";
import { tasksService } from "../services/TasksService";
import { UnAuthorized } from "../utils/Errors";

export class BoardsController extends BaseController {
  constructor() {
    super("api/boards");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getBoards)
      .post("", this.createBoard)
      .use("/:boardId", this.validateCreator)
      .get("/:boardId", this.getBoard)
      .get("/:boardId/lists", this.getListsByBoardId)
      .get("/:boardId/tasks", this.getTasksByBoardId)
      .delete("/:boardId", this.deleteBoard)
  }

  async validateCreator(req, res, next) {
    try {
      req.board = await boardsService.getBoard({ _id: req.params.boardId, creatorEmail: req.userInfo.email })
      // NOTE next() allows the router to move down the line into normal route handlers
      next();
    } catch (error) {
      // NOTE this next() sends teh request to only error handlers
      next(error);
    }
  }

  async getBoards(req, res, next) {
    try {
      let boards = await boardsService.getBoards({ creatorEmail: req.userInfo.email });
      res.send(boards);
    } catch (error) {
      next(error);
    }
  }

  async getBoard(req, res, next) {
    try {
      // NOTE Getting board from validateCreator
      res.send(req.board);
    } catch (error) {
      next(error);
    }
  }

  async getListsByBoardId(req, res, next) {
    try {
      let lists = await listsService.getListsByBoardId(req.params.boardId);
      res.send(lists);
    } catch (error) {
      next(error);
    }
  }

  async getTasksByBoardId(req, res, next) {
    try {
      let tasks = await tasksService.getTasksByBoardId(req.params.boardId);
      res.send(tasks);
    } catch (error) {
      next(error);
    }
  }

  async createBoard(req, res, next) {
    try {
      // NOTE Can use ProfileService for this
      req.body.creatorEmail = req.userInfo.email;
      let board = await boardsService.createBoard(req.body)
      res.send(board);
    } catch (error) {
      next(error);
    }
  }

  async deleteBoard(req, res, next) {
    try {
      // REVIEW See TasksController
      await boardsService.deleteBoard(req.params.boardId);
      res.send("Board deleted");
    } catch (error) {
      next(error);
    }
  }
}
