import { create } from 'zustand';

interface User {
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isOpenSignIn: boolean;
  isOpenSignUp: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (val?: boolean) => void;
  setUser: (user: User) => void;
  logout: () => void;
  toggleSignIn: (val?: boolean) => void;
  toggleSignUp: (val?: boolean) => void;
}

const zustandStore = create<AuthStore>()((set) => ({
  user: null,
  isOpenSignIn: false,
  isOpenSignUp: false,
  isAuthenticated: !!localStorage.getItem("token"),
  setIsAuthenticated: (val) => set({ isAuthenticated: val }),
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false, user: null });
  },
  toggleSignIn: (val) =>
    set((state) => ({ isOpenSignIn: val ?? !state.isOpenSignIn })),
  toggleSignUp: (val) =>
    set((state) => ({ isOpenSignUp: val ?? !state.isOpenSignUp })),
}));

export default zustandStore;