import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"

interface Props {
  setQuery: (query: string) => void
}

function Header({ setQuery }: Props) {
  const [queryText, setQueryText] = useState('')

  const onSearchClick = () => {
    setQuery(queryText)
  }

  return (
    <>
      <div id="root">
        <Button variant="contained">Upload</Button>
        <TextField
          label="Query"
          id="outlined-basic"
          variant="outlined"
          value={queryText}
          onChange={e => setQueryText(e.target.value)}
        />
        <Link
          to={"/query"}
          state={{ query: { queryText } }}
          >
          <Button variant="outlined" onClick={onSearchClick}>Search</Button>
        </Link>
        <Button variant="contained">Notification</Button>
      </div>
    </>
  )
}

export default Header
