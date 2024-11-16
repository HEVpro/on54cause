'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useWeb3AuthSingleAuthProvider } from '@/lib/auth/web3AuthSingleAuthProvider'
import { GoogleLogin } from '@react-oauth/google'
import { useEffect } from 'react'
import { useWizard } from 'react-use-wizard'
import { Button } from '@/components/ui/button'
import { KeyIcon } from 'lucide-react'

export default function CharitySignup() {
    const { isLoggingIn, loginWithPasskey, registerPasskey, listAllPasskeys } =
        useWeb3AuthSingleAuthProvider()
    const { nextStep } = useWizard()

    useEffect(() => {
        if (isLoggingIn) {
            const timeoutId = setTimeout(() => {
                nextStep()
            }, 4500)

            return () => clearTimeout(timeoutId) // Cleanup the timeout when the component unmounts or if isLoggingIn changes
        }
    }, [isLoggingIn])

    console.log('listAllPasskeys -->', listAllPasskeys())

    return (
        <>
            <motion.div
                key="step1-header"
                initial={{ x: '50%' }}
                animate={{ x: 0 }}
                exit={{ x: '50%' }}
                transition={{ duration: 0.5, ease: 'linear' }}
                className="z-50 w-1/2  absolute mx-auto min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-10 bg-[#D4D7E1] rounded-xl"
            >
                <p className="text-2xl">
                    Tell us a bit about your charity so we can get you set up!
                </p>
                <Image
                    className="mt-auto"
                    src="/nouns/noun-2.png"
                    alt="step1"
                    width={600}
                    height={600}
                />
            </motion.div>
            <motion.div
                key="step3"
                initial={{ opacity: 0, x: '-50%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-50%' }}
                transition={{ duration: 0.5, ease: 'linear' }}
                className=" w-1/2 h-[calc(100vh-4rem)] absolute left-1/2  flex-1 flex flex-col justify-center items-center gap-4 m-10"
            >
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                    <h1 className="text-4xl text-custom-green-500">
                        Let's start your journey
                    </h1>
                    <p className="text-lg">
                        You are a charity, we are a cause. Let's get you set up
                        with a secure login.
                    </p>

                    <button onClick={loginWithPasskey} className="card passkey">
                        Login with Passkey
                    </button>
                    <p>Don't have passkeys yet? You can register them here.</p>
                    <Button
                        variant="outline"
                        onClick={registerPasskey}
                        className="flex items-center justify-center gap-4"
                    >
                        <KeyIcon className="h-6 w-6" />
                        Register new Passkey
                    </Button>
                </div>
            </motion.div>
        </>
    )
}
