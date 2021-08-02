import React, { useEffect } from 'react'
import DataTable from './Lista'
import PlagioScreen from './Plagio'
import queryString from "query-string";
const Plagio = () => {

  const { q = "" } = queryString.parse(window.location.search);
  useEffect(() => {
    console.log(queryString.parse(window.location.search))
  }, [])
  return (
    <div>
      {
        q != ''?(<PlagioScreen id={q}/>):(<DataTable/>)
      }
    </div>
  )
}

export default Plagio
