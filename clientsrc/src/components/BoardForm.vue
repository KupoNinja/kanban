<template>
  <div class="board-form">
    <form @submit.prevent="createBoard">
      <div class="mb-3">
        <label for="name">Name:</label>
        <input class="form-control" type="text" v-model="editable.name" />
      </div>
      <div class="mb-3">
        <label for="name">Description:</label>
        <input class="form-control" type="text" v-model="editable.description" />
      </div>
      <div class="my-3">
        <button class="btn btn-success btn-block">Create Board</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Board } from "../models/Board";

export default {
  name: "BoardForm",
  data() {
    return {
      editable: new Board()
    };
  },
  methods: {
    createBoard() {
      this.$store.dispatch("createBoard", this.editable);
      this.editable = new Board();
    }
  }
};
</script>

<style>
</style>