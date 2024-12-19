import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { initializeKeycloak } from '../services/keycloak'
import { app } from '../main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    const keycloak = await initializeKeycloak();
    if (keycloak?.authenticated) {
      app.provide('keycloak', keycloak);
      return true
    }
  } else return true
})

export default router
