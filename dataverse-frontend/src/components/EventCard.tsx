import { Button, Card, CardActionArea, CardMedia, Grid, Typography, Fab } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { StreamRecord } from "../types"
import { Context } from "../context"
import { useStream } from "../hooks"
import { assert } from "console"
import { CID } from 'multiformats/cid';
import { json } from "stream/consumers"
import { MediaRenderer, ThirdwebProvider} from "@thirdweb-dev/react";
import { createRoot } from 'react-dom/client';

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
  id: string
  name: string
  description: string
  photos: [any]
}

interface Props {
  // pEventObj: StreamRecord
  pEventObj: PensieveEvent
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
  // const [photos, setPhotos] = useState<StreamRecord[]>(); // All events
  const [photos, setPhotos] = useState<Photo[]>(); // All events
  const [eventMetadata, setEventMetadata] = useState('')
  const {
    pkh,
    createCapability,
    loadStreams,
    createPublicStream,

  } = useStream();
  // const [eventCard, setEventCard] = useState<EventCard>({ metadata: '', photoURLArray: [''] })

  useEffect(() => {
    // console.log('Event Object: ', pEventObj.streamContent.content)
    parseEventObj()

    const loadPhotos = async () => {
      // const postRecord = await loadStreams({
      //   pkh,
      //   modelId: postModel.stream_id,
      // });
      // if (postRecord) setPhotos(Object.values(postRecord));
      setPhotos(pEventObj.photos);
    };

    loadPhotos()
  })

  console.log('photos: ', photos)

  const parseEventObj = () => {
    // setEventId(pEventObj.streamContent.content.eventId)
    // setEventName(pEventObj.streamContent.content.name)
    setEventId(pEventObj.id);
    setEventName(pEventObj.name);
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
      // event contains one event
      // const eventRes = await fetch('https://jsonplaceholder.typicode.com/albums' + '?id=' + eventID)
      // const eventJSON: PensieveEvent[] = await eventRes.json()

      // const eventCardMetadata = eventJSON[0].name

      // return eventCardMetadata
    }

    const getEventPhotoArray = async () => {
      // // photoArray contains four photos
      // const photoArrayRes = await fetch('https://jsonplaceholder.typicode.com/albums' + '?albumId=' + eventID + '&_limit=4')
      // const photoArrayJSON: Photo[] = await photoArrayRes.json()

      // const eventPhotoArray: string[] = []

      // photoArrayJSON.map((photo: Photo) => {
      //   eventPhotoArray.push(photo.imageUrl)
      // })

      // return eventPhotoArray
    }

    getEventCard()
  }, [])

  const addPhotos = async (event:any) => {
    const newPhotoURL = 'https://jsonplaceholder.typicode.com/albums?_limit=1'
    const date = new Date().toISOString();

    console.error(`addPhotos invoked by ${eventName}, ${eventId}`, pEventObj);

    let files = event.target.files; // this gets the list of files from the event. Think of them as file objects.
    for (let i = 0; i<files.length;i++)
    {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
  
      reader.onload = async function() {
        let imgb64url = reader.result;
        // console.error("imgb64url onload: ", imgb64url);
        if(imgb64url == null){ return;}
        let img64urlstr = imgb64url.toString();
        // console.error("imgb64urlstr onload: ", img64urlstr);
        let imgb64 = img64urlstr.split(",")[1];
        // console.error("imgb64 onload: ", imgb64);

        const beryxrequestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',
                      'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleS1iZXJ5eC0wMDEiLCJ0eXAiOiJKV1QifQ.eyJyb2xlcyI6W10sImlzcyI6IlpvbmRheCIsImF1ZCI6WyJiZXJ5eCJdLCJleHAiOjE2ODc4OTg3NDUsImp0aSI6ImFrZmhzdWVoLGFsYmVydC5rZi5oc3VlaEBnbWFpbC5jb20ifQ.4RmS_Q2er8GNmbL9iT8PFl81XVJcmgUfJ_kzVpREZTbILmPz1D6G-mn40iT_0HviwSoIg4h9qMvKSxSfbiIaEg',
          }
        };

        let beryxresponse = await fetch("https://api.zondax.ch/fil/data/v1/mainnet/tipset/latest", beryxrequestOptions);

        let brjson = await beryxresponse.json();
        console.error("beryx response:", beryxresponse, brjson);
        let currentheight = brjson.height;
        console.error("beryx height:", currentheight);


        let payload_pyupload = `{
          "Deal": {"Concurrency": 1}, 
          "Docker": {"Image": "akfhsueh/baca-generic-pytorch-cpu-cv2headless-plt", "Entrypoint": ["python3", "/inputs/upload-qr.py","--i","${imgb64}", "--b", "${currentheight}"]}, 
          "Engine": "Docker", 
          "Language": {"JobContext": {}},
          "Network": {"Type": "None"},
          "Publisher": "Estuary", 
          "PublisherSpec": {"Type":"Estuary"},
          "Resources": {"GPU": ""},
          "Timeout": 1800,
          "Verifier": "Noop",
          "Wasm": {"EntryModule": {}},
          "inputs":[
            {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/upload-qr.py",
              "StorageSource": "URLDownload",
              "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/upload-qr.py",
              "path": "/inputs"},
            {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/sample.jpg",
              "StorageSource": "URLDownload",
              "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/sample.jpg",
              "path": "/inputs/apes"},
            {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/0.png",
              "StorageSource": "URLDownload",
              "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/0.png",
              "path": "/inputs/apes"},
            {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1.png",
              "StorageSource": "URLDownload",
              "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1.png",
              "path": "/inputs/apes"},
            {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1000.png",
              "StorageSource": "URLDownload",
              "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1000.png",
              "path": "/inputs/apes"},
            {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1002.png",
              "StorageSource": "URLDownload",
              "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1002.png",
              "path": "/inputs/apes"},
            {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1003.png",
              "StorageSource": "URLDownload",
              "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1003.png",
              "path": "/inputs/apes"},
            {"CID": "QmRfzrnEEr3smFntyrz27xh2Xy1mmL2b4VAh3U3K7uhTBU",
              "Name": "ipfs://QmRfzrnEEr3smFntyrz27xh2Xy1mmL2b4VAh3U3K7uhTBU",
              "StorageSource": "IPFS",
              "path": "/inputs/fcn_resnet101_coco-7ecb50ca.pth"}
          ],
          "outputs":[{"Name":"outputs","StorageSource":"IPFS","path":"/outputs"}]
          }`

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: payload_pyupload
        };

        let response = await fetch("http://dashboard.bacalhau.org:1000/api/v1/run", requestOptions);

        let rjson = await response.json();
        console.error("baca response:", response, rjson);
        let cid = CID.parse(rjson.cid).toV1().toString();
        console.error("baca cid:", cid);

        function getElementByXpath(path:any) {
          return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }

        let oldimgelm = getElementByXpath("/html/body/div[3]/button/div/div[4]/img");
        let imgContElm = getElementByXpath("/html/body/div[3]/button/div/div[4]");
        oldimgelm.src="";
        const root = createRoot(imgContElm);
        // await root.render(<ThirdwebProvider><MediaRenderer src={`ipfs://${cid}/outputs/processed.png`} /></ThirdwebProvider>);
        await root.render(<ThirdwebProvider><MediaRenderer className={"MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img css-o69gx8-MuiCardMedia-root"} style={{}} src={`ipfs://bafybeibwjj3ddd4wzcdzrbc5bpyk5ir5xjjb5a67jfgcvk3w4ud7itguum/outputs/processed.png`} /></ThirdwebProvider>);
        await new Promise(r => setTimeout(r, 100));
        let newimgelm = getElementByXpath("/html/body/div[3]/button/div/div[4]/img");
        newimgelm.removeAttribute("style");

        const { streamId, ...streamRecord } = await createPublicStream({
          pkh,
          model: postModel,
          stream: {
            appVersion,
            createdAt: date,
            updatedAt: date,
            name: 'Tree Planting Party',
            imageURL: `ipfs://${cid}/outputs/processed.png`,
            metadataURL: `ipfs://${cid}/outputs/metadata.json`
          },
        });
    
        setCurrentStreamId(streamId);
        setNewPhoto(streamRecord as StreamRecord);
      }
    }
  }

  return (
    <>      
      <Card id="event-card">
        <CardActionArea
          onClick={() => alert('test')}
        >
          <Typography id="event-card">
            {eventName}
          </Typography>
           <Grid container>
            {photos?.map((data: Photo, index) => (
              <Grid key={index} item xs={6}>
                <CardMedia
                  component='img'
                  image={data.imageUrl}
                >
                </CardMedia>
              </Grid>
            ))}
            <Grid key={4} item xs={6}>
                <CardMedia
                  component='img'
                  image={""}
                >
                </CardMedia>
              </Grid>
          </Grid>
        </CardActionArea>
        <input accept="image/*" id="EventCard-uploadPhoto" className="EventCard-input" multiple type="file" onChange={addPhotos} />
        <label htmlFor="EventCard-uploadPhoto">
          <Fab component="span"><Button disabled size="small">Add photos</Button></Fab>
        </label>
      </Card>
    </>
  )
}

export default EventCard