'use client'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'
import ShimmerButton from './ui/shimmer-button'
import { usePathname } from 'next/navigation'
import { useWeb3AuthNoModalProvider } from '@/lib/auth/web3AuthNoModalProvider'
import { useWeb3AuthSingleAuthProvider } from '@/lib/auth/web3AuthSingleAuthProvider'
import CharityLogoutButton from './CharityLogoutButton'
import { useEffect, useState } from 'react'
import useAuth from './hooks/useAuth'
import { Skeleton } from './ui/skeleton'
import { Router } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function Navbar() {
    const pathname = usePathname()
    const { isLoggingIn, logoutPassKeys } = useWeb3AuthSingleAuthProvider()
    const { login, logout, loggedIn, setLoggedIn, setProvider } =
        useWeb3AuthNoModalProvider()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(true)
    const [session, setSession] = useState<string | null>(null)
    const [userType, setUserType] = useState<string | null>(null)
    const [isBeingRedirected, setIsBeingRedirected] = useState(false)

    useEffect(() => {
        const authStoreIndividual = localStorage.getItem('auth_store')
        const authStoreCharity = localStorage.getItem('sfa_store_eip_core_kit')
        const userTypeValue = localStorage.getItem('user_type')
        if (authStoreIndividual) {
            const store = JSON.parse(authStoreIndividual)
            setSession(store.sessionId)
            localStorage.removeItem('sfa_store_eip_core_kit')
            setIsLoading(false)
        }
        if (authStoreCharity) {
            const store = JSON.parse(authStoreCharity)
            setSession(store.sessionId)
            localStorage.removeItem('auth_store')
            setIsLoading(false)
        }
        if (userTypeValue) {
            setUserType(userTypeValue)
            setIsLoading(false)
        }
        if (!userTypeValue && !authStoreCharity && !authStoreIndividual) {
            setIsLoading(false)
        }
    }, [loggedIn, isLoggingIn, pathname])

    const handleIndividualLogout = async () => {
        await logout()
        setLoggedIn(false)
        setProvider(null)
        setSession(null)
        setUserType(null)
        localStorage.removeItem('user_type')
        localStorage.removeItem('auth_store')
        router.push('/')
    }

    const handleLogoutCharity = async () => {
        setLoggedIn(false)
        setProvider(null)
        setSession(null)
        setUserType(null)
        localStorage.removeItem('user_type')
        localStorage.removeItem('sfa_store_eip_core_kit')
        router.push('/')
        await logoutPassKeys()
    }
    const allowedPaths = ['/', '/events']
    return (
        <div className="flex h-16 w-full bg-white/70 z-[9999] items-center justify-between backdrop-blur-md px-4 py-2 mx-auto sticky top-0">
            <Link href={'/'} className="flex items-center gap-4">
                <Image
                    src="/icon.png"
                    alt="logo"
                    width={100}
                    height={100}
                    className="h-10 w-10"
                />
                <p className="text-2xl font-bold">On54Cause</p>
            </Link>
            <Link
                href={'/events'}
                className="text-2xl text-custom-orange-600 hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
            >
                <p className="text-2xl ">Events</p>
            </Link>
            <>
                {isLoading ? (
                    // Render a loading indicator
                    <Skeleton className="w-32 h-10 bg-custom-green-400" />
                ) : (
                    // Render your main navbar content
                    <>
                        {!userType && allowedPaths.includes(pathname) && (
                            <div className="w-fit flex items-center gap-4">
                                <p className="max-md:hidden text-lg pt-4 text-custom-green-500">
                                    Already registered?
                                </p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <ShimmerButton
                                            borderRadius="15px"
                                            className="mt-4 h-12 max-w-32 pr-2 text-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
                                            shimmerColor="#53b3cb"
                                            shimmerSize="0.2em"
                                            background="#f97f70"
                                        >
                                            Login
                                            <Image
                                                src="/glasses/glasses-square-teal.png"
                                                alt="nouns-glasses"
                                                width={250}
                                                height={250}
                                                className="w-24 h-24 p-0 pt-3"
                                            />
                                        </ShimmerButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-44 text-xl">
                                        <DropdownMenuItem>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    router.push(
                                                        '/onboarding/charity?startIndex=2'
                                                    )
                                                }}
                                                className="text-lg  "
                                            >
                                                Charity
                                            </button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setIsBeingRedirected(true)
                                                    localStorage.setItem(
                                                        'user_type',
                                                        'individual'
                                                    )
                                                    login()
                                                }}
                                                className="text-lg"
                                            >
                                                {isBeingRedirected
                                                    ? 'Redirecting...'
                                                    : 'Individual'}
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}
                        {session && userType === 'individual' && (
                            <ShimmerButton
                                borderRadius="15px"
                                className="mt-4 h-12 px-0 text-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
                                shimmerColor="#f97f70"
                                shimmerSize="0.2em"
                                background="#e01a4f"
                                onClick={handleIndividualLogout}
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
                        )}
                        {session && userType === 'charity' && (
                            <ShimmerButton
                                borderRadius="15px"
                                className="mt-4 h-12 px-0 text-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
                                shimmerColor="#f97f70"
                                shimmerSize="0.2em"
                                background="#e01a4f"
                                onClick={handleLogoutCharity}
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
                        )}
                    </>
                )}
            </>
        </div>
    )
}
