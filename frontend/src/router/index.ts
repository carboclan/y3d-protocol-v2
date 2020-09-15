import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/y3dv2/swap',
  },
  {
    path: '/y3dv2',
    redirect: '/y3dv2/swap',
  },
  {
    path: '/y3dv2/swap',
    name: 'Swap',
    component: () => import(/* webpackChunkName: "swap" */ '../views/y3dv2/Swap.vue'),
  },
  {
    path: '/y3dv2/empty',
    name: 'Empty',
    component: () => import(/* webpackChunkName: "empty" */ '../views/y3dv2/Empty.vue'),
  },
  {
    path: '/y3dv2/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "create" */ '../views/y3dv2/Create.vue'),
  },
  {
    path: '/y3d/:contractAddress',
    name: 'Y3DToken',
    component: () => import(/* webpackChunkName: "y3dtoken" */ '../views/y3dv2/Y3DToken.vue'),
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/unitedmint',
    name: 'UnitedMint',
    component: () => import(/* webpackChunkName: "mint" */ '../views/UnitedMint.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
