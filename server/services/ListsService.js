import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { List } from "../../clientsrc/src/models/List";

class ListsService {
  async getListsByBoardId(query = {}) {
    let lists = await dbContext.Lists.find({ ...query, isDeleted: false });
    return lists;
  }

  async createList(listData) {
    let list = await dbContext.Lists.create(new List(listData))
    return list;
  }
}

export const listsService = new ListsService();