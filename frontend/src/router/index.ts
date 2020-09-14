import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Create from '../views/Create.vue';
import Y3DToken from '../views/Y3DToken.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'UnitedMint',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "mint" */ '../views/UnitedMint/Index.vue'),
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  {
    path: '/create',
    name: 'Create',
    component: Create,
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
  // {
  //   path: '/unitedmint',
  //   name: 'UnitedMint',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "mint" */ '../views/UnitedMint/Index.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
