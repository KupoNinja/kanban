import { dbContext } from "../db/DbContext";
import { BadRequest, NotFound } from "../utils/Errors";
import { Task } from "../../clientsrc/src/models/Task";

class TasksService {
  async getTask(taskId) {
    let task = await dbContext.Tasks.findById(taskId);
    if (!task) {
      throw new BadRequest("Invalid Id");
    }

    // @ts-ignore
    if (task.isDeleted) {
      throw new NotFound("This task has been deleted");
    }

    return task
  }

  async getTasksByListId(listId) {
    let tasks = await dbContext.Tasks.find({ listId: listId, isDeleted: false });
    return tasks;
  }

  async getTasksByBoardId(boardId) {
    let tasks = await dbContext.Tasks.find({ boardId: boardId, isDeleted: false });
    return tasks;
  }

  async createTask(taskData) {
    let task = await dbContext.Tasks.create(new Task(taskData))
    return task;
  }

  // REVIEW So far only handling moving task to a list
  async updateTask(task) {
    let taskToUpdate = await this.getTask(task);
    // @ts-ignore
    taskToUpdate.listId = task.listId;
    let updatedTask = await dbContext.Tasks.findByIdAndUpdate(task.id, taskToUpdate, { new: true });

    return updatedTask;
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