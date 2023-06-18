import { useContext, useEffect, useState } from "react"
import EventCard from "../components/EventCard"
import { StreamRecord } from "../types"
import { useStream } from "../hooks";
import { Context } from "../context";
import { Button } from "@mui/material";
import { render } from "react-dom";


interface Props {
  pQuery: string
}

interface Event {
  userId: number,
  id: number
  title: string
}

function EventGallery({ pQuery = '' }: Props) {
  const { appVersion, postModel, eventModel } = useContext(Context);

  const [currentStreamId, setCurrentStreamId] = useState<string>();
  const [newEvent, setNewEvent] = useState<StreamRecord>();
  const [events, setEvents] = useState<StreamRecord[]>(); // All events
  const {
    pkh,
    createCapability,
    loadStreams,
    createPublicStream,

  } = useStream();

  useEffect(() => {
    // const fetchEvents = async () => {
    //   const res = await fetch('https://jsonplaceholder.typicode.com/albums' + '?_limit=2')
    //   let events = await res.json()
    //   // events = []
    //   setEventArray(events)
    // }
    // fetchEvents()

    const loadEvents = async () => {
      const postRecord = await loadStreams({
        pkh,
        modelId: eventModel.stream_id,
      });
      setEvents(Object.values(postRecord));
    };
    loadEvents()
  }, [])

  const getEventNameById = (eventId: string) => {
    return new Date().toISOString()
  }

  const isEventIdValid = (eventId: string) => {
    return true
  }

  const addEvent = async () => {
    const date = new Date().toISOString();
    const eventName = getEventNameById(pQuery)
    const { streamId, ...streamRecord } = await createPublicStream({
      pkh,
      model: eventModel,
      stream: {
        appVersion,
        createdAt: date,
        updatedAt: date,
        eventId: pQuery,
        name: eventName,
      },
    });

    setCurrentStreamId(streamId);
    setNewEvent(streamRecord as StreamRecord);
  };

  const addPhotos = () => {
    console.log('addPhotos')
  }

  return (
    <>
      <Button size="small" onClick={addEvent}>Request Access</Button>
      {
        events && events.length > 0 ?
          events.map((data: StreamRecord, index) => (
            <EventCard key={index} pEventObj={data} />
          ))

          :
          <>
            <p> No event found. Do you want to request access to this event? </p>
            <Button size="small" onClick={addEvent}>Request Access</Button>
          </>
      }
      {/* <EventCard eventID={}/> */}
      {/* <p>{JSON.stringify(eventArray)}</p> */}
    </>
  )
}

export default EventGallery