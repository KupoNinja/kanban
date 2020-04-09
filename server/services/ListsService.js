import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { List } from "../../clientsrc/src/models/List";

class ListsService {
  async getListsByBoardId(query = {}) {
    let lists = await dbContext.Lists.find({ ...query, isDeleted: false });
    return lists;
  }
}

export const listsService = new ListsService();