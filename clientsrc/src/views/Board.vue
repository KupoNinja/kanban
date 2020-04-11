<template>
  <div class="board">
    <h1>{{ board.name }}</h1>
    <p>{{ board.description }}</p>
    <div v-if="!toggleListInput">
      <button class="btn btn-success mx-2" @click="toggleListInput = true">Add a list</button>
    </div>
    <div v-else>
      <list-form />
    </div>
    <hr />
    <div class="boxes d-flex">
      <div class="mx-2 mb-2 mt-n2" v-for="list in lists" :key="list.id">
        <list :list="list" />
      </div>
    </div>
  </div>
</template>

<script>
import List from "../components/List";
import ListForm from "../components/ListForm";

export default {
  name: "Board",
  components: {
    List,
    ListForm
  },
  data() {
    return {
      toggleListInput: false
    };
  },
  // REVIEW You can see the board info change when you pull up the Board view. I tried beforeMount, no change
  mounted() {
    this.$store.dispatch("getBoard", this.$route.params.boardId);
    this.$store.dispatch("getListsByBoardId", this.$route.params.boardId);
    this.$store.dispatch("getTasksByBoardId", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.boardsStore.activeBoard;
    },
    lists() {
      return this.$store.state.listsStore.lists;
    }
  },
  methods: {}
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
