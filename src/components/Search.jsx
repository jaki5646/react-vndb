import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { kana } from './Home';

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
        filters: ["title", "=", data],
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
          "length_minutes"
        ],
      })
      .then((res) => {
        setSearchData(res.results.filter((i) => i.image.sexual === 0))
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  
  return (
    <div>Search</div>
  )
}

export default Search