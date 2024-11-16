'use client'
import { EventCard } from '@/components/EventCard'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarIcon, XIcon } from 'lucide-react'
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

type EventData = {
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
    const [name, setName] = useQueryState('name')
    const [charity, setCharity] = useQueryState('charity')
    const [date, setDate] = useQueryState('date', parseAsIsoDate)
    const [events, setEvents] = useState<EventData[]>([])

    const [debouncedName] = useDebounce(name, 500)
    const [debouncedCharity] = useDebounce(charity, 500)
    const [debouncedDate] = useDebounce(date, 500)

    const mockEvents = [
        {
            chainId: 88882,
            id: '0x4fa3aa42d6ce45f3cd4cc97645180a486421a882219833f1bd8682192c2051b3',
        },
    ]
    const mappedEvents = mockEvents.map((event) => ({
        abi: abi as Abi, // Cast abi to the correct type
        address: '0x0172e3262B9f676BECC2a5cDc7e82ab9d6D3298F' as `0x${string}`,
        args: [event.id],
        functionName: 'getEvent',
    }))

    const { data } = useReadContracts({
        contracts: mappedEvents,
    })

    useEffect(() => {
        if (data) {
            const formattedEvents = data.map((event) => {
                return event.result
            })
            setEvents(formattedEvents as any[])
        }
    }, [data])
    console.log('events', data)

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
            return event.result
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
                    'w-full flex-wrap gap-4 py-7 px-4 grid grid-cols-4 align-bottom items-end'
                    //TODO: if charity create event
                    // usertType === 'charity' ? 'grid-cols-4' : 'grid-cols-3'
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
                {/* TODO: use when fetch and mapp the json events */}
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
                {/* TODO: if userType is 'charity */}
                <div className="col-span-1 w-full">
                    <Button className="w-full">Create Event</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 p-4">
                {events?.map((event, index) => (
                    <EventCard
                        key={event.id}
                        data={event}
                        color={getRandomColor()}
                    />
                ))}
            </div>
        </>
    )
}
