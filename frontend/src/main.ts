import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import './plugins/element-ui';
import './plugins/icons';
import './plugins/rem';

import './assets/styles/reset.scss';

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV !== 'production';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// Initialize ethers store
store.dispatch('ethers/init');
