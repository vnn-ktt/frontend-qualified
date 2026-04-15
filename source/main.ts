import App from '@/App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/routes'
import PrimeVue from 'primevue/config'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import '@/assets/styles/app.sass'
import 'primeicons/primeicons.css'

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
app.use(PrimeVue)
app.use(ToastService)
app.component('Toast', Toast)

app.mount('#app')

