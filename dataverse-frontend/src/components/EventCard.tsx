import { Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"

interface Props {
  eventID: number
}

export interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  imageUrl: string
  uploader: string
}

export interface PensieveEvent {
  userId: number
  id: number
  name: string
  description: string
  photos: [string]
}

interface EventCard {
  metadata: string,
  photoURLArray: string[]
}

function EventCard({ eventID }: Props) {
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
      const eventRes = await fetch('https://jsonplaceholder.typicode.com/albums' + '?id=' + eventID)
      const eventJSON: PensieveEvent[] = await eventRes.json()

      const eventCardMetadata = eventJSON[0].name

      return eventCardMetadata
    }

    const getEventPhotoArray = async () => {
      // photoArray contains four photos
      const photoArrayRes = await fetch('https://jsonplaceholder.typicode.com/albums' + '?albumId=' + eventID + '&_limit=4')
      const photoArrayJSON: Photo[] = await photoArrayRes.json()

      const eventPhotoArray: string[] = []

      photoArrayJSON.map((photo: Photo) => {
        eventPhotoArray.push(photo.imageUrl)
      })

      return eventPhotoArray
    }

    getEventCard()
  }, [])

  return (
    <>
      <Card>
        <CardActionArea
          onClick={() => alert('test')}
        >
          <Typography
            component='p'
          >
            {eventCard.metadata}
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
        </CardActionArea>
      </Card>
    </>

  )
}

export default EventCard