'use client'

import { useWeb3AuthNoModalProvider } from '@/lib/auth/web3AuthNoModalProvider'
import Image from 'next/image'
import ShimmerButton from './ui/shimmer-button'
import { useWeb3AuthSingleAuthProvider } from '@/lib/auth/web3AuthSingleAuthProvider'

export default function CharityLogoutButton() {
    const { logoutPassKeys } = useWeb3AuthSingleAuthProvider()

    return (
        <ShimmerButton
            borderRadius="15px"
            className="mt-4 h-12 px-0 text-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
            shimmerColor="#f97f70"
            shimmerSize="0.2em"
            background="#e01a4f"
            onClick={async () => {
                await logoutPassKeys()
            }}
        >
            <p className="pt-0.5 translate-x-6">Logout</p>
            <Image
                src="/accessories/accessory-wave.png"
                alt="nouns-wave"
                priority
                width={150} // Increase the width
                height={150} // Increase the height
                className="w-20 h-20 mb-10 translate-x-2 -translate-y-0.5" // Adjust the className to match the new size
            />
        </ShimmerButton>
    )
}
