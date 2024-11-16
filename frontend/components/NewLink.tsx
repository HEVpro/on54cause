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

export default function NewLink() {
    const searchParams = useSearchParams()
    const eventId = searchParams.get('eventId')
    const eventTitle = searchParams.get('eventTitle')
    const eventDescription = searchParams.get('description')
    const eventDate = searchParams.get('date')
    const organizer = searchParams.get('organizer')
    const imgUrl = searchParams.get('imgUrl')
    const { userAddress, writeContract } = useWeb3AuthNoModalProvider()

    const formattedDate = eventDate
        ? new Intl.DateTimeFormat('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
          }).format(new Date(Number(eventDate) * 1000))
        : 'Invalid Date'

    const FormSchema = z.object({
        minimumAmount: z.coerce
            .number()
            .min(0, 'Minimum amount must be a positive number'),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            minimumAmount: 0, // Default to 0 as it should be a number.
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>, event: any) {
        event.preventDefault()
        const { minimumAmount } = data
        const formattedAmount = parseUnits(minimumAmount.toString(), 18)

        console.info('formattedAmount -->', formattedAmount)
        console.info('eventId -->', eventId)
        console.info('userAddress -->', userAddress)
        console.info('organizer -->', organizer)
        console.info('writing event...')

        const contractAdress = '0x0172e3262B9f676BECC2a5cDc7e82ab9d6D3298F'
        writeContract(abi as any, contractAdress, 'createFundraising', [
            formattedAmount,
            eventId,
            userAddress,
            organizer,
        ])
            .then((result) => {
                console.info('writeContract result -->', result)
            })
            .catch((error) => {
                console.error('Error writing contract:', error)
            })
    }
    // const cryptoTokens = [
    //     {
    //         name: 'Dollars',
    //         symbol: 'USD',
    //         type: 'Fiat',
    //         logo: 'https://cryptologos.cc/logos/united-states-dollar-usd-logo.png?v=025',
    //     },
    //     {
    //         name: 'Tether',
    //         symbol: 'USDT',
    //         type: 'Stablecoin',
    //         logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=025',
    //     },
    //     {
    //         name: 'USD Coin',
    //         symbol: 'USDC',
    //         type: 'Stablecoin',
    //         logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=025',
    //     },
    //     {
    //         name: 'Bitcoin',
    //         symbol: 'BTC',
    //         type: 'Token',
    //         logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025',
    //     },
    //     {
    //         name: 'Ethereum',
    //         symbol: 'ETH',
    //         type: 'Token',
    //         logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025',
    //     },
    //     {
    //         name: 'Binance Coin',
    //         symbol: 'BNB',
    //         type: 'Token',
    //         logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=025',
    //     },
    //     {
    //         name: 'Ripple',
    //         symbol: 'XRP',
    //         type: 'Token',
    //         logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=025',
    //     },
    //     {
    //         name: 'Cardano',
    //         symbol: 'ADA',
    //         type: 'Token',
    //         logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png?v=025',
    //     },
    //     {
    //         name: 'Solana',
    //         symbol: 'SOL',
    //         type: 'Token',
    //         logo: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=025',
    //     },
    //     {
    //         name: 'Polygon',
    //         symbol: 'MATIC',
    //         type: 'Token',
    //         logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=025',
    //     },
    // ]

    return (
        <div className="w-full mx-auto max-w-4xl h-full flex flex-col items-center justify-center mt-14">
            <h1 className="text-custom-red-600 text-4xl text-center">
                Create your link to participate in the event
            </h1>
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
                                name="minimumAmount"
                                render={({ field }) => (
                                    <FormItem className="w-full ">
                                        <FormLabel>Minimum Amount</FormLabel>
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
                                                <p className="absolute left-2 top-2 text-gray-400 ">
                                                    USD
                                                </p>
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Enter the minimum amount you want to
                                            raise in dollars
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={form.control}
                                name="tokenType"
                                render={({ field }) => (
                                    <FormItem className="w-[100px]">
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
                            /> */}
                        </div>

                        <ShimmerButton
                            borderRadius="15px"
                            className="mt-10 h-12 pr-2 pl-8 text-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
                            shimmerColor="#f15946"
                            shimmerSize="0.2em"
                            background="#2d92ad"
                            type="submit"
                            disabled={
                                !userAddress || form.formState.isSubmitting
                            }
                        >
                            Create!
                            <Image
                                src="/glasses/glasses-square-pink-purple-multi.png"
                                alt="nouns-glasses"
                                width={250} // Increase the width
                                height={250} // Increase the height
                                className="w-24 h-24 p-0  pt-3" // Adjust the className to match the new size
                            />
                        </ShimmerButton>
                    </form>
                </Form>
            </div>
        </div>
    )
}
