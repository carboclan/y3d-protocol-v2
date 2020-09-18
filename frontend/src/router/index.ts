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
    path: '/y3dv2/govern',
    name: 'Empty',
    component: () => import(/* webpackChunkName: "empty" */ '../views/y3dv2/Govern.vue'),
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
    path: '/unimint',
    name: 'UnitedMint',
    component: () => import(/* webpackChunkName: "mint" */ '../views/UnitedMint/Index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const rootRoutes: IRootRoutes = [
  {
    name: 'Y3D v2',
    match: '/y3dv2/',
    isExternal: false,
  },
  // {
  //   name: '3D Farm',
  //   match: '/3dfarm/',
  //   isExternal: false,
  // },
  // {
  //   name: 'Y Vaults',
  //   match: '/yvaults/',
  //   isExternal: false,
  // },
  {
    name: 'United Mint',
    match: '/unimint/',
    isExternal: false,
  },
  // {
  //   name: 'Uniscam',
  //   match: '/uniscam/',
  //   isExternal: false,
  // },
  {
    name: 'DAO',
    match: 'https://y3d.vercel.app/#/y3d',
    isExternal: true,
  },
];

type IRootRoutes = Array<IRootRoute>;
interface IRootRoute {
  name: string;
  match: string;
  isExternal: boolean;
}

export { IRootRoute, IRootRoutes, rootRoutes };

export default router;
