import HomeView from '@/views/HomeView.vue'
import QuizView from '@/views/QuizView.vue'

export const routes = [
    {path: '/', name: 'home', component: HomeView},
    {path: '/quiz', name: 'quiz', component: QuizView}
];