export const routes = [
    {
        path: '/landing', 
        name: 'landing', 
        component: () => import('@/pages/LandingPage.vue')
    },
    {
        path: '/', 
        name: 'home', 
        component: () => import('@/pages/HomePage.vue'),
        meta: {
            title: 'Home | Qualified',
            requiresAuth: true,    // only for authorized
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/AuthPage.vue'),
        meta: {
            title: 'Login | Qualified',
            requiresGuest: true,    // only for unauthorized
            authMode: 'login'       // mark as login
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/AuthPage.vue'),
        meta: {
            title: 'Register | Qualified',
            requiresGuest: true,    // only for unauthorized
            authMode: 'register'    // mark as register
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/landing'
    }
];