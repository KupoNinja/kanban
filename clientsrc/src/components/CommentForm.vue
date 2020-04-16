<template>
  <div class="comment-form">
    <form class="align-items-center" @submit.prevent="createComment()">
      <div class="mx-2">
        <label for="comment"></label>
        <input
          class="form-control comment-input"
          type="text"
          @click="showSaveButton"
          placeholder="Add a comment..."
        />
      </div>
      <div>
        <button v-if="showSave" class="btn btn-secondary mt-2 ml-2" @click="createComment">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Commentform",
  data() {
    return {
      showSave: false,
      task: { type: Object, required: true }
    };
  },
  methods: {
    showSaveButton() {
      // NOTE Save button shows if you open another task
      this.showSave = true;
    },
    createComment() {}
  }
};
</script>

<style>
</style>