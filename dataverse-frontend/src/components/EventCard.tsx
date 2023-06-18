import { Button, Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { StreamRecord } from "../types"
import { Context } from "../context"
import { useStream } from "../hooks"

interface Props {
  pEventObj: StreamRecord
}

interface Photo {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

interface Event {
  userId: number,
  id: number,
  title: string
}

interface EventCard {
  metadata: string,
  photoURLArray: string[]
}

function EventCard({ pEventObj }: Props) {
  const { appVersion, postModel, eventModel } = useContext(Context);

  const [currentStreamId, setCurrentStreamId] = useState<string>();
  const [newPhoto, setNewPhoto] = useState<StreamRecord>();
  const [eventId, setEventId] = useState('')
  const [eventName, setEventName] = useState('')
  const [photos, setPhotos] = useState<StreamRecord[]>(); // All events
  const [eventMetadata, setEventMetadata] = useState('')
  const {
    pkh,
    createCapability,
    loadStreams,
    createPublicStream,

  } = useStream();
  // const [eventCard, setEventCard] = useState<EventCard>({ metadata: '', photoURLArray: [''] })

  useEffect(() => {
    console.log('Event Object: ', pEventObj.streamContent.content)
    parseEventObj()

    const loadPhotos = async () => {
      const postRecord = await loadStreams({
        pkh,
        modelId: postModel.stream_id,
      });
      if (postRecord) setPhotos(Object.values(postRecord));
    };

    loadPhotos()
  })

  console.log('photos: ', photos)

  const parseEventObj = () => {
    setEventId(pEventObj.streamContent.content.eventId)
    setEventName(pEventObj.streamContent.content.name)
  }

  useEffect(() => {
    const getEventCard = async () => {
      // const eventCardMetadata: string = await getEventCardMetadata()
      // const eventPhotoArray: string[] = await getEventPhotoArray()

      // const eventCard: EventCard = {
      //   metadata: eventCardMetadata,
      //   photoURLArray: eventPhotoArray
      // }

      // // setEventCard(eventCard)
    }

    const getEventCardMetadata = async () => {
      // // event contains one event
      // const eventRes = await fetch('https://jsonplaceholder.typicode.com/albums' + '?id=' + eventID)
      // const eventJSON: Event[] = await eventRes.json()

      // const eventCardMetadata = eventJSON[0].title

      // return eventCardMetadata
    }

    const getEventPhotoArray = async () => {
      // // photoArray contains four photos
      // const photoArrayRes = await fetch('https://jsonplaceholder.typicode.com/albums' + '?albumId=' + eventID + '&_limit=4')
      // const photoArrayJSON: Photo[] = await photoArrayRes.json()

      // const eventPhotoArray: string[] = []

      // photoArrayJSON.map((photo: Photo) => {
      //   eventPhotoArray.push(photo.url)
      // })

      // return eventPhotoArray
    }

    getEventCard()
  }, [])

  const addPhotos = async () => {
    const newPhotoURL = 'https://jsonplaceholder.typicode.com/albums?_limit=1'
    const date = new Date().toISOString();

    console.error(`addPhotos invoked by ${eventName}, ${eventId}`, pEventObj);

    const { streamId, ...streamRecord } = await createPublicStream({
      pkh,
      model: postModel,
      stream: {
        appVersion,
        createdAt: date,
        updatedAt: date,
        name: 'Tree Planting Party',
        imageURL: 'ipfs://bafkreidc6pmwkbsgpinafeb5cj2xtom575ugkefnfgkc7ny6tjspgmwwsm',
        metadataURL: 'ipfs://bafkreicd2a3ev5ipsncdtic6x5solzwjsyapbdtzvlfujuzs7tbaqodxfe'
      },
    });

    setCurrentStreamId(streamId);
    setNewPhoto(streamRecord as StreamRecord);
  }

  return (
    <>
      <h1>{eventId}</h1>
      <Card>
        <CardActionArea
          onClick={() => alert('test')}
        >
          {/* <Typography
            component='p'
          >
            {eventCard.metadata}
          </Typography> */}
          <Grid container>
            {
              photos && photos.length > 0 ?
                photos.map((data: StreamRecord, index) => (
                  <EventCard key={index} pEventObj={data} />
                ))

                :
                <>
                  <p> No event found. Do you want to request access to this event? </p>
                  
                </>
            }
            {/* {eventCard.photoURLArray.map((data: string, index) => (
              <Grid key={index} item xs={6}>
                <CardMedia
                  component='img'
                  image={data}
                >
                </CardMedia>
              </Grid>
            ))} */}

          </Grid>
        </CardActionArea>
        <Button size="small" onClick={addPhotos}>Add photos</Button>
      </Card>
    </>
  )
}

export default EventCard