<template>
  <div class="header">header</div>
  <div class="main">
    <div class="menu">
      <Menu></Menu>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import Menu from './Menu.vue';
</script>
<style lang="scss" scoped>
.header {
  height: 100px;
  background: #000;
  color: #fff;
}

.main {
  display: flex;
  height: 100vh;
}

.menu {
  width: 200px;
  height: 100vh;
  background: #ccc;
}

.body {
  flex: 1;
  height: 100vh;
  background: #eee;
  padding: 30px;
}
</style>
