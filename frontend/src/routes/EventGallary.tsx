import { useEffect, useState } from "react"
import EventCard from "../components/EventCard"

interface Props {
  query?: string
}

interface Event {
  userId: number,
  id: number
  title: string
}

function EventGallery({ query = '' }: Props) {
  const [eventArray, setEventArray] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(import.meta.env.VITE_EVENT_COLLECTION_ENDPOINT_URL + '?_limit=2')
      const events = await res.json()
      setEventArray(events)
    }
    fetchEvents()
  }, [])

  return (
    <>
      <h1>Event Gallery</h1>
      <h2>{query}</h2>
      
      {
        eventArray.map((data: Event, index) => (
          <EventCard key={index} eventID={data.id} />
        ))
      }
      {/* <EventCard eventID={}/> */}
      {/* <p>{JSON.stringify(eventArray)}</p> */}
    </>
  )
}

export default EventGallery