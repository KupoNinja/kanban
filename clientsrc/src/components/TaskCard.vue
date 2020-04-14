<template>
  <div class="card task-card m-2">
    <div>{{ task.title }}</div>
  </div>
</template>

<script>
import { Task } from "../models/Task";

export default {
  name: "TaskCard",
  props: {
    task: { type: Object, required: true }
  }
};
</script>

<style lang="scss" scoped>
</style>