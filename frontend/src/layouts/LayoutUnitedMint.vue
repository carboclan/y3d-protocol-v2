<template>
  <div class="layout-united-mint">
    <div class="app-container">
      <Header>
        <template v-slot:logo>
          <router-link to="/unimint">
            <div class="header-logo">
              <img class="header-logo-icon" src="@/assets/united-mint/logo.png" />
              <img class="header-logo-name" src="@/assets/united-mint/UnitedMint.png" />
            </div>
          </router-link>
        </template>
      </Header>
      <UnitedMintLogo />
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
import UnitedMintLogo from '@/components/UnitedMintLogo.vue';

export interface ILayoutUnitedMintData {
  rootVariables: ICSSVariableConfig;
}

export default Vue.extend({
  name: 'LayoutUnitedMint',
  components: {
    Header,
    UnitedMintLogo,
  },
  data: (): ILayoutUnitedMintData => ({
    rootVariables: [
      ['--cwb-container-background-color', 'rgb(33, 36, 41)'],
      ['--cwb-container-border-radius', '12px'],
      ['--cwb-connect-button-color', 'rgb(109, 168, 255)'],
      ['--cwb-connect-button-background-color', 'rgba(21, 61, 111, 0.44)'],
      ['--cwb-connect-button-border', 'solid 1px rgba(21, 61, 111, 0.44)'],
      ['--cwb-connect-button-border-radius', '12px'],
      ['--cwb-connect-button-font-size', '16px'],
      ['--cwb-connect-button-box-shadow--active', 'rgba(55, 107, 173, 0.44) 0px 0px 0px 1pt'],
      ['--cwb-connect-button-background-color--active', 'rgba(55, 107, 173, 0.44)'],
      ['--cwb-connect-button-color--hover', 'rgb(83, 153, 255)'],
      ['--cwb-connect-button-background-color--hover', 'rgba(55, 107, 173, 0.44)'],
      ['--cwb-connect-button-border--hover', 'solid 1px rgba(49, 95, 154, 0.44)'],
      ['--cwb-connect-button-color--focus', 'rgb(83, 153, 255)'],
      ['--cwb-connect-button-background-color--focus', 'rgba(55, 107, 173, 0.44)'],
      ['--cwb-connect-button-border--focus', 'solid 1px rgba(49, 95, 154, 0.44)'],
      ['--cwb-connect-button-box-shadow--focus', 'rgba(55, 107, 173, 0.44) 0px 0px 0px 1pt'],
      ['--cwb-wallet-info-wrapper-background-color', 'rgb(64, 68, 79)'],
      ['--cwb-wallet-info-wrapper-border-radius', '12px'],
      ['--cwb-wallet-info-balance-color', '#ffffff'],
      ['--cwb-wallet-info-balance-font-size', '16px'],
      ['--cwb-wallet-info-button-color', '#ffffff'],
      ['--cwb-wallet-info-button-background-color', 'rgb(44, 47, 54)'],
      ['--cwb-wallet-info-button-border', 'solid 1px rgb(64, 68, 79)'],
      ['--cwb-wallet-info-button-border-radius', '12px'],
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
.header-logo {
  margin-right: 32px;
  &-icon {
    width: 64px;
    height: 64px;
  }
  &-name {
    margin-left: 10px;
    height: 26px;
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
