<template>
  <div class="list-form">
    <form class="d-flex" @submit.prevent="createList">
      <div class="mx-2">
        <label for="title"></label>
        <input
          class="form-control list-title-input"
          type="text"
          v-model="list.title"
          placeholder="Title"
        />
      </div>
      <!-- REVIEW Button is huge... Why... -->
      <button class="btn btn-primary">Submit</button>
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
      this.list = new List();
    }
  }
};
</script>

<style>
</style>