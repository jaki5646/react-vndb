import React, { useEffect, useState } from "react";
import Kana from "vndb-api-kana";
import './Home.css'

const kana = new Kana({
  baseURL: "https://api.vndb.org/kana",
});

const Home = () => {

  const [recommend, setRecommend] = useState();

  useEffect(() => {
    kana.apis
      .getVn({
        fields: [
          "id",
          "title",
          "image.id",
          "released",
          "platforms",
          "languages",
          "devstatus",
        ],
      })
      .then((res) => {
        console.log(res.results)
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return <div className="home-page">
    <div className="explore">
      <div className="explore-right"></div>
      <div className="explore-middle"></div>
      <div className="explore-left"></div>
    </div>
  </div>;
};

export default Home;
