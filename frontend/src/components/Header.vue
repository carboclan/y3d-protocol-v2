<template>
  <header class="header">
    <nav class="header-left">
      <router-link class="header-left-link" to="/">
        <p>♨️</p>
        <p>Y3D.Finance</p></router-link
      >
    </nav>
    <div class="header-center">
      <ul class="header-center-nav">
        <li class="header-center-nav-item" v-for="route in rootRoutes" :key="route.name">
          <router-link :to="route.match" v-if="!route.isExternal"
            ><span>{{ route.name }}</span></router-link
          >
          <a v-else :href="route.match"
            ><span>{{ route.name }}</span></a
          >
        </li>
      </ul>
    </div>
    <div class="header-right">
      <ConnectWalletButton />
      <div class="hic-operating">
        <div class="hico-setting">
          <button
            id="open-settings-dialog-button"
            class="hicos-button"
            @click.stop="clickOnSettings"
          >
            <IconSettings />
          </button>
          <SettingsModal v-model="showSettings" />
        </div>
        <div class="hico-setting">
          <button class="hicos-button" @click.stop="clickOnAboutMenu">
            <IconMoreHorz />
          </button>
          <AboutMenu v-if="showAboutMenu" />
        </div>
      </div>
    </div>
    <div class="header-phone-center">
      <ul class="header-center-nav">
        <li class="header-center-nav-item" v-for="route in rootRoutes" :key="route.name">
          <router-link :to="route.match" v-if="!route.isExternal"
            ><span>{{ route.name }}</span></router-link
          >
          <a v-else :href="route.match"
            ><span>{{ route.name }}</span></a
          >
        </li>
      </ul>
    </div>
  </header>
</template>
<style lang="scss" scoped>
@media (max-width: 600px) {
  .header {
    flex-wrap: wrap;
  }
  .header-center {
    display: none !important;
  }
  .header-left {
    flex-shrink: 0;
    width: 50%;
    &-link {
      p {
        font-size: 16px !important;
      }
    }
  }
  .header-right {
    width: 50%;
    justify-content: flex-end;
  }
  .header-phone-center {
    display: block !important;
    width: 100%;
    margin-top: 20px;
  }
  .header-center-nav {
    padding: 0;
    justify-content: center;
  }
}
.header-phone-center {
  display: none;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 25px;
  &-left,
  &-right,
  &-center {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-left {
    display: flex;
    align-items: center;
    &-link {
      display: flex;
      align-items: center;
    }
    p {
      color: white;
    }
    p {
      font-size: 24px;
      font-weight: 500;
      margin: 0;
    }
    p:first-of-type {
      margin-right: 9px;
    }
  }
  &-center-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-center-nav {
    margin: 0;
    &-item {
      padding-left: 16px;
      padding-right: 16px;
      list-style-type: none;
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
          span {
            padding-bottom: 4px;
            border-bottom: 2px solid white;
          }
        }
      }
    }
  }
  &-right {
    .hic-operating {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
    }
    .hico-setting {
      margin-left: 0.5rem;
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      position: relative;
      border: none;
      text-align: left;
    }
    .hicos-button {
      outline: none;
      position: relative;
      width: 100%;
      border: none;
      margin: 0px;
      height: 35px;
      background-color: rgb(64, 68, 79);
      padding: 0.15rem 0.5rem;
      border-radius: 0.5rem;
      user-select: none;
      color: rgb(255, 255, 255);
      font: 400 13.3333px Arial;
      &:hover {
        cursor: pointer;
        outline: none;
        background-color: rgb(86, 90, 105);
      }
      svg {
        height: 20px;
        width: 20px;
        margin-top: 2px;
        stroke: rgb(255, 255, 255);
      }
    }
  }
}
</style>
<script lang="ts">
import Vue from 'vue';
// eslint-disable-next-line no-unused-vars
import { IRootRoutes, rootRoutes } from '@/router';
import ConnectWalletButton from './ConnectWalletButton.vue';
import IconSettings from './Icons/IconSettings.vue';
import IconMoreHorz from './Icons/IconMoreHorz.vue';
import AboutMenu from './AboutMenu.vue';
import SettingsModal from './SettingsModal.vue';

export interface IHeaderData {
  rootRoutes: IRootRoutes;
  showSettings: Boolean;
  showAboutMenu: Boolean;
}

export default Vue.extend({
  name: 'Header',
  components: {
    ConnectWalletButton,
    IconSettings,
    IconMoreHorz,
    SettingsModal,
    AboutMenu,
  },
  data: (): IHeaderData => ({
    rootRoutes,
    showSettings: false,
    showAboutMenu: false,
  }),
  methods: {
    clickOnSettings() {
      this.showAboutMenu = false;
      this.showSettings = true;
    },
    clickOnAboutMenu() {
      this.showSettings = false;
      this.showAboutMenu = !this.showAboutMenu;
    },
  },
});
</script>
