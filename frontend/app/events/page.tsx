import { HowItWorks } from '@/components/HowItWorks'
import { DescriptionFlow } from '@/components/ProcessBeam'
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { MagicCard } from '@/components/ui/magic-card'
import ShimmerButton from '@/components/ui/shimmer-button'
import TypingAnimation from '@/components/ui/typing-animation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon } from 'lucide-react'
import { EventCard } from '@/components/EventCard'

export default function Page() {
    const colors = [
        { class: 'border-custom-green-500', code: "#132b3910" },
        { class: 'border-custom-yellow-600', code: "#441b0410" },
        { class: 'border-custom-orange-400', code: "#46100910" },
        { class: 'border-custom-red-400', code: "#4d041d10" }
    ];

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 md:p-8">
            <EventCard type="charity" color={getRandomColor()} />
            <EventCard type="charity" color={getRandomColor()} />
            <EventCard type="charity" color={getRandomColor()} />
            <EventCard type="individual" color={getRandomColor()} />
            <EventCard type="individual" color={getRandomColor()} />
        </div>
    )

}
