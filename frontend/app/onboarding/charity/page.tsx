import { Suspense } from 'react'
import CharityOnboarding from '@/components/CharityOnboarding'

export default async function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CharityOnboarding />
        </Suspense>
    )
}
