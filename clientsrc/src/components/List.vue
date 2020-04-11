<template>
  <div class="list">
    <div class="d-flex box p-2">
      <h4>{{ list.title }}</h4>
      <div>
        <button class="btn btn-danger">X</button>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import { List } from "../models/List";

export default {
  name: "List",
  props: {
    // REVIEW Look into making this the actual model
    // If you put in List as the type Vue errors saying it expected a List but got an Object
    list: { type: Object, required: true }
  }
};
</script>

<style lang="scss" scoped>
.box {
  min-height: 70vh;
  width: 200px;
  background-color: var(--info);
}
</style>