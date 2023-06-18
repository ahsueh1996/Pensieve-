import { useEffect, useState } from "react"
import EventCard, { PensieveEvent } from "../components/EventCard"
import InfiniteScroll from "react-infinite-scroll-component"

interface Props {
  query?: string
  setActiveEventID: (activeEventID: number) => void
}

function EventGallery({ query = '', setActiveEventID }: Props) {
  const [eventArray, setEventArray] = useState([])
  const [hasMoreEvents, setHasMoreEvents] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(import.meta.env.VITE_EVENT_COLLECTION_ENDPOINT_URL + '?_limit=2')
      const events = await res.json()
      console.log("event gallery's events", events)
      setEventArray(events.events)
    }
    fetchEvents()
  }, [])

  const fetchMoreEvents = async () => {
    console.log('fetching more data')
    const res = await fetch(import.meta.env.VITE_EVENT_COLLECTION_ENDPOINT_URL + '?_start=' + eventArray.length + '&_limit=5')
    const data = await res.json()
    setEventArray(eventArray.concat(data))
    if (data < 5) {
      setHasMoreEvents(false)
    }
  }

  return (
    <>
      <h1>Event Gallery</h1>
      <h2>query: {query}</h2>
      <InfiniteScroll
        dataLength={eventArray.length}
        next={fetchMoreEvents}
        hasMore={hasMoreEvents}
        loader={''}
      >

      </InfiniteScroll>
      {
        eventArray.map((data: PensieveEvent, index) => (
          <EventCard key={index} eventID={data.id} setActiveEventID={setActiveEventID} />
        ))
      }
    </>
  )
}

export default EventGallery