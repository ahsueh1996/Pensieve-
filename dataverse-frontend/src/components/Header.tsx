import { Button, ButtonBase, Grid, TextField } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
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
    console.log("pkh:", pkh);
    return pkh;
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Button onClick={connect}>Connect</Button>
          <p>{pkh ? pkh : null}</p>
        </Grid>
      </Grid>
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
      </Grid>
    </>
  )
}

export default Header