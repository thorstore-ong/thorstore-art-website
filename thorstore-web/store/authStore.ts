import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

interface AuthUser {
    email: string;
    role: string;
}

interface AuthStore {
    user: AuthUser | null;
    token: string | null;
    setAuth: (user: AuthUser, token: string) => void;
    clearAuth: () => void;
    isAdmin: () => boolean;
}

const noopStorage = {
  getItem: (_name: string) => null,
  setItem: (_name: string, _value: string) => {},
  removeItem: (_name: string) => {},
}

export const useAuthStore = create<AuthStore>()(
    persist(
       (set, get) => ({
      user: null,
      token: null,

      setAuth: (user, token) => {
        set({ user, token });
      },

      clearAuth: () => {
        set({ user: null, token: null });
      },

      isAdmin: () => get().user?.role === "Admin",
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : noopStorage
      ),
    }
   )
);