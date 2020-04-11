import { $resource } from "./resource";
import { List } from "../models/List";
import { toastSuccess } from "@bcwdev/quickvue";

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
    },
    removeList(state, list) {
      let i = state.lists.findIndex(l => l.id == list.id);
      if (i == -1) {
        return;
      }
      state.lists.splice(i, 1);
    }
  },
  actions: {
    async createList({ commit }, listData) {
      let list = await $resource.post("api/lists/", listData);
      commit("addList", list);
    },
    async deleteList({ commit }, list) {
      let listToDelete = await $resource.delete("api/lists/" + list.id);
      commit("removeList", listToDelete);
      toastSuccess("List deleted!");
    }
  }
}