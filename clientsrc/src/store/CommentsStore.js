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
    },
    removeComment(state, comment) {
      let i = state.comments.findIndex(c => c.id == comment.id);
      if (i == -1) {
        return;
      }
      state.comments.splice(i, 1);
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
    },
    async deleteComment({ commit }, comment) {
      await $resource.delete("api/comments/" + comment.id);
      commit("removeComment", comment);
      toastSuccess("Comment deleted!");
    }
  }
}