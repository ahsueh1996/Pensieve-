import { Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"

interface Props {
  eventID: number
  setActiveEventID: (activeEventID: number) => void
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

function EventCard({ eventID, setActiveEventID }: Props) {
  const [eventCard, setEventCard] = useState<EventCard>({ metadata: '', photoURLArray: [''] })

  useEffect(() => {
    const getEventCard = async () => {
      const eventCardMetadata: string = await getEventCardMetadata()
      const eventPhotoArray: string[] = await getEventPhotoArray()

      const eventCard: EventCard = {
        metadata: eventCardMetadata,
        photoURLArray: eventPhotoArray
      }

      setEventCard(eventCard)
    }

    const getEventCardMetadata = async () => {
      // event contains one event
      const eventRes = await fetch(import.meta.env.VITE_EVENT_COLLECTION_ENDPOINT_URL + '?id=' + eventID)
      const eventJSON: Event[] = await eventRes.json()

      const eventCardMetadata = eventJSON[0].title

      return eventCardMetadata
    }

    const getEventPhotoArray = async () => {
      // photoArray contains four photos
      const photoArrayRes = await fetch(import.meta.env.VITE_PHOTO_COLLECTION_ENDPOINT_URL + '?albumId=' + eventID + '&_limit=4')
      const photoArrayJSON: Photo[] = await photoArrayRes.json()

      const eventPhotoArray: string[] = []

      photoArrayJSON.map((photo: Photo) => {
        eventPhotoArray.push(photo.url)
      })

      return eventPhotoArray
    }

    getEventCard()
  }, [])

  return (
    <>
      <Link
        to={'/small-photo-gallery'}
        onClick={() => {
          setActiveEventID(eventID)
        }}
      >
        <Card>
          <Typography
            variant="h4"
          >
            Event {eventID} {eventCard.metadata}
          </Typography>
          <Grid container>
            {eventCard.photoURLArray.map((data: string, index) => (
              <Grid key={index} item xs={6}>
                <CardMedia
                  component='img'
                  image={data}
                >
                </CardMedia>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Link>
    </>

  )
}

export default EventCard