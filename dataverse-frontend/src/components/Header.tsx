import { Button, Grid, TextField } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import LoginIcon from '@mui/icons-material/Login';
import { useContext, useState } from "react";
import { useStream, useWallet } from "../hooks";
import { Context } from "../context";

interface Props {
  pSetQuery: (pQuery: string) => void
}

function Header({ pSetQuery }: Props) {
  const { appVersion, postModel, eventModel } = useContext(Context);

  const [query, setQuery] = useState('')

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

  const onSearchClick = () => {
    pSetQuery(query)
  }

  const connect = async () => {
    const { wallet } = await connectWallet();
    const pkh = await createCapability(wallet);
    // console.log("pkh:", pkh);
    return pkh;
  };

  return (
    <>
      <Grid container id="header-grid">
        <Grid item xs={2}>
          <Button variant="contained" onClick={connect}>
            <LoginIcon fontSize="medium" />
          </Button>
          <p>{pkh ? pkh : null}</p>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label=""
            id="outlined-basic"
            variant="filled"
            size='small'
            value={query}
            onBlur={e => pSetQuery(e.target.value)}
            onChange={e => setQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={onSearchClick}>
            <SavedSearchIcon fontSize="medium" />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button>
            <EmailIcon fontSize="medium" />
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Header