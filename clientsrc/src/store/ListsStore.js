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
    async getTasksByListId({ commit }, listId) {
      let tasks = await $resource.get("api/lists/" + listId + "/tasks");
      commit("setTasks", tasks);
    },
    async createList({ commit }, listData) {
      let list = await $resource.post("api/lists/", listData);
      commit("addList", list);
      toastSuccess("List created!");
    },
    async deleteList({ commit }, list) {
      let listToDelete = await $resource.delete("api/lists/" + list.id);
      commit("removeList", listToDelete);
      toastSuccess("List deleted!");
    }
  }
}