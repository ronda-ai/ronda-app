
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserRole = 'teacher' | 'guardian';

interface User {
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true, // Start with loading true
      login: user => {
        set({user, isAuthenticated: true, isLoading: false});
      },
      logout: () => {
        set({user: null, isAuthenticated: false, isLoading: false});
      },
      setIsLoading: isLoading => {
        set({isLoading});
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
