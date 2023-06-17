import { useEffect, useState } from "react"
import EventCard from "../components/EventCard"
import { StreamRecord } from "../types"
import { useStream } from "../hooks";


interface Props {
  pQuery: string
}

interface Event {
  userId: number,
  id: number
  title: string
}

function EventGallery({ pQuery = '' }: Props) {
  const [eventArray, setEventArray] = useState([])
  const [publicEvent, setPublicEvent] = useState<StreamRecord>();
  const [events, setEvents] = useState<StreamRecord[]>(); // All events
  const {
    pkh,
    createCapability,
    loadStreams,
    createPublicStream,
    createEncryptedStream,
    createPayableStream,
    monetizeStream,
    unlockStream,
    updateStream,
  } = useStream();

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/albums' + '?_limit=2')
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