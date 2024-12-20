// @ts-ignore
import App from './App.vue';
import { createApp } from 'vue';

export const bootstrap = (container: string) => {
  const app = createApp(App);
  app.mount(container);
};