<template>
  <div id="app">
    <div class="app-container">
      <Header />
      <div class="ui container segment">
        <Navigation />
        <router-view />
      </div>
    </div>
    <div class="grid-wrapper">
      <div class="m-grid is-animating"></div>
    </div>
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(./assets/background/mountain-left.png),
    url(./assets/background/mountain-right.png),
    linear-gradient(#193CB1, #193CB1),
    linear-gradient(#32C5FF, #32C5FF),
    linear-gradient(#1B1B1B, #1B1B1B);
  background-size: auto calc(100% * 0.414814814814815) /* MountainLeftImg */,
    auto calc(100% * 0.414814814814815) /* MountainRightImg */,
    100% 50% /* Top background color */,
    100% 4px /* Blue line */,
    100% 50% /* Bottom background color */;
  background-position: top calc(50% - (100vh * 0.414814814814815 / 2)) left /* MountainLeftImg */,
    top calc(50% - (100vh * 0.414814814814815 / 2)) right /* MountainRightImg */,
    top center /* Top background color */,
    top calc(50% + 4px) center /* Blue line */,
    bottom center /* Bottom background color */;
}

.app-container {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.grid-wrapper {
  /*
    About z-index probrem
    Ref: https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
    Ref: https://stackoverflow.com/questions/20851452/z-index-is-canceled-by-setting-transformrotate
    Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
  */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.m-grid {
  transform: scaleY(0);
  background-image: linear-gradient(0deg, transparent 24%, rgba(34, 59, 170, 0.5) 25%,
  rgba(63, 74, 165, 0.9) 26%, transparent 27%, transparent 74%, rgba(34, 59, 170, 0.5) 75%,
  rgba(63, 74, 165, 0.9) 76%, transparent 77%, transparent),
    linear-gradient(90deg, transparent 24%, rgba(34, 59, 170, 0.75) 25%, rgba(0, 6, 59, 0.25) 26%,
    transparent 27%, transparent 74%, rgba(34, 59, 170, 0.75) 75%, rgba(0, 6, 59, 0.25) 76%,
    transparent 77%, transparent);
  background-size: 50px 50px;
  position: absolute;
  top: 53%;
  left: 50%;
  width: 200vw;
  height: 150vh;
  margin-top: -75vh;
  margin-left: -100vw;
}

/* Animation */
.m-grid.is-animating {
    animation: fly 3s linear;
    animation-iteration-count: infinite;
}
@keyframes fly {
    0% { transform: perspective(300px) rotateX(80deg) translateY(0%) }
    100% { transform: perspective(300px) rotateX(80deg) translateY(50px) }
}

@media (min-width: 1919.99px) and (max-height: 1079.99px) {
  #app {
    background-size: auto calc(100% * 0.414814814814815) /* MountainLeftImg */,
      auto calc(100% * 0.414814814814815) /* MountainRightImg */,
      100% 50% /* Top background color */,
      100% 4px /* Blue line */,
      100% 50% /* Bottom background color */;
    background-position: top calc(50% - (100vh * 0.414814814814815 / 2)) left /* MountainLeftImg */,
      top calc(50% - (100vh * 0.414814814814815 / 2)) right /* MountainRightImg */,
      top center /* Top background color */,
      top calc(50% + 4px) center /* Blue line */,
      bottom center /* Bottom background color */;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import Navigation from './components/Navigation.vue';
import Header from './components/Header.vue';

export default Vue.extend({
  components: {
    Header,
    Navigation,
  },
});
</script>
