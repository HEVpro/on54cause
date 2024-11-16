'use client'
import { Button } from '@/components/ui/button'
import { useWeb3AuthNoModalProvider } from '@/lib/auth/web3AuthNoModalProvider'
import { IProvider, WALLET_ADAPTERS } from '@web3auth/base'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function IndividualOnboarding() {
    const searchParams = useSearchParams()
    const isFromOnBoarding = searchParams.get('isFromOnBoarding')
    const { login, loggedIn } = useWeb3AuthNoModalProvider()
    const [isBeingRedirected, setIsBeingRedirected] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (loggedIn && !isBeingRedirected) {
            router.push('/events')
        }
    }, [loggedIn, router])

    useEffect(() => {
        if (isFromOnBoarding !== 'true') {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <div className="w-full flex items-center justify-between px-8">
            {/* TODO: Add image left */}
            <div className="w-1/2"></div>
            <div className="w-1/2 flex flex-col items-center justify-center gap-4 min-h-screen">
                {!loggedIn && !isBeingRedirected && !isLoading ? (
                    <div className="flex flex-col items-center justify-center gap-4 w-full">
                        <h1 className="text-4xl text-custom-green-500">
                            Let's start your journey
                        </h1>
                        <p className="text-lg">
                            We tried to make it as simple as possible!
                        </p>
                        <Button
                            variant={'outline'}
                            onClick={() => {
                                setIsBeingRedirected(true)
                                login()
                            }}
                            className="flex items-center justify-center gap-8 w-full max-w-xs py-2.5"
                        >
                            <Image
                                src="/logos/google.png"
                                alt="google-logo"
                                width={30}
                                height={30}
                            />
                            <p className="text-lg">Signup with Google</p>
                        </Button>
                    </div>
                ) : isLoading ? (
                    <p>
                        You are logged in, we are transferring you to events...
                    </p>
                ) : (
                    <p>You are being redirected...</p>
                )}
            </div>
        </div>
    )
}
