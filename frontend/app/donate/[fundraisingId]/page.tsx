import Donate from '@/components/Donate'
import { Suspense } from 'react'

export default function DonatePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Donate />
        </Suspense>
    )
}
