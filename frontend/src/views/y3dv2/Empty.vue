<template>
<LayoutUniscam>
  <div class="empty">
    <h1>This is an empty page</h1>
  </div>
  </LayoutUniscam>
</template>
<script lang="ts">
import Vue from 'vue';
import LayoutUniscam from '@/layouts/LayoutUniscam.vue';

export default Vue.extend({
  components: {
    LayoutUniscam,
  },
});
</script>
