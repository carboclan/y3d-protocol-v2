<template>
  <ChevronDownIcon class="token-select-arrow" />
</template>
<style lang="scss" scoped>
.token-select-arrow {
  margin: 0px 0.25rem 0px 0.5rem;
  width: 20px;
  color: #aeaeae;
}
</style>
<script lang="ts">
import Vue from 'vue';
import { ChevronDownIcon } from 'vue-feather-icons';

export default Vue.extend({
  name: 'IconTokenSelectArrow',
  components: {
    ChevronDownIcon,
  },
});
</script>
