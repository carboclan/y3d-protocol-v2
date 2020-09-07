<template>
    <div class="nav tabs">
        <router-link class="styled-navLink"
            v-for="route in routes" :key="route.name"
            :to="route.path">
            {{route.name}}
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
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
  color: rgb(136, 141, 155);
  font-size: 20px;
  }
  .router-link-exact-active {
      color: black;
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
        name: 'Home',
        path: '/',
      },
      {
        name: 'Create',
        path: '/create',
      },
      {
        name: 'United Mint (Beta)',
        path: '/unitedmint',
      },
    ],
  }),
});
</script>
