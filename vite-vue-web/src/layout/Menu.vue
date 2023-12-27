<template>
  <el-menu router :collapse="false">
    <el-sub-menu v-for="item in menuList" :index="item.path">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>{{ item.name }}</span>
      </template>
      <el-menu-item-group
        v-if="item.children && item.children.length"
        v-for="route in item.children"
      >
        <el-menu-item :index="route.path">{{ route.name }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { Setting } from "@element-plus/icons-vue";
import { ref } from "vue";
import { IMenuList } from "@/models/menu";
import { useUserStore } from "@/store/modules/user";

const store = useUserStore();
const menuList = ref<IMenuList[]>(store.menuList);
</script>
