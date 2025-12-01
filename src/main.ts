import App from '@/App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/routes'
import '@/assets/styles/app.sass'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/ru' //Rus localization
import 'quasar/src/css/index.sass' // Styles Quasar
import '@quasar/extras/material-icons/material-icons.css' // Material Quasar icons

const app = createApp(App)

app.use(createPinia())
app.use(createRouter({
    history: createWebHistory(),
    routes,
}))
app.use(Quasar, { plugins: {}, lang: quasarLang,} as any)
app.mount('#app')
