<template>
  <div class="comment-form">
    <form class="align-items-center" @submit.prevent="createComment">
      <div class="mx-2">
        <label for="comment"></label>
        <input
          class="form-control comment-input"
          type="text"
          v-model="comment.content"
          @click="showSaveButton"
          placeholder="Add a comment..."
        />
      </div>
      <div>
        <button v-if="showSave" class="btn btn-secondary mt-2 ml-2" @click="createComment">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Comment } from "../models/Comment";

export default {
  name: "Commentform",
  props: {
    task: { type: Object, required: true }
  },
  data() {
    return {
      comment: new Comment(),
      showSave: false
    };
  },
  methods: {
    showSaveButton() {
      // NOTE Save button shows if you open another task
      this.showSave = true;
    },
    createComment() {
      this.comment.taskId = this.task.id;
      this.$store.dispatch("createComment", this.comment);
      this.comment = new Comment();
    }
  }
};
</script>

<style>
</style>