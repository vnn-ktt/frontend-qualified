import HomePage from '@/pages/HomePage.vue'
import QuizPage from '@/pages/QuizPage.vue'

export const routes = [
    {path: '/', name: 'home', component: HomePage},
    {path: '/quiz', name: 'quiz', component: QuizPage}
];