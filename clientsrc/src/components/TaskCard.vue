<template>
  <div
    class="card task-card m-2"
    @click="openTaskDetailsModal"
    draggable="true"
    @dragstart.capture="moving"
    @dragend="dragEnd"
    @dragover.prevent
    ref="draggable"
  >
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
    openTaskDetailsModal() {
      this.$emit("openTaskDetailsModal", this.task);
    },
    moving() {
      let from = this.listId;
      event.dataTransfer.setData("data", JSON.stringify(this.task));
      event.dataTransfer.setData("from", from);

      // Dragging animation
      // Adds class on to the original element
      this.$refs.draggable.classList.add("dragging");
      // This puts a ref on the original element and sets it as the ghost element
      event.dataTransfer.setDragImage(this.$refs.draggable, 0, 0);
    },
    dragEnd() {
      this.$refs.draggable.classList.remove("dragging");
    }
  }
};
</script>

<style lang="scss" scoped>
.task-card {
  cursor: pointer;
}
.dragging {
  transform: scale(0.9);
  opacity: 0.6;
}
</style>