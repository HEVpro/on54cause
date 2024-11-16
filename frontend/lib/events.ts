const getEvents = async () => {
    const res = await fetch(
        `https://bafybeia7wz43b2pmnsu3q3tz67f7ojs4pa5ftesti4fct2rggcloqfbdby.ipfs.w3s.link/charities.json`
    )
    return res.json()
}

export default getEvents
