"use client"
import { EventCard } from '@/components/EventCard'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarIcon, XIcon } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useDebounce } from 'use-debounce';


export default function ListEvents({ initialData }: { initialData: any[] }) {
    const [name, setName] = useState("")
    const [charity, setCharity] = useState("")
    const [date, setDate] = useState<Date>()
    const [events, setEvents] = useState(initialData)

    const [debouncedName] = useDebounce(name, 500);
    const [debouncedCharity] = useDebounce(charity, 500);
    const [debouncedDate] = useDebounce(date, 500);

    const colors = [
        { class: 'border-custom-green-500', code: "#132b3910" },
        { class: 'border-custom-yellow-600', code: "#441b0410" },
        { class: 'border-custom-orange-400', code: "#46100910" },
        { class: 'border-custom-red-400', code: "#4d041d10" }
    ];

    // const filteredEvents = events?.filter((event) => {
    //     const matchesName = event.name?.toLowerCase().includes(debouncedName.toLowerCase()) ?? false;
    //     const matchesCharity = event.charity?.toLowerCase().includes(debouncedCharity.toLowerCase()) ?? false;
    //     const matchesDate = debouncedDate ? format(new Date(event.date), "yyyy-MM-dd") >= format(debouncedDate, "yyyy-MM-dd") : true;
    //     return matchesName && matchesCharity && matchesDate;
    // });


    console.log(events)

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    useEffect(() => {
        if (debouncedName.length > 0) {
            const initialEvents = initialData?.filter((event) => {
                return event.title?.toLowerCase().includes(debouncedName.toLowerCase())
            })
            setEvents(initialEvents)
        } else if (debouncedName.length === 0) {
            setEvents(initialData)
        }
        if (debouncedCharity.length > 0) {
            const initialEvents = initialData?.filter((event) => {
                return event.charity?.toLowerCase().includes(debouncedCharity.toLowerCase())
            })
            setEvents(initialEvents)
        } else if (debouncedCharity.length === 0) {
            setEvents(initialData)
        }
        if (debouncedDate) {
            const initialEvents = initialData?.filter((event) => {
                return debouncedDate && format(event.date, "yyyy-MM-dd") >= format(debouncedDate, "yyyy-MM-dd")
            })
            setEvents(initialEvents)
        } else if (debouncedDate === undefined) {
            setEvents(initialData)
        }
    }, [debouncedName, debouncedCharity, debouncedDate])

    return (
        <>
            <div className="w-full flex items-center justify-start flex-wrap gap-4 py-7 px-4">
                <div className="w-full sm:w-[280px] flex flex-col gap-2">
                    <Label>Event Name</Label>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        className=" w-full focus:outline-none focus:ring-0 focus:border-none"
                    />
                </div>
                <div className="w-full sm:w-[280px] flex flex-col gap-2">
                    <Label>Charity Name</Label>
                    <Input
                        onChange={(e) => setCharity(e.target.value)}
                        className="w-full focus:outline-none focus:ring-0 focus:border-none"
                    />
                </div>
                <div className="w-full sm:w-[280px] flex flex-col gap-2">
                    <Label>Date</Label>
                    <div className="relative">
                        <Popover >
                            <PopoverTrigger asChild >
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "relative w-full justify-start text-left font-normal focus:outline-none focus:ring-0",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <button
                            onClick={() => setDate(undefined)} // Clear the date
                            disabled={!date}
                            className="ml-2 absolute top-1/2 -translate-y-1/2 right-3 bg-transparent disabled:opacity-50"
                        >
                            <XIcon className='w-4 h-4 text-black' />
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
                {events?.map((event, index) => (
                    <EventCard key={index} data={event} color={getRandomColor()} />
                ))}
            </div>
        </>
    )

}
