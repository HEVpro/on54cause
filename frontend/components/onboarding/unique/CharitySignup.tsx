'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useWeb3AuthSingleAuthProvider } from '@/lib/auth/web3AuthSingleAuthProvider'
import {
    GoogleLogin,
    useGoogleLogin,
    CredentialResponse,
} from '@react-oauth/google'
import { useEffect, useState } from 'react'
import { useWizard } from 'react-use-wizard'
import { Button } from '@/components/ui/button'
import { FileKey2Icon, FolderKeyIcon, KeyIcon } from 'lucide-react'
import ShimmerButton from '@/components/ui/shimmer-button'
import { get } from 'http'
import next from 'next'
import { set } from 'react-hook-form'

export default function CharitySignup() {
    const [loading, setLoading] = useState(false)
    const { loginWithPasskey, registerPasskey, listAllPasskeys } =
        useWeb3AuthSingleAuthProvider()
    const { nextStep } = useWizard()

    return (
        <>
            <motion.div
                key="step1-header"
                initial={{ x: '50%' }}
                animate={{ x: 0 }}
                exit={{ x: '50%' }}
                transition={{ duration: 0.5, ease: 'linear' }}
                className="z-50 w-1/2  absolute mx-auto min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-10 rounded-xl"
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
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="text-4xl text-custom-green-500">
                        Let's start your journey
                    </h1>
                    <p className="text-lg max-w-sm text-center mt-6">
                        You are a charity, we are a cause. Let's get you set up
                        with a secure login.
                    </p>
                    <ShimmerButton
                        borderRadius="15px"
                        className=" h-12 w-fit min-w-[150px] gap-4 text-lg hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
                        shimmerColor="#f97f70"
                        shimmerSize="0.2em"
                        background="#e01a4f"
                        disabled={loading}
                        onClick={async () => {
                            setLoading(true)
                            const res = await loginWithPasskey()
                            if (res?.isLoggedIn) {
                                setLoading(false)
                                localStorage.setItem('user_type', 'charity')
                                nextStep()
                            }
                            setLoading(false)
                        }}
                    >
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <FileKey2Icon className="h-6 w-6 stroke-custom-green-500" />
                                <p className="pt-0.5">Login with Passkey</p>
                            </>
                        )}
                    </ShimmerButton>
                    <p className="text-sm max-w-xs text-center mt-16 text-gray-500">
                        Don't have passkeys yet? You can register them here.
                        Then click on login with passkey.
                    </p>
                    <ShimmerButton
                        borderRadius="15px"
                        className="mt-2 h-10 w-fit gap-4 text-lg hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center text-custom-green-400"
                        shimmerColor="#244455"
                        shimmerSize="0.2em"
                        background="#ffcfc9"
                        disabled={loading}
                        onClick={async () => {
                            registerPasskey()
                        }}
                    >
                        <FolderKeyIcon className="h-6 w-6 stroke-custom-green-500" />
                        Register new Passkey
                    </ShimmerButton>
                </div>
            </motion.div>
        </>
    )
}
