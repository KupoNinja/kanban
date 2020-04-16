import { $resource } from "./resource";
import { Comment } from "../models/Comment";

export default {
  state: {
    comments: []
  },
  mutations: {
    setComments(state, comments = []) {
      state.comments = comments;
    },
    addComment(state, comment) {
      state.comments.push(new Comment(comment));
    },
    clearComments(state) {
      state.comments = [];
    }
  },
  actions: {
    async createComment({ commit }, commentData) {
      let comment = await $resource.post("api/comments/", commentData);
      commit("addComment", comment);
    },
    clearComments({ commit }) {
      commit("clearComments");
    }
  }
}