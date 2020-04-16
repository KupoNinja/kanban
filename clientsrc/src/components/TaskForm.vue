<template>
  <div class="task-form">
    <form class="align-items-center" @submit.prevent="createTask">
      <div class="mx-2">
        <label for="title"></label>
        <input
          class="form-control task-title-input"
          type="text"
          v-model="task.title"
          placeholder="Title"
        />
      </div>
      <div class="mx-2 mt-n3">
        <label for="content"></label>
        <textarea
          class="form-control task-content-input"
          type="text"
          v-model="task.content"
          placeholder="Content"
        />
      </div>
      <div class="btn-container d-flex justify-content-around">
        <div>
          <button class="btn btn-secondary mt-2">Submit</button>
        </div>
        <div>
          <button class="btn btn-danger mt-2" @click="closeTaskForm">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Task } from "../models/Task";

export default {
  name: "TaskForm",
  props: {
    listId: { type: String, required: true }
  },
  data() {
    return {
      task: new Task()
    };
  },
  methods: {
    createTask() {
      this.task.listId = this.listId;
      this.task.boardId = this.$route.params.boardId;
      this.$store.dispatch("createTask", this.task);
      this.task = new Task();
      this.closeTaskForm();
    },
    closeTaskForm() {
      this.$emit("closeTaskForm");
    }
  }
};
</script>

<style>
</style>