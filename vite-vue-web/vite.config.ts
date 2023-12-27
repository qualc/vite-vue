import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      dts: 'types/auto-imports.d.ts',
      imports: ['vue'], // 自动导入 vue 相关的函数
      eslintrc: {
        enabled: true, // 关闭eslint
      },
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: 'types/components.d.ts',
      // 自动注册  默认值就是 src/components
      dirs: ['src/components'],
      extensions: ['vue', 'tsx', 'ts'],
      resolvers: [ElementPlusResolver({ importStyle: true })], // 自动导入element-plus vue的组件
    }),
    ElementPlus({}),
  ],
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
});
