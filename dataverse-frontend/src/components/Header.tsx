import { Button, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStream, useWallet } from '../hooks';
import { Context } from '../context';


interface Props {
  setQuery: (query: string) => void
}

function Header({ setQuery }: Props) {
  const { appVersion, postModel, eventModel } = useContext(Context);

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
    setQuery(queryText)
  }

  const connect = async () => {
    const { wallet } = await connectWallet();
    const pkh = await createCapability(wallet);
    console.log("pkh:", pkh);
    return pkh;
  };

  return (
    <>
    
      <Button onClick={connect}>Connect</Button>
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

export default Header
