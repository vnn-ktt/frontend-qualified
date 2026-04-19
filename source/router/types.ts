export enum RouteNames {
    Home = 'home',
    Login = 'login',
    Register = 'register',
    Landing = 'landing'
}

export const RouteItems = {
    home: '/',
    login: '/login',
    register: '/register',
    landing: '/landing'
}

export interface RouteMeta {
    title?: string
    requiresAuth?: boolean,
    requiresGuest?: boolean,
    [key: string]: unknown
}