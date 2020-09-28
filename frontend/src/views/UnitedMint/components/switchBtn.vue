<template>
  <div class="switch-content">
    <span>{{ $t('um.mode') }}</span>
    <span> ({{showExpert?$t('um.on'):$t('um.off')}}) </span>
    <button
      class="radio"
      v-on:click="btnClick"
      :class="showExpert?'radioB':'radioA'"
    >
      <span class="circle" :class="showExpert?'circleB':'circleA'"></span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'switchBtn',
  data() {
    return {};
  },
  props: {
    showExpert: {
      type: Boolean,
      default: false,
    },
    btnClick: {
      type: Function,
      defualt: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
  .switch-content {
    max-width: 880px;
    width: 100%;
    margin-bottom: 28px;
    span {
      font-size: 18px;
      margin: 0;
    }
    span:first-child {
      font-weight: bold;
    }
    .radio {
      width: 44px;
      height: 23px;
      padding: 0;
      border: none;
      outline: none;
      line-height: 23px;
      position: relative;
      vertical-align: middle;
      border-radius: 22px;
      .circle {
        position: absolute;
        left: 0;
        top: 0;
        height: 22px;
        width: 22px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
      }
      .circleA {
        left: 0;
        transition: all 0.3s;
        --webkit-transition: all 0.3s;
      }
      .circleB {
        left: 22px;
        transition: all 0.2s ease-in-out;
      }
    }
    .radioA {
      background-color: rgba(0, 0, 0, 0.25);
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
    .radioB {
      background-color: #1890ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }
</style>
