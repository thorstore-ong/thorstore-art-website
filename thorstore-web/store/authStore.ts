import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// This describes the shape of the logged-in user we care about
// We don't store the whole User model — just what the UI needs
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

// create() is Zustand's way of making a store
export const useAuthStore = create<AuthStore>()(

  // persist() is a Zustand middleware (a wrapper)
  persist(
    (set, get) => ({
      // Initial state — nobody is logged in
      user: null,
      token: null,

      // Call this after a successful login or register API call
      // set() is how you update state in Zustand — like setState in React
      setAuth: (user, token) => {
        // Also put the token in localStorage so the axios interceptor can find it
        localStorage.setItem('token', token);
        set({ user, token });
      },

      // Call this when the user clicks logout
      clearAuth: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },

      // get() reads the current state from inside the store
      isAdmin: () => get().user?.role === 'Admin',
    }),

    // This is the config for the persist middleware
    {
      name: 'auth-storage',
    }
  )
);