<template>
  <div>
    <board-form />
    <div class="boards d-flex flex-wrap justify-content-start">
      <div class="card p-2 my-2 elevation-4 mx-2" v-for="board in boards" :key="board.id">
        <board-card :board="board" />
      </div>
    </div>
  </div>
</template>

<script>
import BoardForm from "../components/BoardForm";
import BoardCard from "../components/BoardCard";

export default {
  name: "Boards",
  components: {
    BoardForm,
    BoardCard
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    boards() {
      return this.$store.state.boardsStore.boards;
    }
  },
  methods: {}
};
</script>

<style></style>
