import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { Board } from "../../clientsrc/src/models/Board";

class BoardsService {
  async getBoards(query = {}) {
    let boards = await dbContext.Boards.find({ ...query, isDeleted: false });

    return boards;
  }

  async getBoard(query = {}) {
    let board = await dbContext.Boards.findOne(query);
    if (!board) {
      throw new BadRequest("Invalid Id");
    }

    return board;
  }

  async createBoard(boardData) {
    let boardToCreate = new Board(boardData);
    let board = await dbContext.Boards.create(boardToCreate);

    return board;
  }
}

export const boardsService = new BoardsService();