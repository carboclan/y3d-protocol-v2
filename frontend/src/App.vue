<template>
  <div id="app">
    <div class="app-container">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
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
import Header from './components/Header.vue';

export default Vue.extend({
  components: {
    Header,
  },
});
</script>
