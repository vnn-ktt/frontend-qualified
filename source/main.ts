import App from '@/App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/routes'
import ElementPlus from 'element-plus'
import '@/assets/styles/app.sass'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const user = localStorage.getItem('user_name')
    if (to.meta.requiresGuest && user) {
        next('/')
    } else if (to.meta.requiresAuth && !user) {
        next('/login')
    }
    next()
})

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
