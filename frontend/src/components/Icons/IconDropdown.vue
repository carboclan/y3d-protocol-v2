<template>
  <ChevronDownIcon />
</template>
<style lang="scss" scoped></style>
<script lang="ts">
import Vue from 'vue';
import { ChevronDownIcon } from 'vue-feather-icons';

export default Vue.extend({
  name: 'IconDropdown',
  components: {
    ChevronDownIcon,
  },
});
</script>
