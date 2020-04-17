import { $resource } from "./resource";
import { Comment } from "../models/Comment";
import { toastSuccess } from "@bcwdev/quickvue";

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
      toastSuccess("Added comment!");
    },
    clearComments({ commit }) {
      commit("clearComments");
    }
  }
}