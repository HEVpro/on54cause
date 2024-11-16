'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { GoogleOAuthProvider } from '@react-oauth/google'

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
                {children}
            </NextThemesProvider>
        </GoogleOAuthProvider>
    )
}
