'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import ShimmerButton from './ui/shimmer-button'
import { parseUnits, stringToHex } from 'viem'
import { abi } from '@/lib/wagmi/abi'
import { useWeb3AuthNoModalProvider } from '@/lib/auth/web3AuthNoModalProvider'
import { useWeb3AuthSingleAuthProvider } from '@/lib/auth/web3AuthSingleAuthProvider'
import {
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    Select,
} from './ui/select'
import { Button } from './ui/button'
import { FilesIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Donate() {
    const searchParams = useSearchParams()
    const eventId = searchParams.get('eventId')
    const eventTitle = 'Save the Children for run'
    const userRaiser = '0x3C84fca6d03440FA6CAf2A8c08F21c019006c394'
    const eventDescription = searchParams.get('description')
    const eventDate = 1734390155
    const organizer = searchParams.get('organizer')
    const { userAddress, writeContract, loggedIn } =
        useWeb3AuthNoModalProvider()
    const { toast } = useToast()
    const { showCheckout, connectPlugin, isLoggingIn } =
        useWeb3AuthSingleAuthProvider()

    const [session, setSession] = useState<string | null>(null)

    useEffect(() => {
        const authStoreIndividual = localStorage.getItem('auth_store')
        const authStoreCharity = localStorage.getItem('sfa_store_eip_core_kit')
        if (authStoreIndividual) {
            const store = JSON.parse(authStoreIndividual)
            setSession(store.sessionId)
            localStorage.removeItem('sfa_store_eip_core_kit')
        }
        if (authStoreCharity) {
            const store = JSON.parse(authStoreCharity)
            setSession(store.sessionId)
            localStorage.removeItem('auth_store')
        }
    }, [loggedIn, isLoggingIn])

    console.log('session', session)

    const formattedDate = eventDate
        ? new Intl.DateTimeFormat('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
          }).format(new Date(Number(eventDate) * 1000))
        : 'Invalid Date'

    const FormSchema = z.object({
        quantity: z.coerce
            .number()
            .min(0, 'Quantity must be a positive number'),
        tokenType: z.string(),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            quantity: 0, // Default to 0 as it should be a number.
            tokenType: 'USD',
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>, event: any) {
        event.preventDefault()
        const { quantity, tokenType } = data
        const formattedAmount = parseUnits(quantity.toString(), 18)

        // Simulate a donation processing delay
        setTimeout(() => {
            // Show success toast after the wait
            toast({
                title: 'Donation successful',
                description: 'Thank you for your generous donation!',
                duration: 5000,
            })
        }, 5000) // Wait for 5 seconds

        // Initial toast when starting the donation process
        toast({
            title: 'Donating...',
            description: 'Please wait while we process your donation',
            duration: 5000,
        })
    }
    const cryptoTokens = [
        {
            name: 'Dollars',
            symbol: 'USD',
            type: 'Fiat',
            logo: 'https://cryptologos.cc/logos/united-states-dollar-usd-logo.png?v=025',
        },
        {
            name: 'Tether',
            symbol: 'USDT',
            type: 'Stablecoin',
            logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=025',
        },
        {
            name: 'USD Coin',
            symbol: 'USDC',
            type: 'Stablecoin',
            logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=025',
        },
        {
            name: 'Bitcoin',
            symbol: 'BTC',
            type: 'Token',
            logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025',
        },
        {
            name: 'Ethereum',
            symbol: 'ETH',
            type: 'Token',
            logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025',
        },
        {
            name: 'Binance Coin',
            symbol: 'BNB',
            type: 'Token',
            logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=025',
        },
        {
            name: 'Ripple',
            symbol: 'XRP',
            type: 'Token',
            logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=025',
        },
        {
            name: 'Cardano',
            symbol: 'ADA',
            type: 'Token',
            logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png?v=025',
        },
        {
            name: 'Solana',
            symbol: 'SOL',
            type: 'Token',
            logo: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=025',
        },
        {
            name: 'Polygon',
            symbol: 'MATIC',
            type: 'Token',
            logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=025',
        },
    ]

    return (
        <div className="w-full mx-auto max-w-4xl h-full flex flex-col items-center justify-center mt-14">
            <h1 className="text-custom-red-600 text-4xl text-center">
                Donate to the event
            </h1>
            <div className="flex flex-col items-center justify-center  w-full mt-10">
                <h2>I'm trying to donate to this event</h2>
                <div className="flex items-center justyfy-center gap-4">
                    {userRaiser && (
                        <p className="text-xl text-center mt-2">
                            {userRaiser.slice(0, 6)}...{userRaiser.slice(-4)}
                        </p>
                    )}
                    <Button
                        variant={'outline'}
                        onClick={() => {
                            navigator.clipboard.writeText(userRaiser)
                            toast({
                                title: 'Copied to clipboard!',
                            })
                        }}
                        className="ml-2 p-2  rounded-md"
                    >
                        <FilesIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center  w-full mt-10">
                <h2>Event Details</h2>
                <p className="text-3xl text-custom-green-500 text-center mt-2">
                    {eventTitle}
                </p>
                <p className="text-lg text-center max-w-sm">
                    {eventDescription}
                </p>
                <p className="text-lg text-center mt-4">{formattedDate}</p>
            </div>

            <div className="w-full ">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="max-w-md mx-auto space-y-6 flex flex-col items-center justify-center"
                    >
                        <div className="flex items-start justify-between gap-4 mt-6">
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem className="w-full ">
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl className="">
                                            <div className=" relative">
                                                <Input
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="text-right text-lg pr-4"
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(
                                                            e.target
                                                                .valueAsNumber
                                                        )
                                                    }}
                                                />
                                                {/* <p className="absolute left-2 top-2 text-gray-400 ">
                                                    USD
                                                </p> */}
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            This money will be used to fund the
                                            event
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tokenType"
                                render={({ field }) => (
                                    <FormItem className="w-[150px]">
                                        <FormLabel>Token</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full justify-end pr-4">
                                                    <SelectValue placeholder="Select a verified email to display" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cryptoTokens.map((token) => (
                                                    <SelectItem
                                                        value={token.symbol}
                                                        key={token.symbol}
                                                        className="justify-end"
                                                    >
                                                        <div className="flex items-center gap-2 w-full justify-end">
                                                            <Image
                                                                src={token.logo}
                                                                alt="token-logo"
                                                                width={20}
                                                                height={20}
                                                                className={cn(
                                                                    '',
                                                                    token.type ===
                                                                        'Fiat'
                                                                        ? 'hidden'
                                                                        : ''
                                                                )}
                                                            />
                                                            <p>
                                                                {token.symbol}
                                                            </p>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <ShimmerButton
                            borderRadius="15px"
                            className="mt-10 h-12 pr-2 pl-8 text-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
                            shimmerColor="#2d92ad"
                            shimmerSize="0.2em"
                            background="#fdaea4"
                            type="submit"
                            disabled={
                                !userAddress || form.formState.isSubmitting
                            }
                        >
                            Donate!
                            <Image
                                src="/nouns/noun-5.png"
                                alt="nouns-glasses"
                                width={100} // Increase the width
                                height={100} // Increase the height
                                className="w-20 h-20 p-0  pt-3" // Adjust the className to match the new size
                            />
                        </ShimmerButton>
                    </form>
                </Form>
            </div>
        </div>
    )
}
