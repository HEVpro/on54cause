import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'
import { Londrina_Solid } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
    title: 'On54Cause',
    description:
        'On Chain 4 Cause is a blockchain-based platform empowering people to support charities through sports and fundraising. Charities sign up, add events like marathons or triathlons, and individuals generate personalized fundraising links. If participants reach their goal (e.g., a €500 registration fee), the charity covers it, and all extra funds go to the cause. With blockchain transparency, charities also show exactly how donations are spent, ensuring every effort makes a real impact.',
}

const londrinaSolid = Londrina_Solid({
    subsets: ['latin'],
    weight: ['100', '300', '400', '900'],
    variable: '--font-londrina-solid',
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={cn(londrinaSolid.className)}>
                <div className="max-w-6xl mx-auto antialiased">
                    <Providers>
                        <Navbar />
                        <Toaster />

                        {children}
                    </Providers>
                </div>
            </body>
        </html>
    )
}
