import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';

/****************/
/**** ROUTES ****/
/****************/
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ViewHomepage',
    component: () => import('../views/Homepage/index.vue'),
  },
  {
    path: '/settings',
    name: 'ViewSettings',
    component: () => import('../views/Homepage/index.vue'),
  },
]

/****************/
/**** ROUTER ****/
/****************/
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;