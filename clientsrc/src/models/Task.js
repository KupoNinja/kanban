export class Task {
  constructor({
    id = "",
    title = "",
    content = "",
    creatorId = "",
    listId = "",
    boardId = ""
  } = {}) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.creatorId = creatorId;
    this.listId = listId;
    this.boardId = boardId;
  }
}