import ListEvents from "@/components/ListEvents";
import getEvents from "@/lib/events";

export default async function Page() {

    const events = await getEvents()
    return <ListEvents initialData={events} />

}
