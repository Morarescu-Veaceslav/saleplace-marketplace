export interface AuthStore {
    isAuthenticated: boolean
    isInitialized: boolean
    setAuthenticated: (value: boolean) => void
    setInitialized: () => void
}