<template>
  <div class="board">
    <h1>{{ board.name }}</h1>
    <p>{{ board.description }}</p>
    <button class="btn btn-success" @click="showListForm()">+ Add a list</button>
    <list class="boxes d-flex" />
  </div>
</template>

<script>
import List from "../components/List";

export default {
  name: "Board",
  components: {
    List
  },
  // REVIEW You can see the board info change when you pull up the Board view. I tried beforeMount, no change
  mounted() {
    this.$store.dispatch("getBoard", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.boardsStore.activeBoard;
    }
  },
  methods: {
    // TODO Create showList function
  }
};
</script>

<style lang="scss" scoped>
.boxes {
  max-width: 100vw;
  overflow-x: auto;
}
</style>
