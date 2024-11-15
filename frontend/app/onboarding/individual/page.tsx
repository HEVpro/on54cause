'use client'
import { useWeb3AuthProvider } from '@/lib/auth/authProvider'
import { web3auth } from '@/lib/auth/provider'
import { IProvider, WALLET_ADAPTERS } from '@web3auth/base'
import { useState, useEffect } from 'react'

export default function Page() {
    const { provider, login } = useWeb3AuthProvider()

    return (
        <div className="w-full flex items-center justify-between px-8">
            <div className="w-1/2"></div>
            <div className="w-1/2">
                <button onClick={login} className="card">
                    Login
                </button>
            </div>
        </div>
    )
}
