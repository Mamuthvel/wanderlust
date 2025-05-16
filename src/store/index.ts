import { create } from 'zustand';
import { persist } from "zustand/middleware";
interface User {
    name: String,
    email: String
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
const zustandStore = create<AuthStore>()(
    // persist(
    (set) => ({
        user: null,
        isOpenSignIn: false,
        isOpenSignUp: false,
        isAuthenticated: !!localStorage.getItem("token"),
        setIsAuthenticated: (val) => set({ isAuthenticated: val }),
        setUser: (user: User) => set({ user }),
        logout: () => {
            // zustandStore.persist.clearStorage()
            localStorage.clear();
        },
        toggleSignIn: (val) => set((state) => ({ isOpenSignIn: val ?? !state.isOpenSignIn })),
        toggleSignUp: (val) => set((state) => ({ isOpenSignUp: val ?? !state.isOpenSignUp })),
    }),
    //     {
    //         name: 'token'
    //     }
    // )
);

export default zustandStore;