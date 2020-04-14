<template>
  <div class="list box" droppable="true" @drop.capture="moveTaskToAnotherList" @dragover.prevent>
    <div class="list-header d-flex p-2">
      <h4>{{ list.title }}</h4>
      <div>
        <button class="btn btn-danger" @click="deleteList(list)">X</button>
      </div>
    </div>
    <hr />
    <div v-if="!toggleTaskInput">
      <button class="btn btn-success mx-2" @click="toggleTaskInput = true">+ Task</button>
    </div>
    <div v-else>
      <task-form :listId="list.id" />
    </div>
    <div class="list-body">
      <div v-for="task in tasks" :key="task.id">
        <task-card :task="task" />
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
      toggleTaskInput: false
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
    moveTaskToAnotherList() {
      // Get task from event storage
      let task = JSON.parse(event.dataTransfer.getData("data"));
      // Get starting location from event storage
      let from = event.dataTransfer.getData("from");
      // Don't allow drops in the same list
      if (from == this.list.id) {
        return;
      }

      this.$store.dispatch("moveTaskToAnotherList", { task, to: this.list.id });
    },
    async deleteList(list) {
      let yes = await this.$confirm("Delete this list?");
      if (!yes) {
        return;
      }
      this.$store.dispatch("deleteList", list);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  min-height: 70vh;
  width: 200px;
  background-color: var(--info);
}
</style>