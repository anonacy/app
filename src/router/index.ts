import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/domains'
  },
  {
    path: '/domains',
    component: () => import ('../views/DomainsPage.vue')
  },
	{
    path: '/endpoints',
    component: () => import ('../views/EndpointsPage.vue')
  },
	{
    path: '/aliases',
    component: () => import ('../views/AliasesPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
