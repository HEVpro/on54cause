import { MenuIcon } from "lucide-react";

"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { MagicCard } from '@/components/ui/magic-card'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVerticalIcon } from 'lucide-react'



export function EventCard({ type = "charity", color }: { type?: "charity" | "individual", color: Record<string, string> }) {
    return (
        <MagicCard
            className={`relative w-full cursor-pointer flex flex-col shadow-2xl whitespace-nowrap ${color.class}`}
            gradientColor={color.code}
        >
            <DropdownMenu>
                <DropdownMenuTrigger className='absolute top-2 right-2'>
                    <EllipsisVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className={`${color.class}`}>
                    {type === "charity" ? (
                        <>
                            <DropdownMenuItem>Claim money</DropdownMenuItem>
                            <DropdownMenuItem>Delete event</DropdownMenuItem>
                        </>
                    ) : (
                        <DropdownMenuItem>Create event</DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <CardTitle className="flex items-center gap-2 w-full">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>event name</p>
            </CardTitle>
            <CardDescription>event description</CardDescription>


            <CardFooter className="flex justify-between p-0">
                <p>charity name</p>
                <p>event date</p>
            </CardFooter>

        </MagicCard>
    )
}