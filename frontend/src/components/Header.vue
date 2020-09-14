<template>
  <header class="header">
    <div class="header-left">
      <router-link to="/">
        <div class="header-logo">
          <img class="header-logo-icon" src="@/assets/united-mint/logo.png" />
          <img class="header-logo-name" src="@/assets/united-mint/UnitedMint.png" />
        </div>
      </router-link>
    </div>
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
  &-right {
    display: flex;
    flex-direction: row;
    align-items: center;
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
import ConnectWalletButton from './ConnectWalletButton.vue';

export default Vue.extend({
  name: 'Header',
  components: {
    ConnectWalletButton,
  },
});
</script>
