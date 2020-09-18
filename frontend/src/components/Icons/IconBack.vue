<template>
  <ArrowLeftIcon class="c-back-icon" />
</template>
<style lang="scss" scoped>
.c-back-icon {
  width: 24px;
  height: 24px;
}
</style>
<script lang="ts">
import Vue from 'vue';
import { ArrowLeftIcon } from 'vue-feather-icons';

export default Vue.extend({
  name: 'IconBack',
  components: {
    ArrowLeftIcon,
  },
});
</script>
