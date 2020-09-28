import Vue from 'vue';
import i18n from '@/utils/lang';
import ElementUI from 'element-ui';
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

// 国际化 - 语言
Vue.use(ElementUI, {
  i18n: (key: string, value: any[] | { [key: string]: any }) => i18n.t(key, value),
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');

// Initialize ethers store
store.dispatch('ethers/init');
store.dispatch('swap/fetchTokensInfo');
store.dispatch('swap/fetchPairList');
