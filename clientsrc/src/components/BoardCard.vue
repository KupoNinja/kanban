<template>
  <div class="board-card">
    <router-link :to="{ name: 'Board', params: { boardId: board.id } }">{{ board.name }}</router-link>
    <p>{{ board.description }}</p>
    <!-- <div
          class="d-flex align-items-center"
          v-if="$auth.isAuthenticated && $auth.user.email == board.creatorEmail"
    >-->
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
      this.$store.dispatch("removeBoard", board);
    }
  }
};
</script>

<style>
</style>