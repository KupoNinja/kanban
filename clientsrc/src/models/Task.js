export class Task {
  constructor({
    id = "",
    title = "",
    content = "",
    creatorId = "",
    listId = ""
  } = {}) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.creatorId = creatorId;
    this.listId = listId;
  }
}