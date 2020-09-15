<template>
  <header class="header">
    <nav class="header-left">
      <ul class="header-nav">
        <li class="header-nav-item" v-for="route in rootRoutes" :key="route.name">
          <router-link :to="route.match">{{ route.name }}</router-link>
        </li>
      </ul>
    </nav>
    <div class="header-right">
      <ConnectWalletButton />
    </div>
  </header>
</template>
<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
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
}
</style>
<script lang="ts">
import Vue from 'vue';
import ConnectWalletButton from './ConnectWalletButton.vue';

export type IRootRoutes = Array<IRootRoute>;
export interface IRootRoute {
  name: string;
  match: string;
  isExternal: boolean;
}
export interface IHeaderData {
  rootRoutes: IRootRoutes;
}

export default Vue.extend({
  name: 'Header',
  components: {
    ConnectWalletButton,
  },
  data: (): IHeaderData => ({
    rootRoutes: [
      {
        name: 'Y3D v2',
        match: '/y3dv2/',
        isExternal: false,
      },
      {
        name: '3D Farm',
        match: '/3dfarm/',
        isExternal: false,
      },
      {
        name: 'Y Vaults',
        match: '/yvaults/',
        isExternal: false,
      },
      {
        name: 'United Mint',
        match: '/unimint/',
        isExternal: false,
      },
      {
        name: 'Uniscam',
        match: '/uniscam/',
        isExternal: false,
      },
      {
        name: 'DAO',
        match: '/dao/',
        isExternal: false,
      },
    ],
  }),
});
</script>
