import React, { useEffect, useState } from "react";
import "./Search.css";
import { useSearchParams } from "react-router-dom";
import useWindowDimensions from "./useWindowDimensions";
import { kana } from "./Home";
import { PuffLoader } from "react-spinners";
import SearchItem from "./SearchItem";

const SearchTag = () => {
  const [param] = new useSearchParams();
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const data = param.get("key");
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setLoading(true);
    kana.apis
      .getVn({
        filters: ["tag", "=", data],
        results: 50,
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
          "description",
          "developers.name",
        ],
      })
      .then((res) => {
        setSearchData(res.results.filter((i) => i.image?.sexual === 0));
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [data]);

  return !!loading ? (
    <div className="loading-wrap">
      <PuffLoader color="#e57cb9" className="loading-icon" />
    </div>
  ) : !loading && searchData.length > 0 ? (
    <div
      className="search-wrap"
      style={{
        gridTemplateColumns:
          width <= 950 ? "auto" : width <= 1350 && "auto auto",
      }}
    >
      {searchData.map((i) => (
        <SearchItem props={i} key={i.id}></SearchItem>
      ))}
    </div>
  ) : (
    <div className="no-result-wrap">
      <p className="no-result">Result not found</p>
    </div>
  );
};

export default SearchTag;
