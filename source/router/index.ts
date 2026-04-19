import { RouteNames, RouteItems, RouteMeta } from '@/router/types';

export const routes = [
    {
        path: RouteItems.landing, 
        name: RouteNames.Landing, 
        component: () => import('@/pages/LandingPage.vue')
    },
    {
        path: RouteItems.home, 
        name: RouteNames.Home, 
        component: () => import('@/pages/HomePage.vue'),
        meta: {
            title: 'Home | Qualified',
            requiresAuth: true,
        } satisfies RouteMeta,
        children: [
            {
                path: RouteItems.login,
                name: RouteNames.Login,
                component: () => import('@/pages/AuthPage.vue'),
                meta: {
                    title: 'Login | Qualified',
                    requiresGuest: true,
                    authMode: 'login' 
                }
            },
            {
                path: RouteItems.register,
                name: RouteNames.Register,
                component: () => import('@/pages/AuthPage.vue'),
                meta: {
                    title: 'Register | Qualified',
                    requiresGuest: true,
                    authMode: 'register' 
                }
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: RouteItems.landing
    }
];