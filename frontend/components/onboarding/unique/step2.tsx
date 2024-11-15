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
import { ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChangeEvent, useEffect, useState } from "react";

const formSchema = z.object({
    description: z.string().min(2).max(200),
    youtube: z.string().regex(/^https:\/\/www\.youtube\.com\/[a-zA-Z0-9_-]+$/, "Invalid YouTube link (e.g. https://www.youtube.com/username)"),
    Xlink: z.string().regex(/^https:\/\/x\.com\/[a-zA-Z0-9_-]+$/, "Invalid X link (e.g. https://x.com/username)"),
    url: z.string().url().min(2).max(50),
    circle_image: z.any(),
    // photo: z.string().min(2).max(50),
})

export default function Step2() {
    const [preview, setPreview] = useState("");

    const { nextStep, previousStep } = useWizard()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            Xlink: "",
            youtube: "",
            url: "",
            circle_image: "",
            // photo: "",
        },
    })

    function getImageData(event: ChangeEvent<HTMLInputElement>) {
        // FileList is immutable, so we need to create a new one
        const dataTransfer = new DataTransfer();

        // Add newly uploaded images
        Array.from(event.target.files!).forEach((image) =>
            dataTransfer.items.add(image)
        );

        const files = dataTransfer.files;
        const displayUrl = URL.createObjectURL(event.target.files![0]);

        return { files, displayUrl };
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
        const values = form.getValues(); // Get current form values
        const localData = localStorage.getItem("user_data");
        if (localData) {
            const parsedData = JSON.parse(localData);
            localStorage.setItem("user_data", JSON.stringify({ ...parsedData, ...values }));
        } else {
            localStorage.setItem("user_data", JSON.stringify(values));
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        localStorage.removeItem("user_data")
        nextStep()
    }

    useEffect(() => {
        if (localStorage) {
            const userData = localStorage.getItem("user_data")
            if (userData) {
                form.reset(JSON.parse(userData))
            }
        }
    }, [])

    return (
        <>
            <div className="flex-1 flex flex-col items-center justify-center p-10 border border-custom-red-500 rounded-xl">
                <p className="text-2xl">Tell us a bit about your charity so we can get you set up!</p>
            </div>
            <div className="relative flex-1 flex flex-col justify-center items-center gap-4 m-10">
                <button className="absolute left-0 top-0 bg-transparent border-none text-black" type="button" onClick={() => previousStep()}>
                    <ChevronLeft />
                </button>
                <p className="text-center text-2xl">Let's get to know each other a bit better! I just have a few more quick questions for you.</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-center gap-5">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={preview ?? ""} alt="avatar" />
                            <AvatarFallback>BU</AvatarFallback>
                        </Avatar>
                        <FormField
                            control={form.control}
                            name="circle_image"
                            render={({ field: { onChange, value, ...rest } }) => (

                                <FormItem className="max-w-96 w-full">
                                    <FormLabel>Avatar</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            {...rest}
                                            onChange={(event) => {
                                                const { files, displayUrl } = getImageData(event)
                                                setPreview(displayUrl);
                                                onChange(files);
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field: { onBlur, ...field } }) => (
                                <FormItem className="max-w-96 w-full">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input onBlur={handleBlur} placeholder="Enter your description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Xlink"
                            render={({ field: { onBlur, ...field } }) => (
                                <FormItem className="max-w-96 w-full">
                                    <FormLabel>X</FormLabel>
                                    <FormControl className="flex items-center gap-2">
                                        <Input onBlur={handleBlur} placeholder="Enter your X handle" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="youtube"
                            render={({ field: { onBlur, ...field } }) => (
                                <FormItem className="max-w-96 w-full">
                                    <FormLabel>Youtube</FormLabel>
                                    <FormControl>
                                        <Input onBlur={handleBlur} placeholder="Enter your youtube handle" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field: { onBlur, ...field } }) => (
                                <FormItem className="max-w-96 w-full">
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input onBlur={handleBlur} placeholder="Enter your website url" {...field} />
                                    </FormControl>
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
