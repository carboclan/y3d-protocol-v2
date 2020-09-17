<template>
  <router-link to="/unimint">
    <div class="united-mint-logo">
      <img class="united-mint-logo-icon" src="@/assets/united-mint/logo.png" />
      <img class="united-mint-logo-name" src="@/assets/united-mint/UnitedMint.png" />
    </div>
  </router-link>
</template>
<style lang="scss" scoped>
.united-mint-logo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 25px 25px 37px 25px;
  &-icon {
    width: 64px;
    height: 64px;
  }
  &-name {
    margin-left: 10px;
    height: 26px;
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
