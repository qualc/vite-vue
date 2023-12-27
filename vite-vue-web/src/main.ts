import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import { store } from './store';
import router from './router';

import '@/style/reset.scss';
import '@/style/index.scss';
// import 'element-plus/dist/index.css';
import { useUserStore } from './store/modules/user';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);

const userStore = useUserStore();
userStore.refreshData();

app.mount('#app');
