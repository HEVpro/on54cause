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
import { useState } from "react";


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
        <div className="flex min-h-screen">

            <div className="flex-1 flex flex-col items-center justify-center  border border-custom-red-500 rounded-xl">
                <p className="">Let&apos;s get started! Are you joining as an individual or a charity? Select the option that fits you best.</p>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-4 m-10">
                <div className="flex flex-col justify-center gap-10">
                    <Label className="text-4xl text-center">
                        How are you identified?</Label>
                    <Select value={accountType} onValueChange={setAccountType}>
                        <SelectTrigger className=" focus:outline-none focus:ring-0 focus:ring-offset-0" >
                            <SelectValue placeholder="Select Account Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="charity">Charity</SelectItem>
                            <SelectItem value="individual">Individual</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="rounded-md" onClick={handleContinue}>Continue</Button>
                </div>
            </div>
        </div>

    );
}
