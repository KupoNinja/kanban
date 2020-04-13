<template>
  <div class="card task-card">
    <div>{{ task.title }}</div>
  </div>
</template>

<script>
import { Task } from "../models/Task";

export default {
  name: "TaskCard",
  props: {
    task: { type: Task, required: true }
  }
};
</script>

<style lang="scss" scoped>
</style>