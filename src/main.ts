import App from '@/App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/ru'
import { routes } from '@/routes'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import '@/assets/styles/tailwind.css'
import '@/assets/styles/quasar-overrides.scss'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(createPinia())
app.use(createRouter({
    history: createWebHistory(),
    routes,
}))
app.use(Quasar, {  plugins: {}, lang: quasarLang } as any)
app.mount('#app')
