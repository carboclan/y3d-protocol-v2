<template>
  <div class="cwb-wrapper">
    <div class="cwb-container">
      <div v-if="connected" class="cwb-wallet-info-wrapper">
        <!-- <div class="cwb-wallet-info-balance">{{blance}} {{coinName}}</div> -->
        <button id="web3-status-connected" class="cwb-wallet-info-button">
          <p class="cwb-wallet-info-address">Conected {{ formatedAddress }}</p>
          <div class="cwb-wallet-info-icon">
            <Identicon />
          </div>
        </button>
      </div>
      <button
        v-else
        class="cwb-connect-button"
        @click="onConnectButtonClick"
        :disabled="!isGoodToConnect"
      >
        Connect to a wallet
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
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
  border-radius: 4px;
  white-space: nowrap;
}
.cwb-connect-button {
  background-color: $um-orange;
  border: 0px;
  border-radius: 4px;
  color: $um-text;
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
  }
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  &:hover {
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
  background-color: $um-orange; //rgb(64, 68, 79);
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
  background-color: $um-orange;
  border: 0px;
  border-radius: 4px;
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
  color: $um-text;
  font-size: 16px;
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
