export enum RouteNames {
  Home = "home",
  Login = "login",
  Register = "register",
  Landing = "landing",
}

export const RouteItems = {
  home: "/",
  login: "/login",
  register: "/register",
  landing: "/landing",
} as const;

export type AuthMode = "login" | "register";

export interface RouteMeta {
  title?: string;
  requiresAuth?: boolean;
  requiresGuest?: boolean;
  authMode?: AuthMode;
  [key: string]: unknown;
}
