import NewLink from '@/components/NewLink'
import { Suspense } from 'react'

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NewLink />
        </Suspense>
    )
}