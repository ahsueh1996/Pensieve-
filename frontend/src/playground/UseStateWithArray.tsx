import { Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"

interface Props {
  eventID: number
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

function EventCard({ eventID }: Props) {
  // const [photoURLs, setPhotoURLs] = useState([''])
  const [eventCard, setEvent] = useState<EventCard[] | []>([])
  useEffect(() => {
    const getEventCardArray = async () => {
      // event contains one event
      const eventRes = await fetch(import.meta.env.VITE_EVENT_COLLECTION_ENDPOINT_URL + '?id=' + eventID)
      const eventJSON = await eventRes.json()

      const eventCardMetadata = eventJSON.title

      // photoArray contains four photos
      const photoArrayRes = await fetch(import.meta.env.VITE_PHOTO_COLLECTION_ENDPOINT_URL + '?albumId=' + eventID + '&_limit=4')
      const photoArrayJSON = await photoArrayRes.json()

      const eventPhotoArray: string[] = []

      photoArrayJSON.map((photo: Photo) => {

      })
    }




    const getPhotoURLs = async (eventID: number) => {
      const eventMetaRes = await fetch(import.meta.env.VITE_EVENT_COLLECTION_ENDPOINT_URL + '?id=' + eventID)
      const eventMetaData = await eventMetaRes.json()
      const eventMetadata = eventMetaData.title
      const res = await fetch(import.meta.env.VITE_PHOTO_COLLECTION_ENDPOINT_URL + '?albumId=' + eventID + '&_limit=4')
      const data = await res.json()
      const photoArray: string[] = []
      data.map((data: Photo) => {
        const metadata = eventMetadata
        const photoURLsArray: EventCard = {}
      })
      setPhotoURLs(photoArray)
    }
    getPhotoURLs(eventID)
  }, [])

  return (
    <>
      <h3>EventCard</h3>
      <Card>
        <CardActionArea
          onClick={() => alert('test')}
        >
          <Typography
            component='p'
          >
            {eventMetadata}
          </Typography>
          <Grid container>
            {photoURLs.map((data: string, index) => (
              <Grid key={index} item xs={6}>
                <CardMedia
                  component='img'
                  image={data}
                >
                </CardMedia>
              </Grid>
            ))}

          </Grid>
        </CardActionArea>
      </Card>
    </>

  )
}

export default EventCard