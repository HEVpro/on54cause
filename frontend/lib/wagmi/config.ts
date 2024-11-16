import { http, createConfig } from 'wagmi'
import { spicy } from 'wagmi/chains'

export const config = createConfig({
    chains: [spicy],
    transports: {
        [spicy.id]: http(''),
    },
})
