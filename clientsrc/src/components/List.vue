<template>
  <div
    class="list box"
    droppable="true"
    @drop.capture="moveTaskToAnotherList"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
    @dragover.prevent
    ref="droppable"
  >
    <div class="list-header d-flex p-2 justify-content-between">
      <h4>{{ list.title }}</h4>
      <button
        type="button"
        class="close"
        @click="deleteList(list)"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <hr />
    <div class="list-body">
      <div v-if="!toggleTaskInput">
        <button class="btn btn-success mx-2" @click="toggleTaskInput = true">+ Task</button>
      </div>
      <div v-else>
        <task-form @closeTaskForm="toggleTaskInput=false" :listId="list.id" />
      </div>
      <div v-for="task in tasks" :key="task.id">
        <task-card :task="task" @openTaskDetailsModal="openTaskDetailsModal" />
      </div>
    </div>
  </div>
</template>

<script>
import { List } from "../models/List";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

export default {
  name: "List",
  components: {
    TaskForm,
    TaskCard
  },
  props: {
    list: { type: Object, required: true }
  },
  data() {
    return {
      toggleTaskInput: false,
      open: false,
      activeTask: {}
    };
  },
  computed: {
    tasks() {
      // REVIEW Line below is ok but if you change a task on one list each list will then update
      // Using the getter, Vue is smart enough to just update the one list instead of all lists
      // return this.$store.state.tasksStore.tasks.filter(
      //   t => t.listId == this.list.id
      // );
      return this.$store.getters.tasks[this.list.id] || [];
    }
  },
  methods: {
    async deleteList(list) {
      let yes = await this.$confirm("Delete this list?");
      if (!yes) {
        return;
      }
      this.$store.dispatch("deleteList", list);
    },
    // FIXME Remove this
    openTaskDetailsModal(task) {
      this.$emit("openTaskDetailsModal", task);
    },
    moveTaskToAnotherList() {
      // Get task from event storage
      this.$refs.droppable.classList.remove("droppable");
      let task = JSON.parse(event.dataTransfer.getData("data"));
      // Get starting location from event storage
      let from = event.dataTransfer.getData("from");
      // Don't allow drops in the same list
      if (from == this.list.id) {
        return;
      }

      this.$store.dispatch("moveTaskToAnotherList", { task, to: this.list.id });
    },
    dragEnter() {
      this.$refs.droppable.classList.add("droppable");
    },
    dragLeave() {
      this.$refs.droppable.classList.remove("droppable");
    }
  }
};
</script>

<style lang="scss" scoped>
// .task-details-modal {
//   display: none;
//   .open {
//     display: block;
//     position: fixed;
//     min-height: 500px;
//     min-width: 80vw;
//     background: white;
//     border: 1px solid red;
//   }
// }

.box {
  min-height: 70vh;
  width: 200px;
  background-color: var(--info);
}

.droppable {
  border-style: dashed;
  border-color: grey;
  background: var(--primary);
}
</style>