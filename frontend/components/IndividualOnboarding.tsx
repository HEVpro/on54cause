'use client'
import { Button } from '@/components/ui/button'
import { useWeb3AuthNoModalProvider } from '@/lib/auth/web3AuthNoModalProvider'
import { IProvider, WALLET_ADAPTERS } from '@web3auth/base'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { get } from 'http'
import { motion } from 'framer-motion'

export default function IndividualOnboarding() {
    const searchParams = useSearchParams()
    const isFromOnBoarding = searchParams.get('isFromOnBoarding')
    const { login, loggedIn, getUserInfo } = useWeb3AuthNoModalProvider()
    const [isBeingRedirected, setIsBeingRedirected] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    const handleUser = async () => {
        localStorage.setItem('user_type', 'individual')
        // localStorage.setItem('user_data', JSON.stringify(user))
        router.push('/events')
    }
    useEffect(() => {
        if (loggedIn && !isBeingRedirected) {
            handleUser()
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
        <>
            <motion.div
                key="step1-header"
                initial={{ x: '50%' }}
                animate={{ x: 0 }}
                exit={{ x: '50%' }}
                transition={{ duration: 0.5, ease: 'linear' }}
                className="md:z-50 w-full md:w-1/2  absolute mx-auto min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center md:justify-end gap-10 p-10 bg-white rounded-xl"
            >
                <p className="max-md:hidden text-3xl text-custom-yellow-500">
                    Join events
                </p>
                <p className="max-md:hidden text-3xl text-custom-orange-500">
                    Give Back
                </p>
                <p className="max-md:hidden text-3xl text-custom-red-500">
                    Create Impact
                </p>
                <Image
                    className="max-md:opacity-30"
                    src="/nouns/noun-2.png"
                    alt="step1"
                    width={600}
                    height={600}
                />
            </motion.div>
            <motion.div
                key="step1"
                initial={{ opacity: 0, x: '-50%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-50%' }}
                transition={{ duration: 0.5, ease: 'linear' }}
                className="md:z-0 w-full md:w-1/2 h-[calc(100vh-4rem)] absolute left-0 md:left-1/2 flex-1 flex flex-col justify-center items-center gap-4"
            >
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
                    <p className="text-lg">
                        You are logged in, we are transferring you to events...
                    </p>
                ) : (
                    <p className="text-lg">You are being redirected...</p>
                )}
            </motion.div>
        </>
    )
}
