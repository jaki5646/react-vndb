import React, { useEffect, useState } from "react";
import Kana from "vndb-api-kana";
import Explore from "./Explore";
import "./Home.css";
import Slider from "react-slick";

export const kana = new Kana({
  baseURL: "https://api.vndb.org/kana",
});

const Home = () => {
  const [recommend, setRecommend] = useState([]);
  const [romance, setRomance] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  // recommend VN
  useEffect(() => {
    kana.apis
      .getVn({
        filters: ["and", ["rating", "<", "100"], ["rating", ">", "87"]],
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
        ],
      })
      .then((res) => {
        // filter nsfw contents
        let arr = res.results.filter((i) => i.image.sexual === 0);
        setRecommend(arr.slice(arr.length - 9));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // romance

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  const handleElement = (props) => {
    console.log(props);
  };

  return (
    <>
      <div className="home-page">
        <h1 className="explore-title">Recommended Visual Novels by fanbase</h1>

        <div className="explore">
          <Slider {...settings} className="slider">
            {recommend.map((i) => {
              return <Explore key={i.id} props={i} onClick={handleElement} />;
            })}
          </Slider>
        </div>
        <div className="tag-vn"></div>
        <div className="home-page-right"></div>
      </div>
    </>
  );
};

export default Home;
