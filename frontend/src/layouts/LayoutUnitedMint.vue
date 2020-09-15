<template>
  <div class="layout-united-mint">
    <div class="app-container">
      <Header />
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import { setCssVariable } from '@/utils/styles';
// eslint-disable-next-line no-unused-vars
import { ICSSVariableConfig } from '@/utils/styles/setCssVariable';

export interface ILayoutUnitedMintData {
  rootVariables: ICSSVariableConfig
}

export default Vue.extend({
  name: 'LayoutUnitedMint',
  components: {
    Header,
  },
  data: (): ILayoutUnitedMintData => ({
    rootVariables: [
      ['--cwb-container-background-color', 'rgb(244, 207, 31)'],
      ['--cwb-container-border-radius', '4px'],
      ['--cwb-connect-button-color', 'rgb(35, 24, 21)'],
      ['--cwb-connect-button-background-color', 'rgb(244, 207, 31)'],
      ['--cwb-connect-button-border', 'none'],
      ['--cwb-connect-button-border-radius', '4px'],
      ['--cwb-connect-button-font-size', '16px'],
      ['--cwb-connect-button-box-shadow--active', 'none'],
      ['--cwb-connect-button-background-color--active', 'rgb(244, 207, 31)'],
      ['--cwb-connect-button-color--hover', 'rgba(35, 24, 21, 0.8)'],
      ['--cwb-connect-button-background-color--hover', 'rgba(244, 207, 31, 0.8)'],
      ['--cwb-connect-button-border--hover', 'none'],
      ['--cwb-connect-button-color--focus', 'rgba(35, 24, 21, 0.8)'],
      ['--cwb-connect-button-background-color--focus', 'rgba(244, 207, 31, 0.8)'],
      ['--cwb-connect-button-border--focus', 'none'],
      ['--cwb-connect-button-box-shadow--focus', 'none'],
      ['--cwb-wallet-info-wrapper-background-color', 'rgb(244, 207, 31)'],
      ['--cwb-wallet-info-wrapper-border-radius', '4px'],
      ['--cwb-wallet-info-balance-color', 'rgb(35, 24, 21)'],
      ['--cwb-wallet-info-balance-font-size', '16px'],
      ['--cwb-wallet-info-button-color', 'rgb(35, 24, 21)'],
      ['--cwb-wallet-info-button-background-color', 'rgb(244, 207, 31)'],
      ['--cwb-wallet-info-button-border', 'none'],
      ['--cwb-wallet-info-button-border-radius', '4px'],
      ['--cwb-wallet-info-button-font-size', '16px'],
    ],
  }),
  mounted() {
    setCssVariable(this.rootVariables);
  },
});
</script>

<style lang="scss" scoped>
.layout-united-mint {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #231815;
  height: 100%;
  .app-container {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
}
</style>

<style lang="scss">
body {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  &::before {
    content: '';
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url('../assets/united-mint/bg_mint.png') center 0 no-repeat;
    background-size: cover;
  }
}
</style>
