import { createRouter, createWebHashHistory } from "vue-router";
import component from "./component";
import user from "./user";
import login from "./login";


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    login,
    component,
    user,
    {
      path: '/',
      redirect: '/user/list',
    }
    // ...其他路由
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') 
  if (to.path === '/login' || token) {
    next();
  } else {
    next('/login');
  }
});

export default router;