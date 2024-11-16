const getEvents = () => {
    return fetch(
        `http://165.227.177.41:8000/buckets/data/files/events.json/download`
    ).then((res) => res.json())
}

export default getEvents
