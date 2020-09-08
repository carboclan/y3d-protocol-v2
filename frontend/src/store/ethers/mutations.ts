/* eslint-disable */
export default {
  initialized: function (state: any, value: any) {
    state.initialized = value
  },
  connected: function (state: any, value: boolean) {
    state.connected = value
  },
  error: function (state: any, value: any) {
    state.error = value
  },
  user: function (state: any, value: any) {
    state.user = value
  },
  address: function (state: any, value: any) {
    state.address = value
  },
  network: function (state: any, value: any) {
    state.network = value
  },
  ens: function (state: any, value: any) {
    state.ens = value
  }
}
