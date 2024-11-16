import ListEvents from "@/components/ListEvents";
import getEvents from "@/lib/events";

export default async function Page() {
    // TODO: Cambiar endpoint por el de eventos
    const events = await getEvents()
    console.log(events)
    return <ListEvents initialData={events} />

}
