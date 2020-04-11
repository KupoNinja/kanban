<template>
  <div class="task-form">
    <form class="align-items-center" @submit.prevent="createTask(listId)">
      <div class="mx-2">
        <label for="title"></label>
        <input
          class="form-control task-title-input"
          type="text"
          v-model="task.title"
          placeholder="Task Title"
        />
      </div>
      <div class="mx-2 mt-n3">
        <label for="content"></label>
        <textarea
          class="form-control task-content-input"
          type="text"
          v-model="task.content"
          placeholder="Task Content"
        />
      </div>
      <div>
        <button class="btn btn-primary ml-2 mt-2">Submit</button>
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
    createTask(listId) {
      debugger;
      this.task.listId = listId;
      this.$store.dispatch("createTask", this.task);
      this.task = new Task();
    }
  }
};
</script>

<style>
</style>