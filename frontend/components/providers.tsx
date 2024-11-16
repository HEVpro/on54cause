"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { config } from '@/lib/wagmi/config'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const queryClient = new QueryClient()


export function Providers({
    children
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            <NuqsAdapter>
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>

                        {children}
                    </QueryClientProvider>
                </WagmiProvider>
            </NuqsAdapter>
        </NextThemesProvider>
    )
}
