'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { AuthStore } from './auth.types'

export const authStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            isInitialized: false,
            setAuthenticated: (value) => set({ isAuthenticated: value }),
            setInitialized: () => set({ isInitialized: true }),
        }),
        {
            name: 'auth',
            storage: createJSONStorage(() => localStorage)
        }
    )
)
