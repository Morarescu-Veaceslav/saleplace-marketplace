
import { useClearSessionCookieMutation, useFindProfileQuery } from "@/graphql/generated/output";
import { useEffect } from "react";
import { authStore } from "@/store/auth/auth.store";


export function useCurrent() {
    const setAuthenticated = authStore(s => s.setAuthenticated)
    const setInitialized = authStore(s => s.setInitialized)

    const { data, loading, error, refetch } = useFindProfileQuery()

    const [clear] = useClearSessionCookieMutation()

    useEffect(() => {
        if (data?.findProfile) {
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }
        setInitialized()
    }, [data])

    useEffect(() => {
        if (error) {
            clear()
            setAuthenticated(false)
            setInitialized()
        }
    }, [error])

    return {
        user: data?.findProfile,
        isLoadingProfile: loading,
        refetch
    }
}

