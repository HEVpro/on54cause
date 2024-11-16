'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { MagicCard } from '@/components/ui/magic-card'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVerticalIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useWeb3AuthSingleAuthProvider } from '@/lib/auth/web3AuthSingleAuthProvider'
import { useWeb3AuthNoModalProvider } from '@/lib/auth/web3AuthNoModalProvider'
import { cn } from '@/lib/utils'

export function EventCard({
    data,
    color,
}: {
    data: any
    color: Record<string, string>
}) {
    const pathname = usePathname()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(true)
    const [session, setSession] = useState<string | null>(null)
    const [userType, setUserType] = useState<string | null>(null)

    const { isLoggingIn } = useWeb3AuthSingleAuthProvider()
    const { loggedIn } = useWeb3AuthNoModalProvider()

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

    //TODO: torras haz charity
    const menuItems = [
        {
            title: 'Complete Event',
            onClick: () => {
                router.push('/events')
            },
            type: 'charity',
            isDestructive: false,
        },
        {
            title: 'Cancel Event',
            onClick: () => {
                router.push('/events')
            },
            type: 'charity',
            isDestructive: true,
        },
        {
            title: 'Create link',
            onClick: () => {
                router.push(
                    `/events/new-link?eventId=${data.id}&eventTitle=${data.title}&organizer=${data.organiser}&date=${data.date}&description=${data.description}&imgUrl=${data.imgUrl}`
                )
            },
            type: 'individual',
            isDestructive: false,
        },
    ]
    console.log('userTye', userType)
    return (
        <MagicCard
            className={`col-span-2 relative w-full cursor-pointer flex flex-col gap-6 shadow-2xl whitespace-nowrap ${color.class}`}
            gradientColor={color.code}
        >
            <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2">
                    <EllipsisVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className={`${color.class}`}>
                    {menuItems.map((item) => {
                        return (
                            <DropdownMenuItem
                                className={cn(
                                    '',
                                    userType === item.type ? 'block' : 'hidden'
                                )}
                                onClick={item.onClick}
                                key={item.title.toLowerCase()}
                            >
                                {item.title}
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>

            <CardTitle className="flex items-center gap-2 w-full">
                <Avatar className="border-2 border-custom-orange-400">
                    <AvatarImage src={data?.image_url} alt={data?.title} />
                    <AvatarFallback className="text-sm ">o54</AvatarFallback>
                </Avatar>
                <p className="truncate line-clamp-1">{data?.title}</p>
            </CardTitle>
            <CardDescription className="w-full min-h-20 pt-2 text-sm line-clamp-3  text-ellipsis whitespace-normal">
                {data?.description}
            </CardDescription>

            <CardFooter className="flex justify-between p-0">
                <p>{data?.title}</p>
                <p>{format(new Date(), 'dd/MM/yyyy')}</p>
            </CardFooter>
        </MagicCard>
    )
}
