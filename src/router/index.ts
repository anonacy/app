import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { apikey } from '../state/state';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/domains'
  },
  {
    path: '/start',
    component: () => import ('../views/StartPage.vue')
  },
  {
    path: '/domains',
    component: () => import ('../views/ListPage.vue')
  },
	{
    path: '/endpoints',
    component: () => import ('../views/ListPage.vue')
  },
	{
    path: '/aliases',
    component: () => import ('../views/ListPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (!apikey.value && to.path !== '/start') {
    next('/start'); // Redirect to /start
  } else {
    next();
  }
});

export default router
