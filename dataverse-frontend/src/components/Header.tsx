import { Button, Grid, TextField } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import LoginIcon from '@mui/icons-material/Login';
import { useContext, useState } from "react";
import { useStream, useWallet } from "../hooks";
import { Context } from "../context";
import { ethers } from "ethers";

interface Props {
  pSetQuery: (query: string) => void
  pSetENSName: (ensName: string) => void
}

function Header({ pSetQuery, pSetENSName }: Props) {
  const { appVersion, postModel, eventModel } = useContext(Context);

  const [query, setQuery] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [ensName, setENSName] = useState('')

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
    const { address, wallet } = await connectWallet();
    console.warn("wallet: ", wallet)
    const pkh = await createCapability(wallet);
    const goerliProvider = await ethers.getDefaultProvider('goerli')
    console.warn('goerli: ', ethers.providers)
    let name;
    name = await goerliProvider.lookupAddress(address);
    console.warn("address: ", address);

    console.warn('name: ', name)
    if (name) {
      setENSName(name)
      pSetENSName(name)
    } else {
      setENSName(address)
      pSetENSName(address)
    }
    return pkh;
  };

  return (
    <>
      <Grid container id="header-grid">
        <Grid item xs={2}>
          <Button variant="contained" onClick={connect}>
            <LoginIcon fontSize="medium" />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label=""
            id="outlined-basic"
            variant="filled"
            size='small'
            value={query}
            onBlur={e => pSetQuery(query)}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={(event) => event.key == 'Enter' ? pSetQuery(query) : null}
          />
          { ensName ?
          <div id="avatar">
            {/* <p>{pkh ? pkh : null}</p> */}
             <p> {ensName}!</p> 
          </div>
          : null } 
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