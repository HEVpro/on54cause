"use client"
import Step1 from "@/components/onboarding/unique/step1";
import Step2 from "@/components/onboarding/unique/step2";
import Step3 from "@/components/onboarding/shared/step3";
import { Wizard } from 'react-use-wizard';


export default function Page() {
    return (
        <div className="flex min-h-screen">
            <Wizard>
                <Step1 />
                <Step2 />
                <Step3 />
            </Wizard>
        </div>
    );
}
