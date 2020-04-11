import { $resource } from "./resource";
import { List } from "../models/List";

export default {
  state: {
    lists: []
  },
  mutations: {
    setLists(state, lists = []) {
      state.lists = lists;
    },
    addList(state, list) {
      state.lists.push(new List(list));
    }
  },
  actions: {
    async getListsByBoardId({ commit }, boardId) {
      let lists = await $resource.get("api/boards/" + boardId + "/lists");
      commit("setLists", lists);
    },
    async createList({ commit }, listData) {
      let list = await $resource.post("api/lists/", listData);
      commit("addList", list);
    }
  }
}