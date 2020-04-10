import { Board } from "../models/Board";
import { $resource } from "./resource";
import { toastSuccess } from "@bcwdev/quickvue";

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
    },
    removeBoard(state, board) {
      let i = state.boards.findIndex(b => b.id == board.id);
      if (i == -1) {
        return;
      }
      state.boards.splice(i, 1);
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
      commit("addBoard", board);
      // commit("setBoards", board); // REVIEW You may not want this... when creating a board this sets it as the active board
    },
    async removeBoard({ commit }, board) {
      await $resource.delete("api/boards/" + board.id);
      commit("removeBoard", board);
      toastSuccess("Board deleted!");
    }
  },
  getters: {

  }
};
