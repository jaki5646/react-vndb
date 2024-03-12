import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const Search = () => {
  const param = new useSearchParams(window.location.search);
  console.log(param.get('key'))
  
  return (
    <div>Search</div>
  )
}

export default Search