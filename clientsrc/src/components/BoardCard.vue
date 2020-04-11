<template>
  <!-- Make cards same width -->
  <div class="board-card text-center">
    <router-link :to="{ name: 'Board', params: { boardId: board.id } }">{{ board.name }}</router-link>
    <p>{{ board.description }}</p>
    <i class="fa fa-fw fa-trash text-muted mr-2 action muted" @click="deleteBoard(board)"></i>
  </div>
</template>

<script>
export default {
  name: "BoardCard",
  props: {
    board: { type: Object, required: true }
  },
  methods: {
    async deleteBoard(board) {
      let yes = await this.$confirm("Delete this board?");
      if (!yes) {
        return;
      }
      this.$store.dispatch("deleteBoard", board);
    }
  }
};
</script>

<style lang="scss" scoped>
// REVIEW Why isn't this working...
.board-card {
  width: 200px;
}
</style>