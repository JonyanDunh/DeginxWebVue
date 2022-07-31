import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/Welcome/WelcomeView.vue'
import LoginView from '../views/User/LoginView.vue'
import ConsoleView from '../views/Console/ConsoleView.vue'
import ToolsView from '../views/Tools/ToolsView.vue'
import ToolsItem from '../views/Tools/ToolsItem.vue'
import VueCookies from 'vue-cookies'
import BilibiliLiveDynamicCover from '../views/Tools/SubPage/ae6d6050-5de5-40f2-8350-52532e6afbe2.vue'
import { useRoute } from 'vue-router'
import axios from 'axios';
const route = useRoute()
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: ToolsView,
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
    },
    {
      path: '/tools',
      name: 'tools',
      /*component: () => {
        console.log(getQueryVariable("ItemUUID"))
        if (getQueryVariable("ItemUUID") == false || getQueryVariable("ItemUUID") == ""|| getQueryVariable("ItemUUID") == null)
          return ToolsView
        else
          return import(`../views/Tools/SubPage/${getQueryVariable("ItemUUID")}.vue`)
      },*/
      component:ToolsView,
      meta: { transition: 'slide-right' }
    }, {
      path: '/tools-ae6d6050-5de5-40f2-8350-52532e6afbe2',
      name: 'BilibiliLiveDynamicCover',
      component: BilibiliLiveDynamicCover,
      meta: { transition: 'slide-right' }

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
