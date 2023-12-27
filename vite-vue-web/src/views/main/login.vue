<template>
  <view>login</view>
</template>
<script setup lang="ts">
import { ElLoading } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";

const store = useUserStore();
const router = useRouter();

const loading = ElLoading.service({
  text: '登陆中...'
})
store.login({
  username: "admin",
  password: "123456",
}).then(()=>{
  setTimeout(() => {
    loading.close();
    router.push('/');
  }, 1500);
});


</script>
