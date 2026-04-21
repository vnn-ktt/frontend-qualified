import { computed } from "vue";
import { useStorage } from "@vueuse/core";
import type { IUser } from "@/types/user";

export const AUTH_STORAGE_KEY = "qualified-user";

const createMockUser = (overrides: Partial<IUser>): IUser => {
  const seed = overrides.name ?? overrides.email ?? "qualified-user";

  return {
    id: overrides.id ?? crypto.randomUUID(),
    name: overrides.name ?? "Qualified User",
    email: overrides.email ?? "user@qualified.dev",
    avatar:
      overrides.avatar ??
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`,
    level: overrides.level ?? 1,
    xp: overrides.xp ?? 0,
    token: overrides.token ?? `qualified-token-${Date.now()}`,
  };
};

export function useAuth() {
  const user = useStorage<IUser | null>(AUTH_STORAGE_KEY, null);

  const isAuthenticated = computed(() => Boolean(user.value?.token));
  const userLevel = computed(() => user.value?.level ?? 1);
  const userXP = computed(() => user.value?.xp ?? 0);

  const login = async (email: string, _password: string): Promise<IUser> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const nameFromEmail = email.split("@")[0] || "Qualified User";
    const nextUser = createMockUser({
      email,
      name: nameFromEmail
        .split(/[._-]/g)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      level: user.value?.level ?? 1,
      xp: user.value?.xp ?? 180,
    });

    user.value = nextUser;
    return nextUser;
  };

  const register = async (
    username: string,
    email: string,
    _password: string
  ): Promise<IUser> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const nextUser = createMockUser({
      email,
      name: username,
      level: 1,
      xp: 0,
    });

    user.value = nextUser;
    return nextUser;
  };

  const logout = () => {
    user.value = null;
  };

  const updateUser = (updates: Partial<IUser>) => {
    if (!user.value) return;

    user.value = {
      ...user.value,
      ...updates,
    };
  };

  const addXP = (amount: number) => {
    if (!user.value) return;

    const nextXP = user.value.xp + amount;
    const nextLevel = Math.floor(nextXP / 1000) + 1;

    user.value = {
      ...user.value,
      xp: nextXP,
      level: Math.max(user.value.level, nextLevel),
    };
  };

  return {
    user,
    isAuthenticated,
    userLevel,
    userXP,
    login,
    register,
    logout,
    updateUser,
    addXP,
  };
}
