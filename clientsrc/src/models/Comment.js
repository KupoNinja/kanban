export class Comment {
  constructor({
    id = "",
    creatorId = "",
    content = "",
    taskId = ""
  } = {}) {
    this.id = id;
    this.creatorId = creatorId;
    this.content = content;
    this.taskId = taskId;
  }
}