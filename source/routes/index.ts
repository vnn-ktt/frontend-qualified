import HomePage from '@/pages/HomePage.vue'
import LandingPage from '@/pages/LandingPage.vue'

export const routes = [
    {
        path: '/', 
        name: 'home', 
        component: HomePage
    },
    {
        path: '/landing', 
        name: 'landing', 
        component: LandingPage
    },
];