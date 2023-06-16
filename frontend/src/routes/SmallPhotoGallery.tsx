interface Props {
  eventID: number
}

function SmallPhotoGallery({ eventID }: Props) {
  return (
    <>
      <h1>Small Photo Gallery</h1>
      <h2>Event {eventID}</h2>
    </>
  )
}

export default SmallPhotoGallery