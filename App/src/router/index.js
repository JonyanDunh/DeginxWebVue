import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/Welcome/WelcomeView.vue'
import LoginView from '../views/User/LoginView.vue'
import ConsoleView from '../views/Console/ConsoleView.vue'
import ToolsView from '../views/Tools/ToolsView.vue'
import VueCookies from 'vue-cookies'
import axios from 'axios';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
      meta: { transition: 'slide-left' }
    }, {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { transition: 'slide-right' }
    }, {
      path: '/console',
      name: 'console',
      component: ConsoleView,
      meta: { transition: 'slide-right', requireAuth: true }
    }, {
      path: '/tools',
      name: 'tools',
      component: ToolsView,
      meta: { transition: 'slide-right'}
    }
  ],
})
router.beforeEach((to, from, next) => {


  if (to.meta.requireAuth) {
    if (VueCookies.get("is_login") == 'true') {
      next()
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
})
export default router
