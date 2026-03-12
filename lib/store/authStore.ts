import { create } from "zustand";
import { User } from "@/types/user";

interface AuthStore {
  isAuth: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  user: null,

  setUser: (user: User) =>
    set(() => ({
      isAuth: true,
      user,
    })),

  clearIsAuthenticated: () =>
    set(() => ({
      isAuth: false,
      user: null,
    })),
}));
