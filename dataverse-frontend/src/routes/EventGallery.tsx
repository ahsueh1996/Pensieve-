import { useEffect, useState } from "react"
import EventCard, { PensieveEvent } from "../components/EventCard"
import { StreamRecord } from "../types"
import { useStream } from "../hooks";
import { VITE_MOCK_DATA_TEST_SATURN } from "../App.constant";

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
      const res = await fetch(VITE_MOCK_DATA_TEST_SATURN)
      let events = await res.json()
      setEventArray(events.events)
    }
    fetchEvents()
  }, [])

  return (
    <>
      {
        eventArray.length > 0 ? 
        eventArray.map((data: PensieveEvent, index) => (
          <EventCard key={index} eventID={data.id} />
        ))
        : 
        <p> No event found. Do you want to add it? </p>
      }
      {/* <EventCard eventID={}/> */}
      {/* <p>{JSON.stringify(eventArray)}</p> */}
    </>
  )
}

export default EventGallery