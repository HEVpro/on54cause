"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({
    children
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>{children}
        </NextThemesProvider>
    )
}