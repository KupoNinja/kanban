import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { List } from "../../clientsrc/src/models/List";

class ListsService {
  async getListsByBoardId(boardId) {
    let lists = await dbContext.Lists.find({ boardId: boardId, isDeleted: false });
    return lists;
  }

  async createList(listData) {
    let list = await dbContext.Lists.create(new List(listData))
    return list;
  }

  async deleteList(listId) {
    let listToDelete = await dbContext.Lists.findById(listId);
    // @ts-ignore
    listToDelete.isDeleted = true;
    await listToDelete.save();
    return listToDelete;
  }
}

export const listsService = new ListsService();