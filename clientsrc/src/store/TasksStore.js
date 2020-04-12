import { $resource } from "./resource"
import { Task } from "../models/Task";
import { toastSuccess } from "@bcwdev/quickvue";

let baseUrl = "api/tasks"
export default {
  state: {
    tasks: []
  },
  mutations: {
    setTasks(state, tasks = []) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(new Task(task));
    }
  },
  actions: {
    // async getTasks({ commit }) {
    //   let tasks = await $resource.get(baseUrl);
    //   commit("setTasks", tasks);
    // },
    async createTask({ commit }, taskData) {
      let task = await $resource.post("api/tasks/", taskData);
      commit("addTask", task);
      toastSuccess("Added Task!");
    }
  },
  getters: {
    tasks(state) {
      // REVIEW Almost there but this breaks... 
      // iterate over state.tasks and use each listId as a key in an object
      let tasks = {};
      state.tasks.forEach(t => {
        tasks[t.listId] = t;
      });

      return tasks;
    }
  }
}