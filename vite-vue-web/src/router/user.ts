export default {
  path: "/user",
  name: "用户管理",
  component: () => import("@/layout/index.vue"),
  children: [
    {
      path: "list",
      name: "用户列表",
      component: () => import("@/views/user/list.vue"),
    },
    {
      path: "menu",
      name: "菜单列表",
      component: () => import("@/views/user/menu.vue"),
    },
  ],
};
