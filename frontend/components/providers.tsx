'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { config } from '@/lib/wagmi/config'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const queryClient = new QueryClient()


export function Providers({
    children,
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <GoogleOAuthProvider clientId="436172427709-m9an5dcu35ic2547k74mq99miondv24k.apps.googleusercontent.com">
            <NextThemesProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >

                <NuqsAdapter>
                    <WagmiProvider config={config}>
                        <QueryClientProvider client={queryClient}>

                            {children}
                        </QueryClientProvider>
                    </WagmiProvider>
                </NuqsAdapter>
            </NextThemesProvider>
        </GoogleOAuthProvider>
    )
}
