import { BigNumber } from 'ethers';
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Y3DEthersState } from './types';
/* eslint-enable import/extensions */
/* eslint-enable import/no-unresolved */

export default {
  initialized(state: Y3DEthersState, value: boolean) {
    state.initialized = value;
  },
  connected(state: Y3DEthersState, value: boolean) {
    state.connected = value;
  },
  error(state: Y3DEthersState, value: any) {
    state.error = value;
  },
  user(state: Y3DEthersState, value: string) {
    state.user = value;
  },
  address(state: Y3DEthersState, value: string) {
    state.address = value;
  },
  blance(state: Y3DEthersState, value: number) {
    state.blance = value;
  },
  coinName(state: Y3DEthersState, value: string) {
    state.coinName = value;
  },
  network(state: Y3DEthersState, value: string) {
    state.network = value;
  },
  ens(state: Y3DEthersState, value: string) {
    state.ens = value;
  },
};
