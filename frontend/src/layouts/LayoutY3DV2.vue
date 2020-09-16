<template>
  <div class="layout-y3dv2">
    <div class="app-container">
      <Header />
      <Y3DV2Logo />
      <div class="app-container-wrap">
        <div class="ui container segment ">
          <Navigation />
          <slot />
        </div>
      </div>
    </div>
    <div class="grid-wrapper">
      <div class="m-grid is-animating"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navigation from '@/components/Navigation.vue';
import Header from '@/components/Header.vue';
import { setCssVariable } from '@/utils/styles';
// eslint-disable-next-line no-unused-vars
import { ICSSVariableConfig } from '@/utils/styles/setCssVariable';
import Y3DV2Logo from '@/components/Y3DV2Logo.vue';

export interface ILayoutY3DV2Data {
  rootVariables: ICSSVariableConfig;
}

export default Vue.extend({
  name: 'LayoutY3DV2',
  components: {
    Header,
    Navigation,
    Y3DV2Logo,
  },
  data: (): ILayoutY3DV2Data => ({
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
@import '@/assets/styles/color';

.layout-y3dv2 {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('../assets/background/mountain-left.png'),
    url('../assets/background/mountain-right.png'), linear-gradient(#193cb1, #193cb1),
    linear-gradient(#32c5ff, #32c5ff), linear-gradient(#1b1b1b, #1b1b1b);
  background-size: auto calc(100% * 0.414814814814815) /* MountainLeftImg */,
    auto calc(100% * 0.414814814814815) /* MountainRightImg */, 100% 50% /* Top background color */,
    100% 4px /* Blue line */, 100% 50% /* Bottom background color */;
  background-position: top calc(50% - (100vh * 0.414814814814815 / 2)) left /* MountainLeftImg */,
    top calc(50% - (100vh * 0.414814814814815 / 2)) right /* MountainRightImg */,
    top center /* Top background color */, top calc(50% + 4px) center /* Blue line */,
    bottom center /* Bottom background color */;

  @media (min-width: 1919.99px) and (max-height: 1079.99px) {
    background-size: auto calc(100% * 0.414814814814815) /* MountainLeftImg */,
      auto calc(100% * 0.414814814814815) /* MountainRightImg */,
      100% 50% /* Top background color */, 100% 4px /* Blue line */,
      100% 50% /* Bottom background color */;
    background-position: top calc(50% - (100vh * 0.414814814814815 / 2)) left /* MountainLeftImg */,
      top calc(50% - (100vh * 0.414814814814815 / 2)) right /* MountainRightImg */,
      top center /* Top background color */, top calc(50% + 4px) center /* Blue line */,
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
    color: white;
    &-wrap {
      margin-top: 0;
      max-width: 480px;
      margin-left: auto;
      margin-right: auto;
      .ui.segment {
        border-radius: 30px;
        background-color: $y3d-black;
        color: white;
      }
    }
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
    background-image: linear-gradient(
        0deg,
        transparent 24%,
        rgba(34, 59, 170, 0.5) 25%,
        rgba(63, 74, 165, 0.9) 26%,
        transparent 27%,
        transparent 74%,
        rgba(34, 59, 170, 0.5) 75%,
        rgba(63, 74, 165, 0.9) 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        rgba(34, 59, 170, 0.75) 25%,
        rgba(0, 6, 59, 0.25) 26%,
        transparent 27%,
        transparent 74%,
        rgba(34, 59, 170, 0.75) 75%,
        rgba(0, 6, 59, 0.25) 76%,
        transparent 77%,
        transparent
      );
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
    0% {
      transform: perspective(300px) rotateX(80deg) translateY(0%);
    }
    100% {
      transform: perspective(300px) rotateX(80deg) translateY(50px);
    }
  }
}
</style>
