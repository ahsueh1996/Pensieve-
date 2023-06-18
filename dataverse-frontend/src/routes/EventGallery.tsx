import { useContext, useEffect, useState } from "react"
import EventCard, { PensieveEvent } from "../components/EventCard"
import { StreamRecord } from "../types"
import { useStream } from "../hooks";
import { Context } from "../context";
import { Button, Grid, Typography } from "@mui/material";
import { render } from "react-dom";
import { VITE_MOCK_DATA_TEST_SATURN } from "../App.constant";

interface Props {
  pQuery: string,
  pENSName: string
}

function EventGallery({ pQuery,pENSName }: Props) {
  const { appVersion, postModel, eventModel } = useContext(Context);

  const [currentStreamId, setCurrentStreamId] = useState<string>();
  // const [newEvent, setNewEvent] = useState<StreamRecord>();
  // const [events, setEvents] = useState<StreamRecord[]>(); // All events
  const [newEvent, setNewEvent] = useState<PensieveEvent>();
  const [events, setEvents] = useState<PensieveEvent[]>(); // All events

  const {
    pkh,
    createCapability,
    loadStreams,
    createPublicStream,

  } = useStream();

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(VITE_MOCK_DATA_TEST_SATURN + '?_limit=2')
      let events = await res.json()
      console.log("showing events of logged in account", pENSName);
      if (events.address == pENSName || events.name == pENSName) {
        events = events.events;
      } else [
        events = []
      ]
      console.log("events", events)
      setEvents(events)
    }
    fetchEvents()
    

    // const loadEvents = async () => {
    //   const postRecord = await loadStreams({
    //     pkh,
    //     modelId: eventModel.stream_id,
    //   });
    //   // if (postRecord) setEvents(Object.values(postRecord));
    // };
    // loadEvents()
  }, [pENSName])

  // const loadEvents = async () => {
  //   const postRecord = await loadStreams({
  //     pkh,
  //     modelId: eventModel.stream_id,
  //   });
  //   if (postRecord) setEvents(Object.values(postRecord));
  // };

  const getEventNameById = (eventId: string) => {
    return new Date().toISOString()
  }

  const isEventIdValid = (eventId: string) => {
    return true
  }

  const addEvent = async (query: string) => {
    const date = new Date().toISOString();
    const eventName = getEventNameById(pQuery)
    const { streamId, ...streamRecord } = await createPublicStream({
      pkh,
      model: eventModel,
      stream: {
        appVersion,
        createdAt: date,
        updatedAt: date,
        eventId: query,
        name: eventName,
      },
    });
    setCurrentStreamId(streamId);
    // setNewEvent(streamRecord as StreamRecord);
    const event: PensieveEvent = {
      id: query,
      userId: 0,
      name: "",
      description: "",
      photos: [""]
    }
    setNewEvent(event);
  };

  const addPhotos = () => {
    console.log('addPhotos')
  }

  return (
    <>
      {/* <h1>{pQuery} {pENSName}</h1> */}
      {/* <Button size="small" onClick={() => addEvent(pQuery)}>Request Access</Button> */}
      <div key={events?.length}>
      {
        events && events.length > 0 ?
          // events.map((data: StreamRecord, index) => (
          events.map((data: PensieveEvent, index) => (  
            <div id={`event${index.toString()}`} >
              <EventCard key={index} pEventObj={data} />
            </div>
          ))
          :
          <Grid key={events?.length} container id="body-grid">
            <Grid item xs={4}> </Grid>
            <Grid item xs={4}>
              <div id="banner">
              </div>
              <div id="banner">
                <Typography mt={4}> No memories here yet... Do you want to create one? </Typography>
              </div>
              <Button size="small" onClick={() => addEvent(pQuery)}>YES! LET'S DO IT! </Button>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
      }
      </div>

      {/* <EventCard eventID={}/> */}
      {/* <p>{JSON.stringify(eventArray)}</p> */}
    </>
  )
}

export default EventGallery