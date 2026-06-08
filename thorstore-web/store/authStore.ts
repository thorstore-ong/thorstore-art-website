import {create} from 'zustand';
import {persist} from 'zustand/middleware';

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

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
        //Initial state - no user is logged in
        user: null,
        token: null,

        // Calling this function will set the user and token in both state and localStorage
        setAuth: (user, token) => 
        {
            localStorage.setItem('token', token);
            set({ user, token });
        },

        // For when the user logs out - clear the token and user from both state and localStorage
        clearAuth: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            set({ user: null, token: null });
        },

        // Helper function to check if the logged-in user is an admin
        isAdmin: () => get().user?.role === 'Admin',
    }),
    { 
        name: 'auth-storage',
    }
   )
);