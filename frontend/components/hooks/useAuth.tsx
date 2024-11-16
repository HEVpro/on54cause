'use client'

import { useEffect, useState } from 'react'

export default function useAuth() {
    const [session, setSession] = useState<string | null>(null)
    const [userType, setUserType] = useState<string | null>(null)

    useEffect(() => {
        const loadAuthData = () => {
            const authStore = localStorage.getItem('auth_store')
            const userTypeValue = localStorage.getItem('user_type')
            if (authStore) {
                const store = JSON.parse(authStore)
                setSession(store.sessionId)
            } else {
                setSession(null)
            }
            setUserType(userTypeValue)
        }

        // Load the initial auth data on mount
        loadAuthData()

        // Listener for storage changes to update state
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'auth_store' || event.key === 'user_type') {
                loadAuthData()
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [session, userType])

    const deleteUserType = () => {
        localStorage.removeItem('user_type')
        setUserType(null)
    }

    return { session, userType, deleteUserType }
}
