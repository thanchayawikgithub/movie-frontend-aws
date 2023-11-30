import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import movieRoutes from './movieRoutes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    ...movieRoutes
  ]
})

export default router
