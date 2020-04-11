import { $resource } from "./resource"
import { Task } from "../models/Task";
import { toastSuccess } from "@bcwdev/quickvue";

export default {
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(new Task(task));
    }
  },
  actions: {
    async createTask({ commit }, taskData) {
      debugger;
      let task = await $resource.post("api/tasks/", taskData);
      commit("addTask", task);
      toastSuccess("Added Task!");
    }
  }
}