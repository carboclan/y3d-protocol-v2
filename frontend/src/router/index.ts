import Vue from 'vue';
import VueRouter from 'vue-router';
import Swap from '../views/Swap.vue';
import Create from '../views/Create.vue';
import Empty from '../views/Empty.vue';
import Y3DToken from '../views/Y3DToken.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Swap',
    component: Swap,
  },
  {
    path: '/swap',
    name: 'Swap',
    component: Swap,
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
  },
  {
    path: '/empty',
    name: 'Empty',
    component: Empty,
  },
  {
    path: '/y3d/:contractAddress',
    name: 'Y3DToken',
    component: Y3DToken,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/unitedmint',
    name: 'UnitedMint',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "mint" */ '../views/UnitedMint.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
