<template>
  <router-link to="/unimint">
    <div class="y3dv2-logo">
      <p>♨️</p>
    </div>
  </router-link>
</template>
<style lang="scss" scoped>
.y3dv2-logo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 25px 25px 37px 25px;
  p {
    font-size: 6rem;
    color: transparent;
    background-color: white;
    background-clip: text;
    -webkit-background-clip: text;
  }
}
</style>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Logo',
  components: {},
  methods: {},
});
</script>
