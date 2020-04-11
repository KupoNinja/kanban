<template>
  <div class="list">
    <div class="box">
      <h4>{{ list.name }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    list: { type: Object, required: true }
  }
};
</script>

<style lang="scss" scoped>
.box {
  min-height: 80vh;
  width: 200px;
  background-color: var(--info);
}
</style>