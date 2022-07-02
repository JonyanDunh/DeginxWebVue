import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import LoginView from '../views/LoginView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
      meta: { transition: 'slide-left' }
    },{
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { transition: 'slide-right' }
    }
  ]
})

export default router
