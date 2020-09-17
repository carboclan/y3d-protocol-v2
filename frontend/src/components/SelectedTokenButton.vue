<template>
  <button v-if="!isTokenSelected" @click="$emit('click')" class="token-not-select-button">
    <span class="token-select-symbol">
      <span class="token-not-select-button-text">Select a token</span>
      <ChevronDownIcon class="token-not-select-button-icon" />
    </span>
  </button>
  <button v-else class="token-select open-currency-select-button" @click="$emit('click')">
    <span class="token-select-symbol">
      <img :src="tokenLogo" class="token-select-symbol-logo" alt="Token logo" />
      <span class="token-select-token token-symbol-container">
        <slot></slot>
      </span>
      <IconTokenSelectArrow />
    </span>
  </button>
</template>
<script lang="ts">
import Vue from 'vue';
import IconTokenSelectArrow from '@/components/Icons/IconTokenSelectArrow.vue';
import { ChevronDownIcon } from 'vue-feather-icons';

export default Vue.extend({
  name: 'SelectdTokenButton',
  components: {
    IconTokenSelectArrow,
    ChevronDownIcon,
  },
  props: {
    tokenLogo: {
      type: String,
      default: '',
    },
    isTokenSelected: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style lang="scss" scoped>
.token-select {
  -webkit-box-align: center;
  align-items: center;
  height: 2.2rem;
  font-size: 20px;
  font-weight: 500;
  background-color: rgb(33, 36, 41);
  color: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0px 0.5rem;
  letter-spacing: -0.018em;
  &:hover {
    background-color: rgb(44, 47, 54);
  }
}
.token-select-symbol {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.token-select-symbol-logo {
  width: 24px;
  height: 24px;
  box-shadow: rgba(0, 0, 0, 0.075) 0px 6px 10px;
  border-radius: 24px;
}
.token-select-token {
  margin: 0px 0.25rem 0px 0.75rem;
  font-size: 20px;
}
.token-not-select-button {
  -webkit-box-align: center;
  align-items: center;
  height: 2.2rem;
  font-size: 20px;
  font-weight: 500;
  background-color: rgb(33, 114, 229);
  color: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.075) 0px 6px 10px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0px 0.5rem;
  &-text {
    margin: 0px 0.25rem;
    font-size: 16px;
  }
  &-icon {
    margin: 0px 0.25rem 0px 0px;
    height: 35%;
  }
}
</style>
