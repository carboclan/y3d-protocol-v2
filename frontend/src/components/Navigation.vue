<template>
  <div class="nav tabs">
    <router-link class="styled-navLink" v-for="route in routes" :key="route.name" :to="route.path">
      {{ route.name }}
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/color";
.tabs {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
  .styled-navLink {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    height: 3rem;
    border-radius: 3rem;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    color: $y3d-white-dark; // rgb(136, 141, 155);
    font-size: 20px;
  }
  .styled-navLink:hover {
    color: $y3d-white-hover;
  }
  .router-link-exact-active {
    color: white;
    font-weight: 500;
    font-size: 20px;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Navigation',
  data: () => ({
    routes: [
      {
        name: '兑换',
        path: '/swap',
      },
      {
        name: '治理',
        path: '/empty',
      },
      {
        name: '创建',
        path: '/create',
      },
    ],
  }),
});
</script>
