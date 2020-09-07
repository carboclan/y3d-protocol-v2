<template>
  <header class="header">
    <div class="header-left">
      <a class="header-logo" href="/">Y3D v2</a>
    </div>
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
  &-right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-logo {
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    &:hover,
    &:active {
      color: #ffffff;
      text-decoration: none;
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
