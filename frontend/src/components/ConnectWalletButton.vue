<template>
  <div class="cwb-wrapper">
    <div class="cwb-container">
      <div v-if="connected" class="cwb-wallet-info-wrapper">
        <div class="cwb-wallet-info-balance">{{blance}} {{coinName}}</div>
        <button id="web3-status-connected" class="cwb-wallet-info-button">
          <p class="cwb-wallet-info-address">{{formatedAddress}}</p>
          <div class="cwb-wallet-info-icon">
            <Identicon />
          </div>
        </button>
      </div>
      <button v-else class="cwb-connect-button"
        @click="onConnectButtonClick" :disabled="!isGoodToConnect">
        Connect to a wallet
      </button>
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
import { mapActions, mapState } from 'vuex';
import Vue from 'vue';
import Identicon from './Identicon.vue';

export default Vue.extend({
  name: 'ConnectWalletButton',
  components: {
    Identicon,
  },
  computed: {
    ...mapState('ethers', ['connected', 'address', 'blance', 'coinName', 'initialized']),
    isGoodToConnect() {
      return this.initialized;
    },
    formatedAddress() {
      if (!this.address) return '';
      return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
    },
  },
  methods: {
    ...mapActions('ethers', ['connect']),
    onConnectButtonClick() {
      this.connected();
    },
  },
});
</script>
