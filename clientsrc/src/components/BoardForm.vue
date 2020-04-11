<template>
  <div class="board-form">
    <form @submit.prevent="createBoard">
      <div class="mb-3">
        <label for="name">Name:</label>
        <input class="form-control" type="text" v-model="board.name" />
      </div>
      <div class="mb-3">
        <label for="name">Description:</label>
        <input class="form-control" type="text" v-model="board.description" />
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
      board: new Board()
    };
  },
  methods: {
    createBoard() {
      this.$store.dispatch("createBoard", this.board);
      this.board = new Board();
    }
  }
};
</script>

<style>
</style>