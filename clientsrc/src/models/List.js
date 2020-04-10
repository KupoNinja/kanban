export class List {
  constructor({
    id = "",
    title = "",
    creatorId = "",
    boardId = "",
  } = {}) {
    this.id = id;
    this.title = title;
    this.creatorId = creatorId;
    this.boardId = boardId;
  }
}