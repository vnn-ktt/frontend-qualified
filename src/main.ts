import App from '@/App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/routes'

import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/ru'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import '@/assets/styles/app.sass'

const app = createApp(App)

app.use(createPinia())
app.use(createRouter({
    history: createWebHistory(),
    routes,
}))
app.use(Quasar, {
    plugins: {},
    lang: quasarLang,
    config: {
        brand: {
            primary: '#2563EB',
        }
    }} as any)
app.mount('#app')
