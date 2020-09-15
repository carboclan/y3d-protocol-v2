<template>
  <button
    :id="id"
    type='button'
    class="c-main-button"
    :disabled="disabled"
    v-loading="btnLoading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    @click="$emit('click')"
  >
    <div class="c-main-button-text">
      <slot></slot>
    </div>
  </button>
</template>
<style lang="scss" scoped>
.c-main-button {
  overflow: hidden;
  font-size: inherit;
  position: relative;
  z-index: 1;
  padding: 18px;
  width: 100%;
  font-weight: 500;
  text-align: center;
  border-radius: 20px;
  text-decoration: none;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-wrap: nowrap;
  -webkit-box-align: center;
  align-items: center;

  background-color: #2172e5;
  color: white;
  cursor: auto;
  box-shadow: none;
  border: 1px solid transparent;
  outline: none;
  opacity: 1;
  user-select: none;

  &:disabled {
    background-color: rgb(64, 68, 79);
    color: rgb(108, 114, 132);
  }

  &:active {
    filter: brightness(0.8);
  }
}
.c-main-button-text {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-size: 20px;
  font-weight: 500;
  user-select: none;
}
</style>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MainButton',
  props: {
    id: {
      type: String,
      default: 'main-button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    btnLoading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
