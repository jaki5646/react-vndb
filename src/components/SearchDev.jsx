import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { kana } from "./Home";
import { PuffLoader } from "react-spinners";
import useWindowDimensions from "./useWindowDimensions";
import "./Search.css";
import SearchItem from "./SearchItem";
import axios from "axios";

const baseURL = "https://api.vndb.org/kana/";
const AUTH_TOKEN = "token himo-ytq7i-nyyj1-jb8y-goonj-e7at4-6you";

const SearchDev = () => {
  const [param] = new useSearchParams();
  const data = param.get("key");
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dev, getDev] = useState("");
  const { width, height } = useWindowDimensions();

  const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: { "Content-Type": "application/json", Authorization: AUTH_TOKEN },
  });

  useEffect(() => {
    setLoading(true);
    instance
      .post("vn", {
        filters: ["search", "=", data],
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
        ].join(", "),
      })
      .then((res) => {
        let resultArr = [];
        const sorted = res.data.results.map((e) =>
          e.developers.filter(
            (i) => i.name.toLowerCase() === data.toLowerCase()
          )
        );
        const indexArr = sorted
          .map((e, i) => (e.length > 0 ? i : undefined))
          .filter((x) => x);
        for (let i = 0; i < indexArr.length; i++) {
          resultArr.push(res.data.results[indexArr[i]]);
        }
        setSearchData(resultArr.filter((i) => i.image?.sexual === 0));
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [data]);

  return !!loading ? (
    <PuffLoader color="#e57cb9" className="loading-icon" />
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
    <p className="no-result">Result not found</p>
  );
};

export default SearchDev;
