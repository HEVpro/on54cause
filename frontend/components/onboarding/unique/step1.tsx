"use client"
import { useWizard } from "react-use-wizard";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    sector: z.string().min(2).max(50),
})

export default function Step1() {
    const { nextStep, activeStep } = useWizard()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        const localData = localStorage.getItem("user_data")
        if (localData) {
            const parsedData = JSON.parse(localData);
            localStorage.setItem("user_data", JSON.stringify({ ...parsedData, ...values }));
        } else {
            localStorage.setItem("user_data", JSON.stringify(values));
        }
        nextStep()
    }


    useEffect(() => {
        if (localStorage) {
            const userData = localStorage.getItem("user_data");
            if (userData) {
                const parsedUserData = JSON.parse(userData);

                form.setValue("name", parsedUserData.name.toString())
                form.setValue("sector", parsedUserData.sector.toString())

            }
        }
    }, []);

    // useEffect(() => {
    //     form.setValue("sector", form.watch("sector").toString())
    // }, [form.watch("sector")])

    console.log("form.watch -->", form.watch("sector"))
    console.log("form.getValues -->", form.getValues("sector"))


    return (
        <>
            <div className="flex-1 flex flex-col items-center justify-center p-10 border border-custom-red-500 rounded-xl">
                <p className="text-2xl">Tell us a bit about your charity so we can get you set up!</p>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-4 m-10">

                <p className="text-center text-2xl">Let's start getting to know each other with a few basic questions.</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-center gap-10">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="max-w-96 w-full">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sector"
                            render={({ field }) => (
                                <FormItem className="max-w-96 w-full">
                                    <FormLabel>Sector</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value} defaultValue={field.value} >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a sector" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Agriculture">Agriculture</SelectItem>
                                            <SelectItem value="Automotive">Automotive</SelectItem>
                                            <SelectItem value="Construction">Construction</SelectItem>
                                            <SelectItem value="Education">Education</SelectItem>
                                            <SelectItem value="Energy">Energy</SelectItem>
                                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                                            <SelectItem value="Finance">Finance</SelectItem>
                                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                                            <SelectItem value="Hospitality">Hospitality</SelectItem>
                                            <SelectItem value="Information Technology">Information Technology (IT)</SelectItem>
                                            <SelectItem value="Insurance">Insurance</SelectItem>
                                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                            <SelectItem value="Media">Media</SelectItem>
                                            <SelectItem value="Nonprofit">Nonprofit</SelectItem>
                                            <SelectItem value="Real Estate">Real Estate</SelectItem>
                                            <SelectItem value="Retail">Retail</SelectItem>
                                            <SelectItem value="Telecommunications">Telecommunications</SelectItem>
                                            <SelectItem value="Transportation">Transportation</SelectItem>
                                            <SelectItem value="Tourism">Tourism</SelectItem>
                                            <SelectItem value="Wholesale">Wholesale</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="max-w-96 w-full" type="submit">Next step</Button>
                    </form>
                </Form>
            </div>
        </>
    );
}
