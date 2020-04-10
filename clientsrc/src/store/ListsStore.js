import { $resource } from "./resource";
import { List } from "../models/List";

export default {
  state: {
    lists: []
  },
  mutations: {
    addList(state, list) {
      state.lists.push(new List(list));
    }
  },
  actions: {
    async createList({ commit }, listData) {
      debugger;
      let list = await $resource.post("api/lists/", listData);
      commit("addList", list);
    },
  }
}