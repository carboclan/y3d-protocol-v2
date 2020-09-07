<template>
  <div class="cwb-wrapper">
    <div class="cwb-container">
      <div v-if="isConnectButtonClicked" class="cwb-wallet-info-wrapper">
        <div class="cwb-wallet-info-balance">99.99 ETH</div>
        <button id="web3-status-connected" class="cwb-wallet-info-button">
          <p class="cwb-wallet-info-address">0xFFFF...FFFF</p>
          <div class="cwb-wallet-info-icon">
            <div style="border-radius: 50px; overflow: hidden; padding: 0px; margin: 0px; width: 16px; height: 16px; display: inline-block;"><svg height="100" version="1.1" width="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; position: relative;"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.3.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#fb1873" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#c8145c" stroke="none" transform="matrix(-0.0951,-0.9955,0.9955,-0.0951,0.5498,16.7168)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#fa6000" stroke="none" transform="matrix(0.9992,0.0404,-0.0404,0.9992,-0.5367,-8.6324)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#f5af00" stroke="none" transform="matrix(0.9299,0.3678,-0.3678,0.9299,-6.4604,-10.2558)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect></svg></div>
          </div>
        </button>
      </div>
      <button v-else class="cwb-connect-button"
        @click="onConnectButtonClick">Connect to a wallet</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cwb-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.cwb-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgb(33, 36, 41);
  border-radius: 12px;
  white-space: nowrap;
}
.cwb-connect-button {
  color: rgb(109, 168, 255);
  background-color: rgba(21, 61, 111, 0.44);
  border: solid 1px rgba(21, 61, 111, 0.44);
  border-radius: 12px;
  font-size: 16px;
  line-height: 1;
  font-weight: 500;
  text-align: center;
  align-items: center;
  outline: none;
  text-decoration: none;
  padding: 0.5rem 0.8rem;
  &:active,
  &:focus {
    box-shadow: rgba(55, 107, 173, 0.44) 0px 0px 0px 1pt;
    background-color: rgba(55, 107, 173, 0.44);
  }
  &:hover,
  &:focus {
    border: 1px solid rgba(49, 95, 154, 0.44);
    color: rgb(83, 153, 255);
  }
  &:hover {
    background-color: rgba(55, 107, 173, 0.44);
  }
  &:focus {
    outline: none;
  }
}
.cwb-wallet-info-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  background-color: rgb(64, 68, 79);
  border-radius: 12px;
  -webkit-box-align: center;
}
.cwb-wallet-info-balance {
  color: #ffffff;
  font-size: 16px;
  line-height: 1;
  font-weight: 500;
  padding-left: 0.75rem;
  padding-right: 0.5rem;
}
.cwb-wallet-info-button {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  color: rgb(255, 255, 255);
  background-color: rgb(44, 47, 54);
  border: 1px solid rgb(64, 68, 79);
  border-radius: 12px;
  font-size: 16px;
  line-height: 1;
  font-weight: 500;
  text-align: center;
  align-items: center;
  outline: none;
  text-decoration: none;
  padding: 0.5rem;
}
.cwb-wallet-info-address {
  line-height: 1;
  margin: 0;
}
.cwb-wallet-info-icon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
}
</style>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ConnectWalletButton',
  data: function data() {
    return {
      isConnectButtonClicked: false,
    };
  },
  methods: {
    onConnectButtonClick() {
      if (this.isConnectButtonClicked === false) {
        this.isConnectButtonClicked = true;
      }
    },
  },
});
</script>
