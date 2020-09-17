<template>
  <button class="c-fill-max-button" @click="$emit('click')">MAX</button>
</template>
<style lang="scss" scoped>
.c-fill-max-button {
  height: 28px;
  background-color: rgba(21, 61, 111, 0.44);
  border: 1px solid rgba(21, 61, 111, 0.44);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: rgb(109, 168, 255);
  user-select: none;
  letter-spacing: -0.018em;
  &:focus {
    outline: none;
  }
  &:hover {
    border: 1px solid rgb(33, 114, 229);
  }
}
</style>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FillMaxButton',
});
</script>
