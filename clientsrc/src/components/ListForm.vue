<template>
  <div class="list-form">
    <form class="d-flex align-items-center" @submit.prevent="createList">
      <div class="mx-2">
        <label for="title"></label>
        <input
          class="form-control list-title-input"
          type="text"
          v-model="list.title"
          placeholder="Title"
        />
      </div>
      <div class="btn-container d-flex">
        <div>
          <button class="btn btn-secondary mr-2">Submit</button>
        </div>
        <div>
          <button class="btn btn-danger" @click="closeListForm">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { List } from "../models/List";

export default {
  name: "ListForm",
  data() {
    return {
      list: new List()
    };
  },
  methods: {
    createList() {
      this.list.boardId = this.$route.params.boardId;
      this.$store.dispatch("createList", this.list);
      // this.list = new List(); // Probably not necessary now
      this.closeListForm();
    },
    // REVIEW Look for alternative to implement cancel button within same form to fix warning
    closeListForm() {
      this.$emit("closeListForm");
    }
  }
};
</script>

<style>
</style>