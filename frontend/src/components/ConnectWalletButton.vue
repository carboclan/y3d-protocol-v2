<template>
  <div class="cwb-wrapper">
    <div class="cwb-container">
      <div v-if="connected" class="cwb-wallet-info-wrapper" @click="onWalletButtonClick">
        <div class="cwb-wallet-info-balance">{{ blance }} {{ coinName }}</div>
        <button id="web3-status-connected" class="cwb-wallet-info-button">
          <p class="cwb-wallet-info-address">{{ formatedAddress }}</p>
          <div class="cwb-wallet-info-icon">
            <Identicon />
          </div>
        </button>
      </div>
      <button
        v-else
        class="cwb-connect-button"
        @click="onWalletButtonClick"
      >
        {{ $t('app.tipConnectWallet') }}
      </button>
    </div>
    <ConnectWalletModal v-model="showWallet" />
  </div>
</template>
<style lang="scss" scoped>
@media (max-width: 600px) {
  .cwb-wallet-info-balance {
    display: none !important;
  }
}
.cwb-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.cwb-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--cwb-container-background-color);
  border-radius: var(--cwb-container-border-radius);
  white-space: nowrap;
}
.cwb-connect-button {
  color: var(--cwb-connect-button-color);
  background-color: var(--cwb-connect-button-background-color);
  border: var(--cwb-connect-button-border);
  border-radius: var(--cwb-connect-button-border-radius);
  font-size: var(--cwb-connect-button-font-size);
  line-height: 1;
  font-weight: 500;
  text-align: center;
  align-items: center;
  outline: none;
  text-decoration: none;
  padding: 0.5rem 0.8rem;
  &:active {
    box-shadow: var(--cwb-connect-button-box-shadow--active);
    background-color: var(--cwb-connect-button-background-color--active);
  }
  &:hover {
    color: var(--cwb-connect-button-color--hover);
    background-color: var(--cwb-connect-button-background-color--hover);
    border: var(--cwb-connect-button-border--hover);
  }
  &:focus {
    color: var(--cwb-connect-button-color--focus);
    background-color: var(--cwb-connect-button-background-color--focus);
    border: var(--cwb-connect-button-border--focus);
    box-shadow: var(--cwb-connect-button-box-shadow--focus);
    outline: none;
  }
}
.cwb-wallet-info-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  background-color: var(--cwb-wallet-info-wrapper-background-color);
  border-radius: var(--cwb-wallet-info-wrapper-border-radius);
  -webkit-box-align: center;
}
.cwb-wallet-info-balance {
  color: var(--cwb-wallet-info-balance-color);
  font-size: var(--cwb-wallet-info-balance-font-size);
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
  color: var(--cwb-wallet-info-button-color);
  background-color: var(--cwb-wallet-info-button-background-color);
  border: var(--cwb-wallet-info-button-border);
  border-radius: var(--cwb-wallet-info-button-border-radius);
  font-size: var(--cwb-wallet-info-button-font-size);
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
import ConnectWalletModal from './ConnectWalletModal.vue';

export interface ConnectWalletButtonData {
  showWallet: Boolean;
}

export default Vue.extend({
  name: 'ConnectWalletButton',
  components: {
    Identicon,
    ConnectWalletModal,
  },
  data: (): ConnectWalletButtonData => ({
    showWallet: false,
  }),
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
    onWalletButtonClick() {
      // TODO: [vuex] unknown action type: connect
      // this.$store.dispatch('connect');
      this.showWallet = true;
    },
  },
});
</script>
