import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { Task } from "../../clientsrc/src/models/Task";

class TasksService {
  async getTasksByListId(listId) {
    let tasks = await dbContext.Tasks.find({ listId: listId, isDeleted: false });
    return tasks;
  }

  async createTask(taskData) {
    let task = await dbContext.Tasks.create(new Task(taskData))
    return task;
  }

  async deleteTask(taskId) {
    let taskToDelete = await dbContext.Tasks.findById(taskId);
    // @ts-ignore
    taskToDelete.isDeleted = true;
    await taskToDelete.save();
    return taskToDelete;
  }
}

export const tasksService = new TasksService();