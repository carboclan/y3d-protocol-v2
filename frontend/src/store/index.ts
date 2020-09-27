import Vue from 'vue';
import Vuex from 'vuex';
import ethers from './ethers';
import swap from './swap';

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
  },
});
