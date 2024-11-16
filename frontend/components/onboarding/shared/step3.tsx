'use client'

import { useEffect, useRef } from 'react'

import type { ConfettiRef } from '@/components/ui/confetti'
import Confetti from '@/components/ui/confetti'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Step3() {
    const router = useRouter()
    const confettiRef = useRef<ConfettiRef>(null)

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/events')
        }, 6000)
        return () => clearTimeout(timeout)
    }, [])

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
                <motion.span className=" text-center text-5xl font-semibold leading-none  text-custom-green-500">
                    Yay, your account is all set up! Thank you so much!
                </motion.span>

                <Confetti
                    ref={confettiRef}
                    className="absolute left-0 top-0 z-0 size-full"
                    onMouseEnter={() => {
                        confettiRef.current?.fire({})
                    }}
                />
            </motion.div>
        </>
    )
}
