import { authStore } from "@/store/auth/auth.store";


export function useAuth() {
    const isAuthenticated = authStore(state => state.isAuthenticated)
    const isInitialized = authStore(state => state.isInitialized)
    const setAuthenticated = authStore(state => state.setAuthenticated)

    const auth = () => setAuthenticated(true)
    const exit = () => setAuthenticated(false)

    return {
        isAuthenticated,
        isInitialized,
        auth,
        exit,
    }
}
