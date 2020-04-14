<template>
  <div class="card task-card m-2" draggable="true" @dragstart.capture="moving">
    <div>{{ task.title }}</div>
  </div>
</template>

<script>
import { Task } from "../models/Task";

export default {
  name: "TaskCard",
  props: {
    task: { type: Object, required: true }
  },
  methods: {
    moving() {
      let from = this.listId;
      event.dataTransfer.setData("data", JSON.stringify(this.task));
      event.dataTransfer.setData("from", from);

      // TODO Dragging animation
      // Adds class on to the original element
      // this.$refs.draggable.classList.add("dragging");
      // This puts a ref on the original element and sets it as the ghost element
      // event.dataTransfer.setDragImage(this.$refs.draggable, 0, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.task-card {
  cursor: pointer;
}
.dragging {
  transform: scale(0.8);
  opacity: 0.3;
}
</style>