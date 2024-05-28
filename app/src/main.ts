import { createApp, h } from 'vue';

import App from './app.vue';
import router from './router';

const app = createApp({
  render: () => h(App),
});

app.use(router);

app.mount('#app');