import Vue from 'vue';
import Vuex from 'vuex';
import ethers from './ethers';
import swap from './swap';
import lang from './lang';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    swap,
    ethers,
    lang,
  },
});
