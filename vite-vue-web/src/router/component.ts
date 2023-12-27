export default {
  path: "/component",
  name: "组件管理",
  component: () => import("@/layout/index.vue"),
  children: [
    {
      path: "basic",
      name: "基础组件",
      component: () => import("@/views/component/basic.vue"),
    },
    {
      path: "config",
      name: "配置组件",
      component: () => import("@/views/component/config.vue"),
    },
  ],
};
