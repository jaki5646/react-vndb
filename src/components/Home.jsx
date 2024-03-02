import React, { useEffect, useState } from "react";
import Kana from "vndb-api-kana";
import Explore from "./Explore";
import "./Home.css";

const kana = new Kana({
  baseURL: "https://api.vndb.org/kana",
});

const Home = () => {
  const [recommend, setRecommend] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    kana.apis
      .getVn({
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
          "screenshots.sexual"
        ],
      })
      .then((res) => {
        // filter nsfw contents
        setRecommend(res.results.filter(i => i.image.sexual === 0))
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);





  return (
    <div className="home-page">
      <div className="explore">
        <Explore props={recommend}></Explore>
      </div>
    </div>
  );
};

export default Home;
