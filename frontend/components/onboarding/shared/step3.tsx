"use client"
import { useWizard } from "react-use-wizard";

import { useEffect, useRef } from "react";

import type { ConfettiRef } from "@/components/ui/confetti";
import Confetti from "@/components/ui/confetti";
import { useRouter } from "next/navigation";

export default function Step3() {
    const router = useRouter();
    const confettiRef = useRef<ConfettiRef>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push("/");
        }, 6000);
        return () => clearTimeout(timeout);
    }, []);


    return (
        <>
            <div className="flex-1 flex flex-col items-center justify-center p-10 border border-custom-red-500 rounded-xl">

                <p className="text-2xl">Tell us a bit about your charity so we can get you set up!</p>
            </div>
            <div className="relative flex-1 flex flex-col justify-center items-center gap-4 m-10">

                <span className="pointer-events-none whitespace-pre-wrap text-center text-5xl font-semibold leading-none text-transparent text-custom-red-500">
                    Yay, your account is all set up! Thank you so much!
                </span>

                <Confetti
                    ref={confettiRef}
                    className="absolute left-0 top-0 z-0 size-full"
                    onMouseEnter={() => {
                        confettiRef.current?.fire({});
                    }}
                />
            </div>
        </>
    )
}
