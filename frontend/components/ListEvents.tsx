'use client'
import { EventCard } from '@/components/EventCard'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarIcon, PlusIcon, XIcon } from 'lucide-react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useDebounce } from 'use-debounce'
import { useQueryState } from 'nuqs'
import { parseAsIsoDate } from 'nuqs'
import { useReadContract, useReadContracts, useChainId } from 'wagmi'
import { abi } from '@/lib/wagmi/abi'
import contracts from '@/lib/wagmi/contracts.json'
import { Abi } from 'viem'
import {
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@radix-ui/react-tooltip'
import { Tooltip } from '@radix-ui/react-tooltip'
import { useWeb3AuthNoModalProvider } from '@/lib/auth/web3AuthNoModalProvider'
import { useWeb3AuthSingleAuthProvider } from '@/lib/auth/web3AuthSingleAuthProvider'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export type EventData = {
    id: string
    organiser: string
    date: number
    title: string
    description: string
    imgUrl: string
    status: number
    fundraisings: string[]
}
export default function ListEvents() {
    const pathname = usePathname()
    const router = useRouter()

    const [name, setName] = useQueryState('name')
    const [charity, setCharity] = useQueryState('charity')
    const [date, setDate] = useQueryState('date', parseAsIsoDate)
    const [events, setEvents] = useState<EventData[]>([])

    const [debouncedName] = useDebounce(name, 300)
    const [debouncedCharity] = useDebounce(charity, 300)
    const [debouncedDate] = useDebounce(date, 300)

    const [userType, setUserType] = useState<string | null>(null)
    const { isLoggingIn } = useWeb3AuthSingleAuthProvider()
    const { loggedIn } = useWeb3AuthNoModalProvider()

    useEffect(() => {
        const userTypeValue = localStorage.getItem('user_type')
        if (userTypeValue) {
            setUserType(userTypeValue)
        }
    }, [loggedIn, isLoggingIn, pathname])

    const mockEvents = [
        {
            chainId: 80002,
            id: 'FAD1B407A85421DFCF42EBC67C0F19E428753E46BF9E35BAD1A325B1301BB26F',
        },
    ]
    // const mappedEvents = mockEvents.map((event) => ({
    //     abi: abi as Abi, // Cast abi to the correct type
    //     address: '0xa4Bb9cee0fb14865B83245b403a6036049e3a9A6' as `0x${string}`,
    //     args: [event.id],
    //     functionName: 'getEvent',
    // }))

    // const { data } = useReadContracts({
    //     contracts: [{
    //         abi: abi as Abi, // Cast abi to the correct type
    //         address: '0xa4Bb9cee0fb14865B83245b403a6036049e3a9A6',
    //         args: ["FAD1B407A85421DFCF42EBC67C0F19E428753E46BF9E35BAD1A325B1301BB26F"],
    //         functionName: 'getEvent',
    //     }],
    // })

    const data = [
        {
            id: '1231123-id',
            organiser: 'Save the Children',
            title: 'Run for Children 5K',
            description:
                'Participate in our 5K run to support children in need. Purchase a ticket to join and help sponsor the event.',
            date: 1716000000,
            charity: 'Save the Children',
            imgUrl: '',
            status: 1,
            fundraisings: ['1', '2', '3'],
        },
        {
            id: '4817921-id',
            organiser: 'Red Cross',
            title: 'Annual Blood Run',
            description:
                'Join our Annual Blood Run event to raise funds for blood donation awareness. Ticket purchases go towards sponsoring the cause.',
            date: 1716000500,
            charity: 'Red Cross',
            imgUrl: '',
            status: 1,
            fundraisings: ['4', '5', '6'],
        },
        {
            id: '8347292-id',
            organiser: 'Greenpeace',
            title: 'Eco Marathon',
            description:
                'Participate in the Eco Marathon to promote environmental conservation. Buy a ticket and sponsor a tree!',
            date: 1716001000,
            charity: 'Greenpeace',
            imgUrl: '',
            status: 1,
            fundraisings: ['7', '8', '9'],
        },
        {
            id: '5923842-id',
            organiser: 'UNICEF',
            title: 'EduTech Conference',
            description:
                'Attend the EduTech Conference to explore innovative educational technologies. Ticket sales sponsor educational programs globally.',
            date: 1716001500,
            charity: 'UNICEF',
            imgUrl: '',
            status: 1,
            fundraisings: ['10', '11', '12'],
        },
        {
            id: '7691834-id',
            organiser: 'Doctors Without Borders',
            title: 'Global Health Summit',
            description:
                'Join the Global Health Summit to discuss healthcare innovations. Ticket proceeds go to supporting medical missions.',
            date: 1716002000,
            charity: 'Doctors Without Borders',
            imgUrl: '',
            status: 1,
            fundraisings: ['13', '14', '15'],
        },
        {
            id: '9812374-id',
            organiser: 'WWF',
            title: 'Wildlife Charity Ball',
            description:
                'Attend the Wildlife Charity Ball, an elegant evening to support wildlife preservation. Tickets and sponsorships available.',
            date: 1716002500,
            charity: 'WWF',
            imgUrl: '',
            status: 1,
            fundraisings: ['16', '17', '18'],
        },
    ]

    // useEffect(() => {
    //     if (data) {
    //         const formattedEvents = data.map((event) => {
    //             console.log('event', event)
    //             return event
    //         })
    //         setEvents(formattedEvents as any[])
    //     }
    // }, [data])
    // console.log('events', data)

    const colors = [
        { class: 'border-custom-green-500', code: '#132b3910' },
        { class: 'border-custom-yellow-600', code: '#441b0410' },
        { class: 'border-custom-orange-400', code: '#46100910' },
        { class: 'border-custom-red-400', code: '#4d041d10' },
    ]

    const getRandomColor = () =>
        colors[Math.floor(Math.random() * colors.length)]

    useEffect(() => {
        const formattedEvents = data?.map((event) => {
            return event
        }) as EventData[]
        setEvents(formattedEvents as any[])
        if (debouncedName && debouncedName.length > 0) {
            const filteredEvents = formattedEvents?.filter((event: any) => {
                return event.title
                    ?.toLowerCase()
                    .includes(debouncedName.toLowerCase())
            })
            setEvents(filteredEvents as EventData[])
        } else if (debouncedName === '') {
            setEvents(formattedEvents as EventData[])
            setName(null)
        }
        if (debouncedCharity && debouncedCharity.length > 0) {
            const filteredEvents = formattedEvents?.filter((event: any) => {
                return event.charity
                    ?.toLowerCase()
                    .includes(debouncedCharity.toLowerCase())
            })
            setEvents(filteredEvents)
        } else if (debouncedCharity === '') {
            setEvents(formattedEvents)
            setCharity(null)
        }
        if (debouncedDate) {
            const filteredEvents = formattedEvents?.filter((event: any) => {
                return (
                    debouncedDate &&
                    format(event.date, 'yyyy-MM-dd') >=
                        format(debouncedDate, 'yyyy-MM-dd')
                )
            })
            setEvents(filteredEvents)
        } else if (debouncedDate === undefined) {
            setEvents(formattedEvents)
        }
        if (!debouncedDate && !debouncedName && !debouncedCharity) {
            setEvents(formattedEvents)
        }
    }, [debouncedName, debouncedCharity, debouncedDate])

    return (
        <>
            <div
                className={cn(
                    'w-full flex-wrap gap-4 py-7 px-4 grid grid-cols-4 align-bottom items-end',
                    userType === 'charity' ? 'grid-cols-4' : 'grid-cols-3'
                )}
            >
                <div className="w-full col-span-1 flex flex-col gap-2">
                    <Label>Event Name</Label>
                    <Input
                        value={name || ''}
                        onChange={(e) => setName(e.target.value)}
                        className=" w-full focus:outline-none focus:ring-0 focus:border-none"
                    />
                </div>
                <div className="w-full col-span-1 flex flex-col gap-2">
                    <Label>Charity Name</Label>
                    <Input
                        value={charity || ''}
                        onChange={(e) => setCharity(e.target.value)}
                        className="w-full focus:outline-none focus:ring-0 focus:border-none"
                    />
                </div>
                <div className="w-full col-span-1 flex flex-col gap-2">
                    <Label>Date</Label>
                    <div className="relative">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'relative w-full justify-start text-left font-normal focus:outline-none focus:ring-0',
                                        !date && 'text-muted-foreground'
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? (
                                        format(date, 'dd/MM/yyyy')
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date as unknown as Date}
                                    onSelect={setDate as any}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <button
                            onClick={() => setDate(undefined as any)} // Clear the date
                            disabled={!date}
                            className="ml-2 absolute top-1/2 -translate-y-1/2 right-3 bg-transparent disabled:opacity-50"
                        >
                            <XIcon className="w-4 h-4 text-black" />
                        </button>
                    </div>
                </div>
                {userType === 'charity' && (
                    <div className="col-span-1 w-full ml-auto rounded-xl ">
                        <Button
                            onClick={() => router.push('/createevent')}
                            className="w-full"
                        >
                            Create event
                        </Button>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 p-4">
                {events?.map((event, index) => (
                    <EventCard
                        key={event?.id}
                        data={event}
                        color={getRandomColor()}
                    />
                ))}
            </div>
        </>
    )
}
