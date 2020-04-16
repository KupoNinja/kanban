import { $resource } from "./resource"
import { Task } from "../models/Task";
import { toastSuccess } from "@bcwdev/quickvue";
import { tasksService } from "../../../server/services/TasksService";

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
    },
    updateTask(state, task) {
      let index = state.tasks.findIndex(t => t.id == task.id);
      state.tasks.splice(index, 1, task);
    },
    removeTask(state, task) {
      let i = state.tasks.findIndex(b => b.id == task.id);
      if (i == -1) {
        return;
      }
      state.tasks.splice(i, 1);
    }
  },
  actions: {
    // async getTasks({ commit }) {
    //   let tasks = await $resource.get(baseUrl);
    //   commit("setTasks", tasks);
    // },
    async getCommentsByTaskId({ commit }, taskId) {
      let comments = await $resource.get("api/tasks/" + taskId + "/comments")
      commit("setComments", comments);
    },
    async createTask({ commit }, taskData) {
      let task = await $resource.post("api/tasks/", taskData);
      commit("addTask", task);
      toastSuccess("Added Task!");
    },
    async deleteTask({ commit }, task) {
      await $resource.delete("api/tasks/" + task.id);
      commit("removeTask", task);
      toastSuccess("Task deleted!");
    },
    async moveTaskToAnotherList({ commit }, { task, to }) {
      task.listId = to;
      let movedTask = await $resource.put("api/tasks/", task);

      commit("updateTask", movedTask);
    }
  },
  getters: {
    tasks(state) {
      // REVIEW Only holds one task per listId
      let tasksWithListId = {};
      state.tasks.forEach(t => {
        if (!tasksWithListId[t.listId]) {
          tasksWithListId[t.listId] = [];
        }
        tasksWithListId[t.listId].push(t);
      });

      return tasksWithListId;
    }
  }
}