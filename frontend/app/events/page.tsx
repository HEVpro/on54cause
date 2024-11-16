import ListEvents from "@/components/ListEvents";
import getEvents from "@/lib/events";
import { Suspense } from "react";

export default async function Page() {
    const events = await getEvents()
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ListEvents initialData={events} />
        </Suspense>)

}
