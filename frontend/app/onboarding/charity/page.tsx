'use client'
import BasicCharityInfo from '@/components/onboarding/unique/BasicCharityInfo'
import CharitySocialInfo from '@/components/onboarding/unique/CharitySocialInfo'
import CharitySignup from '@/components/onboarding/unique/CharitySignup'
import Step3 from '@/components/onboarding/shared/step3'
import { Wizard } from 'react-use-wizard'
import { AnimatePresence, motion } from 'framer-motion'

export default function Page() {
    return (
        <div className="relative flex flex-row w-full min-h-[calc(100vh-4rem)]">
            <Wizard wrapper={<AnimatePresence mode="wait" />}>
                <BasicCharityInfo />
                <CharitySocialInfo />
                <CharitySignup />
                <Step3 />
            </Wizard>
        </div>
    )
}
