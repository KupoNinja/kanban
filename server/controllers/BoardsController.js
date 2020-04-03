import BaseController from "../utils/BaseController";
import Auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";

export class BoardsController extends BaseController {
  constructor() {
    super("api/boards");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getBoards)
      .get("/:boardId", this.getBoard)
      .post("", this.create);
  }

  async getBoards(req, res, next) {
    try {
      // TODO Create a service for this...
      let boards = await dbContext.Boards.find({
        creatorEmail: req.userInfo.email
      });
      res.send(boards);
    } catch (error) {
      next(error);
    }
  }

  async getBoard(req, res, next) {
    try {
      // TODO Create a service for this...
      let board = await dbContext.Boards.findOne({
        _id: req.params.boardId,
        creatorEmail: req.userInfo.email
      });
      res.send(board);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // NOTE Can use ProfileService for this
      req.body.creator = req.userInfo.email;
      // TODO Create a service for this...
      let board = await dbContext.Boards.create(req.body);
      res.send(board);
    } catch (error) {
      next(error);
    }
  }
}
