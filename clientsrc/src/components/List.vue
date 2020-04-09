<template>
  <div class="lists">
    <div class="m-1" v-for="n in 4" :key="n">
      <div class="box">box-{{ n }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List"
};
</script>

<style lang="scss" scoped>
.box {
  min-height: 80vh;
  width: 200px;
  background-color: var(--info);
}
</style>