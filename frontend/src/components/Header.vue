<template>
  <header class="header">
    <nav class="header-left">
      <ul class="header-nav">
        <li class="header-nav-item" v-for="route in rootRoutes" :key="route.name">
          <router-link :to="route.match">{{ route.name }}</router-link>
        </li>
      </ul>
    </nav>
    <!-- <div class="header-left">
      <router-link to="/">
        <div class="header-logo">
          <img class="header-logo-icon" src="@/assets/united-mint/logo.png" />
          <img class="header-logo-name" src="@/assets/united-mint/UnitedMint.png" />
        </div>
      </router-link>
    </div> -->
    <div class="header-right">
      <ConnectWalletButton />
    </div>
  </header>
</template>
<style lang="scss" scoped>
@media (max-width: 500px) {
  .header {
    &-logo-name {
      display: none;
    }
  }
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 25px;
  &-left,
  &-right,
  &-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-nav {
    margin: 0;
    &-item {
      padding-left: 16px;
      padding-right: 16px;
      &:first-of-type {
        padding-left: 0px;
      }
      a {
        color: #6c7284;
        font-size: 16px;
        font-weight: bold;
        text-decoration: none;
        &:hover,
        &:active,
        &.router-link-active {
          color: #ffffff;
          text-decoration: none;
        }
      }
    }
  }
  &-logo {
    &-icon {
      width: 64px;
      height: 64px;
    }
    &-name {
      margin-left: 10px;
      height: 26px;
    }
  }
}
</style>
<script lang="ts">
import Vue from 'vue';
// eslint-disable-next-line no-unused-vars
import { IRootRoutes, rootRoutes } from '@/router';
import ConnectWalletButton from './ConnectWalletButton.vue';

export interface IHeaderData {
  rootRoutes: IRootRoutes;
}

export default Vue.extend({
  name: 'Header',
  components: {
    ConnectWalletButton,
  },
  data: (): IHeaderData => ({
    rootRoutes,
  }),
});
</script>
