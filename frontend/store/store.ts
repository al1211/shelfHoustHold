import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  name: string;
  email: string;
  household?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      setAuth: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);