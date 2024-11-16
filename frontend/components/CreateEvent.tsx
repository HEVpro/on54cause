'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useWeb3AuthSingleAuthProvider } from "@/lib/auth/web3AuthSingleAuthProvider"
import { useEffect } from "react"
import { uploadFile } from "@/lib/akave"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Image from "next/image"

const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    date: z.date(),
    // charityAddress: z.string().min(2).max(50),
    img_url: z.string().min(2).max(50),
})

export default function CreateEvent() {
    const { getUserInfo } = useWeb3AuthSingleAuthProvider()

    const fetchUserInfo = async () => {
        const userInfo = await getUserInfo();
        if (userInfo) {
            console.log('User Info:', userInfo);
        } else {
            console.log('No user info available');
        }
    };
    fetchUserInfo()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            // charityAddress: '',
            img_url: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        // uploadFile('events', JSON.stringify(values))
    }
    return (
        <>
            <div className="w-full flex justify-between items-center py-8">
                <p className="text-6xl font-bold mx-auto text-custom-yellow-500">Create an event</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto w-1/2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title event</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description event</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name="charityAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Charity Address</FormLabel>
                                <FormControl>
                                    <Input className="focus:ring-0 focus:outline-none ring-0"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date of birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    " pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="bg-custom-green-500 text-white hover:bg-custom-green-800">Submit
                        <Image src="/nouns/noun-10.png" alt="noun" width={24} height={24} className="ml-2" />
                    </Button>
                </form>
            </Form>
        </>
    )
}
