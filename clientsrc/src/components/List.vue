<template>
  <div class="list box">
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
    <div class="list-body"></div>
  </div>
</template>

<script>
import { List } from "../models/List";
import TaskForm from "../components/TaskForm";

export default {
  name: "List",
  components: {
    TaskForm
  },
  props: {
    // REVIEW Look into making this the actual model - type: List
    // If you put in List as the type Vue errors saying it expected a List but got an Object
    list: { type: Object, required: true }
  },
  data() {
    return {
      toggleTaskInput: false
    };
  },
  methods: {
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