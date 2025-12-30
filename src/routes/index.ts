import HomePage from '@/pages/HomePage.vue'
import GamePage from '@/pages/GamePage.vue'

export const routes = [
    {
        path: '/', 
        name: 'home', 
        component: HomePage
    },
    {
        path: '/quiz', 
        name: 'quiz', 
        component: GamePage
    }
];