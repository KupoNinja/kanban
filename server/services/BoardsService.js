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
    // REVIEW Shouldn't this be BoardSchema?? Why doesn't BoardSchema work?
    let boardToCreate = new Board(boardData);
    let board = await dbContext.Boards.create(boardToCreate);

    return board;
  }

  async deleteBoard(boardId) {
    let boardToDelete = await dbContext.Boards.findById(boardId);
    // @ts-ignore
    boardToDelete.isDeleted = true;
    await boardToDelete.save();
  }
}

export const boardsService = new BoardsService();