import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Global from "./Global.vue";

import VueCookies from 'vue-cookies'

const app = createApp(App)
app.config.globalProperties.$GLOBAL = Global
app.config.globalProperties.$cookies = VueCookies

app.use(router)
app.mount('#app')


