import getters from './getters';
import actions from './actions';
import mutations from './mutations';
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Y3DEthersState } from './types';
/* eslint-enable import/extensions */
/* eslint-enable import/no-unresolved */

const state = (): Y3DEthersState => ({
  initialized: false,
  connected: false,
  error: null,
  // user is ens or address
  user: '',
  address: '',
  blance: 0,
  coinName: 'ETH',
  network: '',
  ens: null,
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
