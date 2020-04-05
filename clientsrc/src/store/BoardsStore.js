import { Board } from "../models/Board";
import { $resource } from "./resource";

export default {
  state: {
    boards: [],
    activeBoard: new Board()
  },
  mutations: {
    setBoards(state, boards = []) {
      state.boards = boards;
    },
    setBoard(state, board = new Board()) {
      state.activeBoard = board;
    },
    addBoard(state, board) {
      state.boards.push(new Board(board));
    }
  },
  actions: {
    async getBoards({ commit }) {
      let boards = await $resource.get("api/boards");
      commit("setBoards", boards);
    },
    async getBoard({ commit }, id) {
      let board = await $resource.get("api/boards/" + id);
      commit("setBoard", board);
    },
    async createBoard({ commit }, boardData) {
      let board = await $resource.post("api/boards/", boardData);
      commit("setBoards", board); // REVIEW You may not want this... when creating a board this sets it as the active board
      commit("addBoard", board);
    },
  },
};
