<template>
  <div class="comment d-flex justify-content-between border">
    <p>{{ comment.content }}</p>
    <div class="col-2">
      <i
        class="fa fa-fw fa-trash text-muted mr-2 action muted"
        v-if="$auth.isAuthenticated && $auth.user.sub == comment.creatorId"
        @click="deleteComment"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: { type: Object, required: true }
  },
  methods: {
    deleteComment() {
      // let yes = await this.$confirm("Delete this comment?");
      // if (!yes) {
      //   return;
      // }
      this.$store.dispatch("deleteComment", this.comment);
    }
  }
};
</script>

<style>
</style>