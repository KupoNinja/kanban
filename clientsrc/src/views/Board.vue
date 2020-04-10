<template>
  <div class="board">
    <h1>{{ board.name }}</h1>
    <p>{{ board.description }}</p>

    <div v-if="!toggleListInput">
      <button class="btn btn-success" @click="showListInput()">Add a list</button>
    </div>
    <div v-else>
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
    <list-component class="boxes d-flex" />
  </div>
</template>

<script>
import ListComponent from "../components/List";
import { List } from "../models/List";

export default {
  name: "Board",
  components: {
    ListComponent
  },
  data() {
    return {
      // FIXME Why can't I add this in... Breaks toggleListInput if I try to add list
      toggleListInput: false,
      list: new List()
    };
  },
  // REVIEW You can see the board info change when you pull up the Board view. I tried beforeMount, no change
  mounted() {
    this.$store.dispatch("getBoard", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.boardsStore.activeBoard;
    },
    list() {
      return this.$store.state.listsStore.lists;
    }
  },
  methods: {
    // TODO Create showList function
    showListInput() {
      this.toggleListInput = true;
    },
    createList() {
      this.list.boardId = this.$route.params.boardId;
      this.$store.dispatch("createList", this.list);
      this.list = new List();
    }
  }
};
</script>

<style lang="scss" scoped>
.boxes {
  max-width: 100vw;
  overflow-x: auto;
}

.list-title-input {
  max-width: 300px;
}
</style>
