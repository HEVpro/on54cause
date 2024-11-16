"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { MagicCard } from '@/components/ui/magic-card'
import { format } from 'date-fns'


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVerticalIcon } from 'lucide-react'


export function EventCard({ data, color }: { data: any, color: Record<string, string> }) {
    return (
        <MagicCard
            className={`relative w-full cursor-pointer flex flex-col gap-6 shadow-2xl whitespace-nowrap ${color.class}`}
            gradientColor={color.code}
        >
            <DropdownMenu>
                <DropdownMenuTrigger className='absolute top-2 right-2'>
                    <EllipsisVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className={`${color.class}`}>

                    <DropdownMenuItem>Claim money</DropdownMenuItem>
                    <DropdownMenuItem>Delete event</DropdownMenuItem>
                    <DropdownMenuItem>Create event</DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

            <CardTitle className="flex items-center gap-2 w-full">
                <Avatar>
                    <AvatarImage src={data?.image_url} alt={data?.title} />
                    <AvatarFallback>54</AvatarFallback>
                </Avatar>
                <p>{data?.title}</p>
            </CardTitle>
            <CardDescription className="w-full h-auto text-sm line-clamp-3  text-ellipsis whitespace-normal">
                {data?.description}
            </CardDescription>


            <CardFooter className="flex justify-between p-0">
                <p>{data?.title}</p>
                <p>{format(new Date(), "dd/MM/yyyy")}</p>
            </CardFooter>

        </MagicCard>
    )
}