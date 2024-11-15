"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";


export default function OnBoarding() {
    const [accountType, setAccountType] = useState<string>("");
    const router = useRouter();



    const handleContinue = () => {
        if (accountType === "charity") {
            router.push("/onboarding/charity");
        } else if (accountType === "individual") {
            router.push("/onboarding/individual");
        }
    }
    return (
        <div className="relative flex flex-row w-full min-h-[calc(100vh-4rem)]">
            <AnimatePresence mode="wait">
                <motion.div
                    key="onboarding-header"
                    initial={{ opacity: 0, x: "-50%" }}
                    animate={{ opacity: 1, x: "0%" }}
                    exit={{ opacity: 0, x: "-50%" }}
                    transition={{ duration: 0.5, ease: "linear" }}
                    className="z-50 absolute left-1/2 w-1/2 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-10 bg-[#D4D7E1] rounded-xl">
                    {/* <p className="">Let&apos;s get started! Are you joining as an individual or a charity? Select the option that fits you best.</p> */}
                    <Image className="mt-auto" src="/nouns/noun-2.png" alt="step1" width={600} height={600} />
                </motion.div>
                <motion.div
                    key="onboarding"
                    initial={{ opacity: 0, x: "50%" }}
                    animate={{ opacity: 1, x: "0%" }}
                    exit={{ opacity: 0, x: "50%" }}
                    transition={{ duration: 0.5, ease: "linear" }}
                    className="z-0 absolute top-0 h-[calc(100vh-4rem)] w-1/2 flex flex-col justify-center items-center gap-4">

                    <div className="flex flex-col justify-center gap-10">
                        <Label className="text-4xl text-center">
                            How are you identified?</Label>
                        <Select value={accountType} onValueChange={setAccountType} >
                            <SelectTrigger className="focus:outline-none focus:ring-0 focus:ring-offset-0" >
                                <SelectValue placeholder="Select Account Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="charity">Charity</SelectItem>
                                <SelectItem value="individual">Individual</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="rounded-md" onClick={handleContinue}>Continue</Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
