"use client"
import { EventCard } from '@/components/EventCard'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarIcon, XIcon } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useDebounce } from 'use-debounce';


export default function ListEvents() {
    const [name, setName] = useState("")
    const [charity, setCharity] = useState("")
    const [date, setDate] = useState<Date>()
    const [debouncedName] = useDebounce(name, 700)
    const [debouncedCharity] = useDebounce(charity, 700)
    const [debouncedDate] = useDebounce(date, 700)


    const colors = [
        { class: 'border-custom-green-500', code: "#132b3910" },
        { class: 'border-custom-yellow-600', code: "#441b0410" },
        { class: 'border-custom-orange-400', code: "#46100910" },
        { class: 'border-custom-red-400', code: "#4d041d10" }
    ];

    const filterEvents = () => {
        return events.filter((event) => {
            const matchesName = event.name.toLowerCase().includes(debouncedName.toLowerCase());
            const matchesCharity = event.charity.toLowerCase().includes(debouncedCharity.toLowerCase());
            const matchesDate = debouncedDate ? format(new Date(event.date), "yyyy-MM-dd") >= format(debouncedDate, "yyyy-MM-dd") : true;
            return matchesName && matchesCharity && matchesDate;
        });
    };

    const events = [
        { name: 'Charity Gala', charity: 'save the children', date: new Date("2024-11-23"), description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { name: 'Individual Meetup', charity: 'UNICEF', date: new Date("2024-01-02"), description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { name: 'Run for a cause', charity: 'Company 3', date: new Date("2025-07-15"), description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        // Add more events as needed
    ];


    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 md:p-8">
                {filterEvents().map((event) => (
                    <EventCard data={event} key={event.name} color={getRandomColor()} />
                ))}
            </div>
        </>
    )

}
