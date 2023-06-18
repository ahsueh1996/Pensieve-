import { Button, ButtonBase, Grid, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStream, useWallet } from '../hooks';
import { Context } from '../context';
import EmailIcon from '@mui/icons-material/Email';


interface Props {
  setQuery: (query: string) => void
  pSetQuery: (pQuery: string) => void,
  pSetEventID: (pEventID: string) => void
}

function HeaderTwo({ pSetQuery, pSetEventID }: Props) {
  const { appVersion, postModel, eventModel } = useContext(Context);

  const [sQuery, setSQuery] = useState('')
  const [sEventID, setSEventID] = useState('')

  const { runtimeConnector } = useContext(Context);

  const { connectWallet } = useWallet();

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
  const [queryText, setQueryText] = useState('')

  const onSearchClick = () => {
    pSetQuery(sQuery)
  }

  const connect = async () => {
    const { wallet } = await connectWallet();
    const pkh = await createCapability(wallet);
    // console.log("pkh:", pkh);
    return pkh;
  };

  return (
    <>
      <Button>Create</Button>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            label="Query"
            id="outlined-basic"
            variant="outlined"
            size='small'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Button variant="contained" onClick={onSearchClick}>Search</Button>
          <ButtonBase>
            <EmailIcon fontSize='large' />
          </ButtonBase>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Event ID"
            id="outlined-basic"
            variant="outlined"
            size='small'
            value={eventID}
            onChange={e => setEventID(e.target.value)}
          />
          <Button variant="contained" onClick={onAddEventClick}>Add Event</Button>
        </Grid>
      </Grid>
    
      <Button variant="contained" onClick={connect}>Connect</Button>
      <p>{pkh ? pkh : null}</p>
      <hr />
      <Button variant="contained">Upload</Button>
      <TextField
        label="Query"
        id="outlined-basic"
        variant="outlined"
        value={queryText}
        size='small'
        onChange={e => setQueryText(e.target.value)}
      />
      <Link
        to={"/query"}
        state={{ query: { queryText } }}
      >
        <Button variant="outlined" onClick={onSearchClick}>Search</Button>
      </Link>
      <Button variant="contained">Notification</Button>
    </>
  )
}

export default HeaderTwo
