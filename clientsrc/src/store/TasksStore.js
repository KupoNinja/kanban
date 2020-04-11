import { $resource } from "./resource"
import { Task } from "../models/Task";
import { toastSuccess } from "@bcwdev/quickvue";

export default {
  state: {
    tasks: []
  },
  mutations: {
    setTasks(state, tasks = []) {
      debugger;
      state.tasks = tasks;
    },
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
  },
  getters: {
    mappedTasks(state) {
      // iterate over state.tasks and use each listId as a key in an object
      let mappedTasks = {};
      state.tasks.forEach(t => {
        mappedTasks[t.listId] = t;
      });

      return mappedTasks;
    }
  }
}