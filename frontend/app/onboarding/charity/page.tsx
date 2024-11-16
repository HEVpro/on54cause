"use client"
import Step1 from "@/components/onboarding/unique/step1";
import Step2 from "@/components/onboarding/unique/step2";
import Step3 from "@/components/onboarding/shared/step3";
import { Wizard } from 'react-use-wizard';
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
    return (
        <div className="relative flex flex-row w-full min-h-[calc(100vh-4rem)]">
            <Wizard
                wrapper={<AnimatePresence mode="wait" />}
            >
                <Step1 />

                <Step2 />

                <Step3 />
            </Wizard>
        </div>
    );
}
