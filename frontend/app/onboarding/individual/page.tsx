import IndividualOnboarding from '@/components/IndividualOnboarding'
import { Suspense } from 'react'

export default async function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <IndividualOnboarding />
        </Suspense>
    )
}
