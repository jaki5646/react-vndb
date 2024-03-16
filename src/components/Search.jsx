import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { kana } from './Home';
import SearchItem from './SearchItem';
import { PuffLoader } from 'react-spinners';
import './Search.css'

const Search = () => {
  const [param] = new useSearchParams();
  const [searchData, setSearchData] = useState([])
  const [loading, setLoading] = useState(false)
  const data = param.get('key')
  console.log(data)


  useEffect(() => {
    setLoading(true);
    // recommend
    kana.apis
      .getVn({
        filters: ["search", "=", data],
        results: 20,
        fields: [
          "id",
          "title",
          "image.id",
          "released",
          "platforms",
          "languages",
          "devstatus",
          "image.violence",
          "image.sexual",
          "screenshots.id",
          "screenshots.sexual",
          "tags.category",
          "developers.id",
          "length_minutes",
          "titles.title",
          "description"
        ],
      })
      .then((res) => {
        setSearchData(res.results.filter((i) => i.image.sexual === 0))
        setLoading(false)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [data]);
  
  return !!loading ? (<PuffLoader color="#e57cb9" className='loading-icon' />) :
    !loading && searchData.length > 0 ? (
      <div className='search-wrap'>
      {searchData.map(i => <SearchItem props={i} key={i.id}></SearchItem>)}
      </div>
    ) : (<p>Result not found</p>)
}

export default Search