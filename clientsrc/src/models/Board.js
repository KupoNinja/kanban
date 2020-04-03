export class Board {
  constructor({
    id = "",
    name = "",
    description = "",
    creatorEmail = "",
    creator = {}
  } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.creatorEmail = creatorEmail;
    this.creator = creator;
  }
}
