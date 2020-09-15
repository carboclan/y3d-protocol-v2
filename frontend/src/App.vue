<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
body:before{
  content: '';
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url(./assets/united-mint/bg_mint.png) center 0 no-repeat;
  background-size: cover;
}
body{
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
}
#app {
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

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

});
</script>
