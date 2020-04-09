import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { boardsService } from "../services/BoardsService";

export class BoardsController extends BaseController {
  constructor() {
    super("api/boards");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getBoards)
      .get("/:boardId", this.getBoard)
      .post("", this.createBoard)
      .delete("/:boardId", this.deleteBoard)
  }

  async getBoards(req, res, next) {
    try {
      // TODO Create a service for this...
      let boards = await boardsService.getBoards({ creatorEmail: req.userInfo.email });
      res.send(boards);
    } catch (error) {
      next(error);
    }
  }

  async getBoard(req, res, next) {
    try {
      // TODO Create a service for this...
      let board = await boardsService.getBoard({
        _id: req.params.boardId,
        creatorEmail: req.userInfo.email
      });
      res.send(board);
    } catch (error) {
      next(error);
    }
  }

  async createBoard(req, res, next) {
    try {
      // NOTE Can use ProfileService for this
      req.body.creatorEmail = req.userInfo.email;
      // TODO Create a service for this...
      let board = await boardsService.createBoard(req.body)
      res.send(board);
    } catch (error) {
      next(error);
    }
  }

  async deleteBoard(req, res, next) {
    try {
      await boardsService.deleteBoard(req.params.boardId);
      res.send("Board deleted");
    } catch (error) {
      next(error);
    }
  }
}
